/* Persistência. O estado educacional vive no banco do artifact (privado por usuário,
 * independente do modelo de IA). Escritas: uma por documento por vez, com coalescência.
 * Backends: DbBackend (claude db), MemoryBackend (testes / fallback local). */
(function (GF) {
  'use strict';
  const SCHEMA = 1;

  function fnv(str) { let h = 0x811c9dc5; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193); } return (h >>> 0).toString(16); }
  function stable(o) { // JSON com chaves ordenadas (checksum determinístico)
    if (Array.isArray(o)) return '[' + o.map(stable).join(',') + ']';
    if (o && typeof o === 'object') return '{' + Object.keys(o).sort().map((k) => JSON.stringify(k) + ':' + stable(o[k])).join(',') + '}';
    return JSON.stringify(o);
  }
  const clone = (o) => JSON.parse(JSON.stringify(o));

  /* Caminhos lógicos: 'profile' | 'srs/<nível>/<id>' | 'mistakes/m/<key>' | 'days/<ano>/<data>' | 'assess/a/<id>' | 'backups/b/<id>' */
  function DbBackend(db, uid) {
    const base = 'data/users/' + uid;
    const ref = (path) => { const s = path.split('/'); return s.length === 1 ? db.doc(base + '/' + s[0]) : db.doc(base + '/' + s[0]).collection(s[1]).doc(s[2]); };
    const withRetry = async (fn) => { try { return await fn(); } catch (e) { if (e && e.code === 'unavailable') { await new Promise((r) => setTimeout(r, 400 + Math.random() * 600)); return fn(); } throw e; } };
    return {
      kind: 'db',
      async get(path) { const s = await withRetry(() => ref(path).get()); return s.exists ? clone(s.data()) : null; }, // dados do banco vêm congelados
      async set(path, data) { return withRetry(() => ref(path).set(data)); },
      async del(path) { return withRetry(() => ref(path).delete()); },
      async list(coll) {
        const [a, b] = coll.split('/');
        const snap = await withRetry(() => db.doc(base + '/' + a).collection(b).limit(1000).get());
        return snap.docs.map((d) => ({ id: d.id, data: clone(d.data()) }));
      }
    };
  }
  function MemoryBackend(persistKey) {
    let mem = {};
    const ls = (() => { try { return persistKey && globalThis.localStorage; } catch (e) { return null; } })();
    if (ls) { try { mem = JSON.parse(ls.getItem(persistKey) || '{}'); } catch (e) { mem = {}; } }
    const flush = () => { if (ls) { try { ls.setItem(persistKey, JSON.stringify(mem)); } catch (e) { /* cheio */ } } };
    return {
      kind: 'memory', _mem: () => mem,
      async get(path) { return mem[path] ? clone(mem[path]) : null; },
      async set(path, data) { mem[path] = clone(data); flush(); },
      async del(path) { delete mem[path]; flush(); },
      async list(coll) { const pre = coll + '/'; return Object.keys(mem).filter((k) => k.startsWith(pre) && k.slice(pre.length).indexOf('/') < 0).map((k) => ({ id: k.slice(pre.length), data: clone(mem[k]) })); }
    };
  }

  const safeId = (s) => String(s).replace(/[^A-Za-z0-9_\-.~:@+]/g, '_').slice(0, 180);

  function Store(backend, log) {
    this.b = backend; this.log = log || (() => {});
    this.state = null; this.queue = {}; this.pendingN = 0; this.onPending = null; this.lastError = null;
  }
  Store.prototype.load = async function (now) {
    const b = this.b, M = GF.model;
    const st = { profile: null, cards: {}, mistakes: {}, days: {}, assess: [], ext: {}, integrity: { dropped: 0 } };
    st.profile = await b.get('profile');
    if (st.profile && st.profile.schema !== SCHEMA) this.log('warn', 'schema diferente: ' + st.profile.schema);
    const levels = ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    const lists = await Promise.all([...levels.map((l) => b.list('srs/' + l)), b.list('mistakes/m'), b.list('days/' + new Date(now).getFullYear()), b.list('days/' + (new Date(now).getFullYear() - 1)), b.list('assess/a'), b.list('ext/d')]);
    for (let i = 0; i < levels.length; i++) for (const { data } of lists[i]) {
      if (validCard(data)) st.cards[data.id] = data; else st.integrity.dropped++;
    }
    for (const { data } of lists[levels.length]) if (data && data.key) st.mistakes[data.key] = data;
    for (const { data } of [...lists[levels.length + 1], ...lists[levels.length + 2]]) if (data && data.date) st.days[data.date] = data;
    st.assess = lists[levels.length + 3].map((x) => x.data).filter(Boolean).sort((a, b) => a.at - b.at);
    for (const { data } of lists[levels.length + 4]) if (data && data.id) st.ext[data.id] = data;
    if (!st.profile) st.profile = M.newProfile(now);
    // migrações leves
    st.profile.pronStats = st.profile.pronStats || { pairs: [], done: {} };
    st.profile.pronStats.done = st.profile.pronStats.done || {};
    this.state = st;
    return st;
  };
  function validCard(c) {
    if (!c || typeof c.id !== 'string' || !c.stages) return false;
    for (const s of GF.model.STAGES) { const x = c.stages[s]; if (!x || typeof x.s !== 'number' || typeof x.due !== 'number' || !isFinite(x.s)) return false; }
    return true;
  }
  Store.prototype._write = function (path, data) {
    // coalescência: se já existe escrita pendente não iniciada, troca os dados
    const q = this.queue[path];
    if (q && !q.started) { q.data = clone(data); return q.promise; }
    const entry = { data: clone(data), started: false };
    this.tail = this.tail || {};
    const prev = (this.tail[path] || Promise.resolve()).catch(() => {});
    this.pendingN++; this.onPending && this.onPending(this.pendingN);
    entry.promise = prev.then(async () => {
      entry.started = true;
      if (this.queue[path] === entry) delete this.queue[path];
      try { await this.b.set(path, entry.data); this.lastError = null; }
      catch (e) { this.lastError = e; this.log('error', 'falha ao salvar ' + path + ': ' + (e && (e.code || e.message))); throw e; }
      finally { this.pendingN--; this.onPending && this.onPending(this.pendingN); }
    });
    this.queue[path] = entry;
    this.tail[path] = entry.promise;
    return entry.promise;
  };
  Store.prototype.saveProfile = function (o) { if (!(o && o.keepStamp)) this.state.profile._u = Date.now(); return this._write('profile', this.state.profile); };
  Store.prototype.saveExt = function (id) { return this._write('ext/d/' + safeId(id), this.state.ext[id]); };
  Store.prototype.saveCard = function (id) { const c = this.state.cards[id]; return this._write('srs/' + (c.level || 'A1') + '/' + safeId(id), c); };
  Store.prototype.saveMistake = function (key) { return this._write('mistakes/m/' + safeId(key), this.state.mistakes[key]); };
  Store.prototype.saveDay = function (date) { return this._write('days/' + date.slice(0, 4) + '/' + date, this.state.days[date]); };
  Store.prototype.saveAssess = function (a) { return this._write('assess/a/' + safeId(a.id), a); };
  Store.prototype.persist = function (touched, now) {
    const ps = [];
    if (touched.profile) ps.push(this.saveProfile());
    for (const id of new Set(touched.cards || [])) ps.push(this.saveCard(id));
    for (const k of new Set(touched.mistakes || [])) ps.push(this.saveMistake(k));
    if (touched.day) ps.push(this.saveDay(GF.model.dayKey(now)));
    return Promise.allSettled(ps);
  };
  Store.prototype.flush = async function () { await Promise.allSettled(Object.values(this.tail || {})); };

  /* ---------- Backup / restauração ---------- */
  Store.prototype.exportData = function (now) {
    const s = this.state;
    const data = { profile: s.profile, cards: Object.values(s.cards), mistakes: Object.values(s.mistakes), days: Object.values(s.days), assess: s.assess, ext: Object.values(s.ext || {}) };
    return { app: 'german-fluency-system', schema: SCHEMA, contentVersion: GF.content.version, exportedAt: now, checksum: fnv(stable(data)), data };
  };
  function validateBackup(obj) {
    if (!obj || obj.app !== 'german-fluency-system') return 'Arquivo não é um backup deste sistema.';
    if (obj.schema !== SCHEMA) return 'Versão de esquema incompatível (' + obj.schema + ').';
    if (!obj.data || !obj.data.profile) return 'Backup sem perfil.';
    if (fnv(stable(obj.data)) !== obj.checksum) return 'Checksum não confere: o arquivo foi alterado ou corrompido.';
    const bad = (obj.data.cards || []).filter((c) => !validCard(c)).length;
    if (bad) return bad + ' itens inválidos no backup.';
    return null;
  }
  Store.prototype.importData = async function (obj) {
    const err = validateBackup(obj); if (err) throw new Error(err);
    const d = obj.data;
    const st = { profile: d.profile, cards: {}, mistakes: {}, days: {}, assess: d.assess || [], ext: {}, integrity: { dropped: 0 } };
    for (const e of d.ext || []) st.ext[e.id] = e;
    for (const c of d.cards) st.cards[c.id] = c;
    for (const m of d.mistakes || []) st.mistakes[m.key] = m;
    for (const x of d.days || []) st.days[x.date] = x;
    this.state = st;
    const ps = [this.saveProfile()];
    for (const id of Object.keys(st.cards)) ps.push(this.saveCard(id));
    for (const k of Object.keys(st.mistakes)) ps.push(this.saveMistake(k));
    for (const k of Object.keys(st.days)) ps.push(this.saveDay(k));
    for (const a of st.assess) ps.push(this.saveAssess(a));
    for (const k of Object.keys(st.ext)) ps.push(this.saveExt(k));
    const res = await Promise.allSettled(ps);
    const failed = res.filter((r) => r.status === 'rejected').length;
    if (failed) throw new Error(failed + ' documentos não puderam ser gravados.');
    return st;
  };
  /** Backup automático semanal dentro do próprio banco (mantém os 4 mais recentes). */
  Store.prototype.autoBackup = async function (now) {
    const wk = 'w' + Math.floor(now / (7 * 86400000));
    const list = await this.b.list('backups/b');
    if (list.some((x) => x.id === wk)) return { skipped: true };
    const exp = this.exportData(now);
    const json = JSON.stringify(exp);
    if (json.length > 240000) return { tooBig: true, size: json.length };
    await this.b.set('backups/b/' + wk, { at: now, json });
    const old = list.sort((a, b) => (b.data.at || 0) - (a.data.at || 0)).slice(3);
    for (const o of old) await this.b.del('backups/b/' + o.id);
    return { saved: wk };
  };
  Store.prototype.listBackups = async function () { return (await this.b.list('backups/b')).map((x) => ({ id: x.id, at: x.data.at, size: (x.data.json || '').length, json: x.data.json })).sort((a, b) => b.at - a.at); };

  GF.store = { Store, DbBackend, MemoryBackend, validateBackup, fnv, stable, SCHEMA, safeId };
})(globalThis.GF = globalThis.GF || {});
