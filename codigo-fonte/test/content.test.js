const test = require('node:test'); const assert = require('node:assert');
const fs = require('fs'), path = require('path'), vm = require('vm');
for (const f of ['fsrs', 'grading', 'content', 'content_a12', 'content_kit', 'content_a2', 'content_a2b', 'content_b1', 'content_b1b', 'content_b2', 'content_b2b', 'model']) vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../src', f + '.js'), 'utf8'), { filename: f + '.js' });
const { content: C, model: M } = globalThis.GF;
const fixedUnits = C.plan.filter((e) => C.units[e.id] && !C.units[e.id].gen);
test('Nenhuma palavra repetida entre unidades (mesmo tipo e forma)', () => {
  const seen = new Map(); const dups = [];
  for (const it of Object.values(C.items)) {
    const k = it.type + ':' + (it.art || '') + ':' + it.de.toLowerCase();
    if (seen.has(k)) dups.push(it.de + ' (' + seen.get(k) + ' / ' + it.unit + ')'); else seen.set(k, it.unit);
  }
  assert.deepStrictEqual(dups, []);
});
test('Unidades fixas: estrutura completa e exercícios com lacuna', () => {
  for (const e of fixedUnits) {
    const u = C.units[e.id];
    assert.ok(u.items.length >= 15, e.id + ' itens');
    assert.ok(u.dialog.length >= 6 && u.listening.length >= 5 && u.speaking.goals.length >= 4 && u.goals.length >= 3, e.id + ' partes');
    for (const g of u.grammar) {
      const G = C.grammar[g]; assert.ok(G, g);
      for (const d of G.drills) { assert.ok(/___/.test(d.q), g + ': ' + d.q); assert.ok(d.a.length && d.a.every((x) => x.trim()), g); }
      assert.ok(G.drills.length >= 5 || (G.order || []).length >= 5, g + ' poucos exercícios');
    }
    for (const id of u.items) { const it = C.items[id]; if (it.type === 'verb') assert.strictEqual(Object.values(it.conj).filter(Boolean).length, 6, id); if (it.type === 'noun') { assert.ok(['der', 'die', 'das'].includes(it.art), id); assert.ok(it.ex.length && it.ex[0][0], id); } }
  }
});
test('A1, A2, B1 e B2 completos como conteúdo fixo, na ordem do plano', () => {
  const ids = fixedUnits.map((e) => e.id);
  for (const lv of ['A1', 'A2', 'B1', 'B2']) assert.deepStrictEqual(ids.filter((x) => x.startsWith(lv)), C.plan.filter((e) => e.level === lv).map((e) => e.id), lv);
  assert.strictEqual(C.unitOrder.indexOf('A2-U1'), C.unitOrder.indexOf('A1-U11') + 1);
});
test('Ao terminar o A1, a próxima aula já é a A2-U1 (sem precisar de IA)', () => {
  const t = Date.now(); const st = { profile: M.newProfile(t), cards: {}, mistakes: {}, days: {}, assess: [] };
  for (const e of C.plan.filter((x) => x.level === 'A1')) st.profile.unitState[e.id] = { passed: 1 };
  assert.strictEqual(M.currentUnit(st), 'A2-U1');
  assert.strictEqual(M.nextToGenerate(st, t), null, 'não precisa gerar nada no A2');
  for (const e of C.plan.filter((x) => x.level === 'A2')) { st.profile.unitState[e.id] = {}; const s = M.buildSession(st, 30, t); assert.ok(s.steps.some((x) => x.kind === 'intro'), e.id); st.profile.unitState[e.id] = { passed: 1 }; }
  for (const lv of ['B1', 'B2']) for (const e of C.plan.filter((x) => x.level === lv)) { st.profile.unitState[e.id] = {}; const s = M.buildSession(st, 30, t); assert.ok(s.steps.some((x) => x.kind === 'intro'), e.id); st.profile.unitState[e.id] = { passed: 1 }; }
  assert.strictEqual(M.currentUnit(st), null);
  assert.strictEqual(M.nextToGenerate(st, t).id, 'C1-U1', 'IA só a partir do C1');
});

test('B2: leitura com perguntas e material autêntico em todas as unidades', () => {
  for (const e of C.plan.filter((x) => x.level === 'B2')) {
    const u = C.units[e.id];
    assert.ok(u.reading && u.reading.text.length >= 3 && u.reading.questions.length >= 3, e.id + ' leitura');
    for (const [q, opts, ok] of u.reading.questions) assert.ok(q && opts.length >= 3 && opts[ok], e.id + ': ' + q);
    assert.ok((u.authentic || []).length >= 2, e.id + ' material autêntico');
  }
});

test('segurança: unidade gerada só mantém <b>, <i> e <br> nos textos com HTML', () => {
  GF.content.addUnit({ id: 'ZZ-SEC', gen: true, title: 't', subtitle: 's', goals: [], itemsData: [], grammarData: { g_zz_sec: { title: 'x', explain: 'ok <b>sim</b><img src=x onerror=alert(1)><script>alert(2)</script><a href="javascript:alert(3)">l</a><br>', compare: '<i>c</i><iframe src="//x"></iframe>', examples: [], drills: [] } } });
  const g = GF.content.grammar.g_zz_sec;
  assert.ok(!/<img|<script|<a |<iframe|onerror|javascript:/i.test(g.explain + g.compare), g.explain + g.compare);
  assert.ok(g.explain.includes('<b>sim</b>') && g.explain.includes('<br>') && g.compare.includes('<i>c</i>'));
});
