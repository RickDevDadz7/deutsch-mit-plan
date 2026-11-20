/* Sincronização entre aparelhos via Gist SECRETO do GitHub do próprio usuário.
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
    const t = { profile: false, cards: [], mistakes: [], assess: [], ext: false };
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

  /* ---------- execução ---------- */
  let running = null, keyCache = null;
  async function run(store, opts) {
    if (running) return running;
    running = (async () => {
      const c = cfg(); if (!c.token || !c.pass) throw Object.assign(new Error('Sincronização não configurada.'), { code: 'off' });
      const now = Date.now(), me = deviceId();
      const gist = await findOrCreateGist(c.token);
      const meta = JSON.parse(await fileContent(gist.files['meta.json']));
      if (!keyCache || keyCache.salt !== meta.salt || keyCache.pass !== c.pass) keyCache = { salt: meta.salt, pass: c.pass, key: await deriveKey(c.pass, meta.salt) };
      const key = keyCache.key;
      const st = store.state; const devices = [];
      const touched = { profile: false, cards: [], mistakes: [], assess: [], ext: [] };
      for (const [name, f] of Object.entries(gist.files)) {
        const m = /^device-(.+)\.enc$/.exec(name); if (!m) continue;
        const wrap = JSON.parse(await fileContent(f));
        devices.push({ id: wrap.deviceId, name: wrap.name, at: wrap.at, me: wrap.deviceId === me });
        if (wrap.deviceId === me) continue;
        const data = await decrypt(key, wrap.box);
        const t = mergeRemote(st, data, { id: wrap.deviceId, name: wrap.name, at: wrap.at });
        if (t.profile) touched.profile = true;
        touched.cards.push(...t.cards); touched.mistakes.push(...t.mistakes); touched.assess.push(...t.assess); if (t.ext) touched.ext.push(wrap.deviceId);
      }
      // grava localmente o que veio dos outros
      const ps = [];
      if (touched.profile) ps.push(store.saveProfile({ keepStamp: true }));
      for (const id of new Set(touched.cards)) ps.push(store.saveCard(id));
      for (const k of new Set(touched.mistakes)) ps.push(store.saveMistake(k));
      for (const a of touched.assess) ps.push(store.saveAssess(a));
      for (const d of touched.ext) ps.push(store.saveExt(d));
      await Promise.allSettled(ps);
      // envia o meu pacote (já mesclado; dias só os meus)
      const mine = { profile: st.profile, cards: Object.values(st.cards), mistakes: Object.values(st.mistakes), assess: st.assess, days: st.days };
      const box = await encrypt(key, mine);
      const fname = 'device-' + me + '.enc';
      const name = c.name || 'Aparelho';
      await gh(c.token, '/gists/' + gist.id, { method: 'PATCH', body: JSON.stringify({ files: { [fname]: { content: JSON.stringify({ v: 1, deviceId: me, name, at: now, box }) } } }) });
      if (!devices.some((d) => d.me)) devices.push({ id: me, name, at: now, me: true }); else devices.find((d) => d.me).at = now;
      const c2 = cfg(); c2.lastSync = now; c2.lastError = null; c2.devices = devices; saveCfg(c2);
      return { merged: touched.cards.length + touched.mistakes.length + (touched.profile ? 1 : 0) + touched.ext.length, devices };
    })();
    try { return await running; }
    catch (e) { const c2 = cfg(); c2.lastError = e.message; saveCfg(c2); throw e; }
    finally { running = null; }
  }
  async function setup({ token, pass, name }) {
    if (!token || token.length < 20) throw new Error('Cole o token do GitHub.');
    if (!pass || pass.length < 8) throw new Error('A senha precisa ter pelo menos 8 caracteres.');
    const c = cfg(); c.token = token.trim(); c.pass = pass; c.name = (name || '').trim() || 'Aparelho'; c.gistId = null; saveCfg(c);
    keyCache = null;
  }
  function disable() { const c = cfg(); saveCfg({ deviceId: c.deviceId }); keyCache = null; }
  const available = () => typeof fetch !== 'undefined' && typeof crypto !== 'undefined' && !!crypto.subtle && !globalThis.claude;

  GF.sync = { cfg, saveCfg, deviceId, setup, disable, run, available, mergeCard, mergeMistake, mergeProfile, mergeUnit, mergeRemote, encrypt, decrypt, deriveKey, DESC };
})(globalThis.GF = globalThis.GF || {});
