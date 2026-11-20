/* Ferramentas para escrever conteúdo fixo por nível (A2 em diante). */
(function (GF) {
  'use strict';
  GF.kit = function (level, prefix) {
    const C = GF.content; const U = {}; let cur = null;
    const add = (o) => {
      if (C.items[o.id]) throw new Error('id duplicado: ' + o.id);
      o.unit = cur; o.ex = o.ex || []; o.note = o.note || ''; o.ipa = o.ipa || ''; C.items[o.id] = o; U[cur].items.push(o.id);
    };
    const id = (s) => prefix + '_' + s;
    return {
      unit(uid, o) { cur = uid; U[uid] = Object.assign({ id: uid, level, items: [], grammar: [], prereq: (C.plan.find((e) => e.id === uid) || {}).prereq || [] }, o); },
      N(list) { list.forEach(([k, art, de, pl, pt, ipa, exde, expt, note]) => add({ id: id(k), type: 'noun', art, de, pl, pt, ipa, ex: [[exde, expt]], note })); },
      V(list) { list.forEach(([k, de, pt, ipa, c, exde, expt, note]) => { const [ich, du, er, wir, ihr, sie] = c.split('|'); add({ id: id(k), type: 'verb', de, pt, ipa, conj: { ich, du, er, wir, ihr, sie }, ex: [[exde, expt]], note }); }); },
      P(list) { list.forEach(([k, de, pt, note, type, ipa]) => add({ id: id(k), type: type || 'phrase', de, pt, note, ipa })); },
      G(gid, g) { g.unit = cur; g.level = level; g.drills = (g.drills || []).map(([q, a, hint]) => ({ q, a, hint: hint || '' })); C.grammar[gid] = g; U[cur].grammar.push(gid); },
      finish(version) { for (const u of Object.values(U)) C.units[u.id] = u; C.recomputeOrder(); if (version) C.version = version; }
    };
  };
})(globalThis.GF = globalThis.GF || {});
