const test = require('node:test'); const assert = require('node:assert');
const fs = require('fs'), path = require('path'), vm = require('vm');
for (const f of ['fsrs', 'grading', 'content', 'content_a12', 'content_kit', 'content_a2', 'content_a2b', 'content_b1', 'content_b1b', 'content_b2', 'content_b2b', 'model', 'store', 'gen']) vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../src', f + '.js'), 'utf8'), { filename: f + '.js' });
const { gen, content: C, model } = globalThis.GF;
const fx = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/unit_c1u1.json'), 'utf8'));
const pe = C.plan.find((e) => e.id === 'C1-U1');
test('Plano: 42 unidades A1→C2, ids únicos, pré-requisito encadeado', () => {
  assert.strictEqual(C.plan.length, 42); assert.strictEqual(new Set(C.plan.map((e) => e.id)).size, 42);
  assert.deepStrictEqual(C.plan.find((e) => e.id === 'B1-U1').prereq, ['A2-U8']); assert.deepStrictEqual(C.plan.find((e) => e.id === 'A2-U1').prereq, ['A1-U11']);
});
test('Validação: descarta duplicados, artigo inválido e drill sem lacuna; limpa HTML', () => {
  const bad = JSON.parse(JSON.stringify(fx));
  bad.items.push({ type: 'noun', art: 'der', de: 'Tisch', pl: 'Tische', pt: 'dup', ex: ['x', 'y'] }, { type: 'noun', art: 'dem', de: 'Kaputt', pl: '', pt: 'x', ex: ['x', 'y'] });
  bad.grammar[0].drills.push({ q: 'sem lacuna', a: ['x'] }); bad.grammar[0].explain += '<script>alert(1)</script>';
  const u = gen.validate(pe, bad);
  assert.ok(!u.itemsData.some((i) => i.de === 'Tisch'), 'duplicado do A1 descartado');
  assert.ok(!u.itemsData.some((i) => i.de === 'Kaputt'), 'artigo inválido descartado');
  const g = Object.values(u.grammarData)[0];
  assert.strictEqual(g.drills.length, 5); assert.ok(!g.explain.includes('<script'), 'script removido'); assert.ok(g.explain.includes('<b>Nominalstil</b>'));
  assert.ok(u.itemsData.every((i) => i.id.startsWith('c1u1_')));
});
test('Validação: unidade inutilizável é recusada', () => {
  assert.throws(() => gen.validate(pe, { items: [] }), /poucos itens/);
  assert.throws(() => gen.validate(pe, Object.assign({}, fx, { grammar: [] })), /gramática/);
});
test('Geração: rascunho → revisão → unidade registrada e estudável', async () => {
  const calls = [];
  const ask = async (p) => { calls.push(p.slice(0, 30)); return p.startsWith('Você é um revisor') ? Object.assign({}, fx, { review: { changes: ['plural de Wecker'], confidence: 'alta' } }) : fx; };
  const u = await gen.generate(pe, ask, { known: [], recurring: [] });
  assert.strictEqual(calls.length, 2); assert.ok(u.gen.reviewed); assert.deepStrictEqual(u.gen.changes, ['plural de Wecker']);
  C.addUnit(JSON.parse(JSON.stringify(u)));
  assert.ok(C.units['C1-U1'] && C.unitOrder.includes('C1-U1'));
  const st = { profile: model.newProfile(Date.now()), cards: {}, mistakes: {}, days: {}, assess: [] };
  for (const e of C.plan.filter((x) => x.level === 'A1' || x.level === 'A2' || x.level === 'B1' || x.level === 'B2')) st.profile.unitState[e.id] = { passed: 1 };
  assert.strictEqual(model.currentUnit(st), 'C1-U1');
  const plan = model.buildSession(st, 20, Date.now());
  assert.ok(plan.steps.some((s) => s.kind === 'intro' && C.items[s.id].unit === 'C1-U1'));
  assert.strictEqual(model.nextToGenerate(st, Date.now()), null, 'C1-U2 só depois de avançar na C1-U1');
  assert.match(model.estimateLevel(st).label, /C1 em progresso/);
});
test('Conteúdo fixo nunca é substituído por unidade gerada', () => {
  assert.strictEqual(C.addUnit({ id: 'A1-U1', itemsData: [], grammarData: {} }), false);
  assert.strictEqual(C.addUnit({ id: 'A1-U8', itemsData: [], grammarData: {} }), false);
});
test('A1.2 fixo: 6 unidades completas, encadeadas e com critérios', () => {
  for (const id of ['A1-U6', 'A1-U7', 'A1-U8', 'A1-U9', 'A1-U10', 'A1-U11']) {
    const u = C.units[id]; assert.ok(u && !u.gen, id);
    assert.ok(u.items.length >= 20, id + ' itens ' + u.items.length);
    assert.ok(u.grammar.length >= 1 && u.dialog.length >= 6 && u.listening.length >= 5 && u.speaking.goals.length >= 4, id);
    for (const g of u.grammar) assert.ok(C.grammar[g].drills.length >= 5 || (C.grammar[g].order || []).length >= 5, g);
  }
  assert.deepStrictEqual(C.units['A1-U7'].prereq, ['A1-U6']);
  assert.deepStrictEqual(C.unitOrder.slice(0, 12), ['A0-P', 'A1-U1', 'A1-U2', 'A1-U3', 'A1-U4', 'A1-U5', 'A1-U6', 'A1-U7', 'A1-U8', 'A1-U9', 'A1-U10', 'A1-U11']);
});
