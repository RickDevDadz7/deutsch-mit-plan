/* Sincronização entre aparelhos — pela CONTA (Supabase, preferencial) ou, no modo antigo, via Gist SECRETO do GitHub.
 * - Cada aparelho grava só o PRÓPRIO arquivo (device-<id>.enc): não há escrita concorrente.
 * - Conteúdo comprimido e criptografado (AES-GCM 256, chave PBKDF2 da senha de sincronização).
 * - Ao sincronizar, cada aparelho MESCLA o dos outros: nada é sobrescrito às cegas.
 * Funções de mesclagem são puras e testadas. */
(function (GF) {
  'use strict';
  const DESC = 'Deutsch mit Plan — sincronização (criptografado)';
  const CFG = 'gfs-sync';
  const API = 'https://api.github.com';
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const same = (a, b) => GF.store.stable(a) === GF.store.stable(b);
  const ls = () => { try { return globalThis.localStorage; } catch (e) { return null; } };

  /* ---------- configuração (só neste aparelho; nunca entra em backups) ---------- */
  function cfg() { try { return JSON.parse(ls().getItem(CFG) || '{}'); } catch (e) { return {}; } }
  function saveCfg(c) { try { ls().setItem(CFG, JSON.stringify(c)); } catch (e) { /* */ } }
  function deviceId() {
    const c = cfg(); if (c.deviceId) return c.deviceId;
    const id = 'd' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
    c.deviceId = id; saveCfg(c); return id;
  }

  /* ---------- criptografia ---------- */
  const b64 = (u8) => { let s = ''; for (let i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000)); return btoa(s); };
  const unb64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
  async function gzip(str) {
    const data = new TextEncoder().encode(str);
    if (typeof CompressionStream === 'undefined') return { z: 0, bytes: data };
    const cs = new Blob([data]).stream().pipeThrough(new CompressionStream('gzip'));
    return { z: 1, bytes: new Uint8Array(await new Response(cs).arrayBuffer()) };
  }
  async function gunzip(bytes, z) {
    if (!z) return new TextDecoder().decode(bytes);
    const ds = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
    return await new Response(ds).text();
  }
  async function deriveKey(pass, saltB64) {
    const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(pass), 'PBKDF2', false, ['deriveKey']);
    return crypto.subtle.deriveKey({ name: 'PBKDF2', salt: unb64(saltB64), iterations: 150000, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
  }
  async function encrypt(key, obj) {
    const { z, bytes } = await gzip(JSON.stringify(obj));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const ct = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, bytes));
    return { z, iv: b64(iv), ct: b64(ct) };
  }
  async function decrypt(key, box) {
    let pt;
    try { pt = new Uint8Array(await crypto.subtle.decrypt({ name: 'AES-GCM', iv: unb64(box.iv) }, key, unb64(box.ct))); }
    catch (e) { const er = new Error('Senha de sincronização diferente da usada no outro aparelho.'); er.code = 'bad_password'; throw er; }
    return JSON.parse(await gunzip(pt, box.z));
  }

  /* ---------- mesclagem (pura) ---------- */
  function mergeStage(a, b) {
    if (!a) return b; if (!b) return a;
    if ((b.last || 0) > (a.last || 0)) return b;
    if ((b.last || 0) === (a.last || 0) && (b.reps || 0) > (a.reps || 0)) return b;
    return a;
  }
  function mergeCard(L, R) {
    if (!R) return { v: L, changed: false };
    if (!L) return { v: clone(R), changed: true };
    const out = clone(L);
    for (const st of Object.keys(Object.assign({}, L.stages, R.stages))) out.stages[st] = clone(mergeStage(L.stages[st], R.stages[st]));
    for (const k of ['attempts', 'correct', 'msSum', 'msN', 'spont']) out[k] = Math.max(L[k] || 0, R[k] || 0);
    out.introduced = Math.min(L.introduced || Infinity, R.introduced || Infinity);
    if (L.spaced || R.spaced) { const sp = Object.assign({}, L.spaced || {}); for (const [k, v] of Object.entries(R.spaced || {})) sp[k] = Math.max(sp[k] || 0, v); out.spaced = sp; }
    const seen = new Set(); out.errors = [...(L.errors || []), ...(R.errors || [])].filter((e) => { const k = e.t + e.stage; if (seen.has(k)) return false; seen.add(k); return true; }).sort((a, b) => a.t - b.t).slice(-10);
    return { v: out, changed: !same(out, L) };
  }
  function mergeMistake(L, R) {
    if (!R) return { v: L, changed: false };
    if (!L) return { v: clone(R), changed: true };
    const newer = (R.lastAt || 0) > (L.lastAt || 0) ? R : L;
    const out = Object.assign(clone(newer), { count: Math.max(L.count || 0, R.count || 0) });
    return { v: out, changed: !same(out, L) };
  }
  const longer = (a, b) => ((b || []).length > (a || []).length ? clone(b) : clone(a || []));
  function mergeUnit(a, b) {
    if (!a) return clone(b); if (!b) return clone(a);
    const o = Object.assign(clone(a), {});
    o.passed = a.passed && b.passed ? Math.min(a.passed, b.passed) : (a.passed || b.passed || undefined);
    if (!o.passed) delete o.passed;
    o.convos = Math.max(a.convos || 0, b.convos || 0);
    o.listen = longer(a.listen, b.listen);
    o.grammarSeen = Object.assign({}, a.grammarSeen || {}, b.grammarSeen || {});
    o.dialogHeard = Math.max(a.dialogHeard || 0, b.dialogHeard || 0) || undefined; if (!o.dialogHeard) delete o.dialogHeard;
    const w = [a.writing, b.writing].filter(Boolean).sort((x, y) => (y.score - x.score) || (y.at - x.at))[0]; if (w) o.writing = clone(w);
    const cp = [a.checkpoint, b.checkpoint].filter(Boolean).sort((x, y) => y.at - x.at)[0]; if (cp) o.checkpoint = clone(cp);
    const lc = [a.lastConvo, b.lastConvo].filter(Boolean).sort((x, y) => y.at - x.at)[0]; if (lc) o.lastConvo = clone(lc);
    return o;
  }
  function mergeProfile(L, R) {
    if (!R) return { v: L, changed: false };
    if (!L || !L.diag) return { v: clone(R), changed: true }; // aparelho novo: adota o perfil existente
    if (!R.diag) return { v: L, changed: false };
    const base = clone((R._u || 0) > (L._u || 0) ? R : L);
    const us = {}; for (const k of new Set([...Object.keys(L.unitState || {}), ...Object.keys(R.unitState || {})])) us[k] = mergeUnit((L.unitState || {})[k], (R.unitState || {})[k]);
    base.unitState = us;
    const gs = {}; for (const k of new Set([...Object.keys(L.grammarStats || {}), ...Object.keys(R.grammarStats || {})])) gs[k] = longer((L.grammarStats || {})[k], (R.grammarStats || {})[k]);
    base.grammarStats = gs;
    const ss = {};
    for (const k of new Set([...Object.keys(L.skillStats || {}), ...Object.keys(R.skillStats || {})])) {
      const seen = new Set();
      ss[k] = [...((L.skillStats || {})[k] || []), ...((R.skillStats || {})[k] || [])].filter((x) => { const key = x.t + ':' + x.v; if (seen.has(key)) return false; seen.add(key); return true; }).sort((a, b) => a.t - b.t).slice(-50);
    }
    base.skillStats = ss;
    const Lp = L.pronStats || { pairs: [], done: {} }, Rp = R.pronStats || { pairs: [], done: {} };
    const done = Object.assign({}, Rp.done || {}); for (const [k, v] of Object.entries(Lp.done || {})) done[k] = done[k] ? Math.min(done[k], v) : v;
    base.pronStats = { pairs: longer(Lp.pairs, Rp.pairs), done };
    const ad = new Map(); for (const a of [...(L.adapt || []), ...(R.adapt || [])]) ad.set(a.t + ':' + a.to, a); base.adapt = [...ad.values()].sort((a, b) => a.t - b.t).slice(-30);
    base.lastSessionAt = Math.max(L.lastSessionAt || 0, R.lastSessionAt || 0);
    base.placement = L.placement || R.placement || null;
    base.createdAt = Math.min(L.createdAt || Infinity, R.createdAt || Infinity);
    base._u = Math.max(L._u || 0, R._u || 0);
    return { v: base, changed: !same(base, L) };
  }
  /** Mescla o pacote de outro aparelho no estado local. Retorna o que mudou. */
  function mergeRemote(state, remote, remoteDevice) {
    const t = { profile: false, cards: [], mistakes: [], assess: [], ext: false, gen: [], reports: [] };
    state.gen = state.gen || {};
    state.reports = state.reports || {};
    for (const r of remote.reports || []) { const l = state.reports[r.id]; if (r && r.id && (!l || (r.upd || r.at) > (l.upd || l.at))) { state.reports[r.id] = clone(r); t.reports.push(r.id); } } // problemas reportados: união, a versão mais recente vence
    for (const g of remote.gen || []) { if (!state.gen[g.id] && g.itemsData) { state.gen[g.id] = clone(g); t.gen.push(g.id); } } // a unidade já existente aqui nunca é trocada (o progresso aponta para os itens dela)
    const p = mergeProfile(state.profile, remote.profile); if (p.changed) { state.profile = p.v; t.profile = true; }
    for (const rc of remote.cards || []) { const r = mergeCard(state.cards[rc.id], rc); if (r.changed) { state.cards[rc.id] = r.v; t.cards.push(rc.id); } }
    for (const rm of remote.mistakes || []) { const r = mergeMistake(state.mistakes[rm.key], rm); if (r.changed) { state.mistakes[rm.key] = r.v; t.mistakes.push(rm.key); } }
    const have = new Set((state.assess || []).map((a) => a.id));
    for (const a of remote.assess || []) if (!have.has(a.id)) { state.assess.push(clone(a)); t.assess.push(a); }
    state.assess.sort((a, b) => a.at - b.at);
    // dias de estudo ficam separados por aparelho (somados nas estatísticas, nunca duplicados)
    state.ext = state.ext || {};
    const prev = state.ext[remoteDevice.id];
    const nx = { id: remoteDevice.id, name: remoteDevice.name, at: remoteDevice.at, days: clone(remote.days || {}) };
    if (!prev || !same(prev, nx)) { state.ext[remoteDevice.id] = nx; t.ext = true; }
    return t;
  }

  /* ---------- API do GitHub ---------- */
  async function gh(token, path, opts) {
    const r = await fetch(API + path, Object.assign({}, opts, { headers: Object.assign({ Authorization: 'Bearer ' + token, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' }, (opts || {}).body ? { 'Content-Type': 'application/json' } : {}) }));
    if (r.status === 401) { const e = new Error('Token do GitHub inválido ou expirado.'); e.code = 'bad_token'; throw e; }
    if (r.status === 403 || r.status === 404) { const e = new Error('O token não tem permissão de Gist (marque “gist” ao criar).'); e.code = 'no_scope'; throw e; }
    if (!r.ok) { const e = new Error('GitHub respondeu ' + r.status); e.code = 'unavailable'; throw e; }
    return r.status === 204 ? null : r.json();
  }
  async function fileContent(f) {
    if (!f.truncated && f.content != null) return f.content;
    const r = await fetch(f.raw_url); if (!r.ok) throw new Error('falha ao baixar ' + f.filename); return r.text();
  }
  async function findOrCreateGist(token) {
    const c = cfg();
    if (c.gistId) { try { return await gh(token, '/gists/' + c.gistId); } catch (e) { if (e.code !== 'no_scope') throw e; } }
    for (let page = 1; page <= 5; page++) {
      const list = await gh(token, '/gists?per_page=100&page=' + page);
      const hit = list.find((g) => g.description === DESC);
      if (hit) { c.gistId = hit.id; saveCfg(c); return gh(token, '/gists/' + hit.id); }
      if (list.length < 100) break;
    }
    const salt = b64(crypto.getRandomValues(new Uint8Array(16)));
    const g = await gh(token, '/gists', { method: 'POST', body: JSON.stringify({ description: DESC, public: false, files: {
      'meta.json': { content: JSON.stringify({ app: 'german-fluency-system', v: 1, salt }) },
      'LEIA-ME.md': { content: 'Dados de estudo do app Deutsch mit Plan, criptografados (AES-GCM). Não edite: cada aparelho grava o próprio arquivo device-*.enc.\n' } } }) });
    c.gistId = g.id; saveCfg(c); return g;
  }

  /* ---------- transportes: conta (Supabase) ou Gist antigo ---------- */
  // Conta: tabela sync_devices (uma linha por aparelho; RLS: cada conta só vê as próprias linhas).
  async function packText(obj) { const { z, bytes } = await gzip(JSON.stringify(obj)); return (z ? 'z:' : 'j:') + (z ? b64(bytes) : new TextDecoder().decode(bytes)); }
  async function unpackText(t) { if (t.startsWith('z:')) return JSON.parse(await gunzip(unb64(t.slice(2)), 1)); return JSON.parse(t.slice(2)); }
  function cloudTransport() {
    const C = GF.cloud;
    return {
      kind: 'cloud',
      async list() {
        const rows = await C.rest('sync_devices?select=device_id,name,updated_at,data', {});
        return (rows || []).map((r) => ({ id: r.device_id, name: r.name, at: Date.parse(r.updated_at) || 0, load: () => unpackText(r.data) }));
      },
      async put(me, name, at, data) {
        const u = C.user(); if (!u) throw Object.assign(new Error('Entre na sua conta primeiro.'), { code: 'signed_out' });
        await C.rest('sync_devices?on_conflict=user_id,device_id', { method: 'POST', headers: { Prefer: 'resolution=merge-duplicates,return=minimal' }, body: [{ user_id: u.id, device_id: me, name, updated_at: new Date(at).toISOString(), data: await packText(data) }] });
      }
    };
  }
  async function gistTransport(c) {
    const gist = await findOrCreateGist(c.token);
    const meta = JSON.parse(await fileContent(gist.files['meta.json']));
    if (!keyCache || keyCache.salt !== meta.salt || keyCache.pass !== c.pass) keyCache = { salt: meta.salt, pass: c.pass, key: await deriveKey(c.pass, meta.salt) };
    const key = keyCache.key;
    const out = [];
    for (const [name, f] of Object.entries(gist.files)) {
      if (!/^device-(.+)\.enc$/.test(name)) continue;
      const wrap = JSON.parse(await fileContent(f));
      out.push({ id: wrap.deviceId, name: wrap.name, at: wrap.at, load: () => decrypt(key, wrap.box) });
    }
    return {
      kind: 'gist',
      async list() { return out; },
      async put(me, name, at, data) {
        const box = await encrypt(key, data);
        await gh(c.token, '/gists/' + gist.id, { method: 'PATCH', body: JSON.stringify({ files: { ['device-' + me + '.enc']: { content: JSON.stringify({ v: 1, deviceId: me, name, at, box }) } } }) });
      }
    };
  }
  /** Qual caminho usar: a conta, se houver sessão; senão o Gist antigo. opts.via força um deles. */
  function mode(opts) {
    const via = opts && opts.via;
    if (via === 'gist') return cfg().token ? 'gist' : null;
    if (via === 'cloud') return GF.cloud && GF.cloud.session() ? 'cloud' : null;
    if (GF.cloud && GF.cloud.session()) return 'cloud';
    return cfg().token ? 'gist' : null;
  }

  /* ---------- execução ---------- */
  let running = null, keyCache = null;
  async function run(store, opts) {
    if (running) return running;
    running = (async () => {
      const c = cfg(); const m = mode(opts);
      if (!m) throw Object.assign(new Error('Sincronização não configurada.'), { code: 'off' });
      if (m === 'gist' && (!c.token || !c.pass)) throw Object.assign(new Error('Sincronização não configurada.'), { code: 'off' });
      const now = Date.now(), me = deviceId();
      const tr = m === 'cloud' ? cloudTransport() : await gistTransport(c);
      const st = store.state; const devices = [];
      const touched = { profile: false, cards: [], mistakes: [], assess: [], ext: [], gen: [], reports: [] };
      for (const d of await tr.list()) {
        devices.push({ id: d.id, name: d.name, at: d.at, me: d.id === me });
        if (d.id === me) continue;
        const data = await d.load();
        const t = mergeRemote(st, data, { id: d.id, name: d.name, at: d.at });
        if (t.profile) touched.profile = true;
        touched.gen.push(...t.gen); touched.reports.push(...t.reports); touched.cards.push(...t.cards); touched.mistakes.push(...t.mistakes); touched.assess.push(...t.assess); if (t.ext) touched.ext.push(d.id);
      }
      // grava localmente o que veio dos outros
      const ps = [];
      if (touched.profile) ps.push(store.saveProfile({ keepStamp: true }));
      for (const id of new Set(touched.cards)) ps.push(store.saveCard(id));
      for (const k of new Set(touched.mistakes)) ps.push(store.saveMistake(k));
      for (const a of touched.assess) ps.push(store.saveAssess(a));
      for (const d of touched.ext) ps.push(store.saveExt(d));
      for (const id of new Set(touched.reports)) ps.push(store.saveReport(id));
      for (const g of new Set(touched.gen)) { ps.push(store.saveGen(g)); if (GF.content && GF.content.addUnit) GF.content.addUnit(clone(st.gen[g])); }
      await Promise.allSettled(ps);
      // envia o meu pacote (já mesclado; dias só os meus)
      const mine = { profile: st.profile, cards: Object.values(st.cards), mistakes: Object.values(st.mistakes), assess: st.assess, days: st.days, gen: Object.values(st.gen || {}), reports: Object.values(st.reports || {}) };
      const name = c.name || defaultName();
      await tr.put(me, name, now, mine);
      if (!devices.some((d) => d.me)) devices.push({ id: me, name, at: now, me: true }); else devices.find((d) => d.me).at = now;
      const c2 = cfg(); c2.lastSync = now; c2.lastError = null; c2.devices = devices; c2.via = m; saveCfg(c2);
      return { merged: touched.cards.length + touched.mistakes.length + (touched.profile ? 1 : 0) + touched.ext.length + touched.gen.length + touched.reports.length, devices, via: m };
    })();
    try { return await running; }
    catch (e) { const c2 = cfg(); c2.lastError = e.message; saveCfg(c2); throw e; }
    finally { running = null; }
  }
  function defaultName() { const ua = (globalThis.navigator && navigator.userAgent) || ''; return /Android|iPhone|iPad/i.test(ua) ? 'Celular' : /Electron/i.test(ua) ? 'PC (programa)' : 'PC'; }
  function setName(n) { const c = cfg(); c.name = String(n || '').trim().slice(0, 40) || defaultName(); saveCfg(c); }
  /** Apaga da nuvem os dados desta conta (todas as linhas de aparelhos). Os dados deste aparelho continuam. */
  async function wipeCloud() { const u = GF.cloud.user(); await GF.cloud.rest('sync_devices?user_id=eq.' + encodeURIComponent(u.id), { method: 'DELETE', headers: { Prefer: 'return=minimal' } }); const c = cfg(); c.devices = []; c.lastSync = null; saveCfg(c); }
  async function setup({ token, pass, name }) {
    if (!token || token.length < 20) throw new Error('Cole o token do GitHub.');
    if (!pass || pass.length < 8) throw new Error('A senha precisa ter pelo menos 8 caracteres.');
    const c = cfg(); c.token = token.trim(); c.pass = pass; c.name = (name || '').trim() || 'Aparelho'; c.gistId = null; saveCfg(c);
    keyCache = null;
  }
  function disable() { const c = cfg(); saveCfg({ deviceId: c.deviceId, name: c.name }); keyCache = null; }
  const available = () => typeof fetch !== 'undefined' && typeof crypto !== 'undefined' && !!crypto.subtle && !globalThis.claude;

  GF.sync = { cfg, saveCfg, deviceId, setup, disable, run, available, mode, setName, defaultName, wipeCloud, packText, unpackText, mergeCard, mergeMistake, mergeProfile, mergeUnit, mergeRemote, encrypt, decrypt, deriveKey, DESC };
})(globalThis.GF = globalThis.GF || {});
