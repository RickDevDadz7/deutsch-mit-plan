const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs'), path = require('path'), vm = require('vm');
for (const f of ['fsrs', 'grading', 'content', 'content_a12', 'model', 'store']) vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../src', f + '.js'), 'utf8'), { filename: f + '.js' });
const { fsrs, grading, content, model, store } = globalThis.GF;
const DAY = 86400000; const T0 = Date.UTC(2026, 10, 20, 12);

test('FSRS: R(S,S)=0.9 e intervalo(S)=S', () => {
  assert.ok(Math.abs(fsrs.retrievability(10, 10) - 0.9) < 1e-9);
  assert.ok(Math.abs(fsrs.intervalFor(10, 0.9) - 10) < 1e-9);
  assert.ok(fsrs.intervalFor(10, 0.8) > 10);
});
test('FSRS: primeira revisão usa S0 por nota e Again volta em ~10 min', () => {
  const g = fsrs.review(fsrs.emptyState(), 3, T0);
  assert.strictEqual(g.s, fsrs.W[2]); assert.strictEqual(g.state, 'review');
  const a = fsrs.review(fsrs.emptyState(), 1, T0);
  assert.ok(a.due - T0 <= 11 * 60000); assert.strictEqual(a.state, 'learning');
});
test('FSRS: acertos espaçados aumentam estabilidade; erro reduz e conta lapso', () => {
  let s = fsrs.review(fsrs.emptyState(), 3, T0);
  const s1 = s.s;
  s = fsrs.review(s, 3, s.due);
  assert.ok(s.s > s1 * 1.5, 'estabilidade deveria crescer: ' + s.s);
  const before = s.s;
  const f = fsrs.review(s, 1, s.due);
  assert.ok(f.s < before); assert.strictEqual(f.lapses, 1); assert.strictEqual(f.state, 'relearning');
});
test('FSRS: dificuldade fica em [1,10] e Easy > Good > Hard em intervalo', () => {
  let s = fsrs.review(fsrs.emptyState(), 3, T0); s = fsrs.review(s, 3, s.due);
  const t = s.due + DAY;
  const h = fsrs.review(s, 2, t), g = fsrs.review(s, 3, t), e = fsrs.review(s, 4, t);
  assert.ok(h.due < g.due && g.due < e.due);
  let x = fsrs.emptyState(); for (let i = 0; i < 30; i++) x = fsrs.review(x, 1, T0 + i * DAY);
  assert.ok(x.d <= 10 && x.d >= 1);
});
test('FSRS: nota inválida lança erro', () => { assert.throws(() => fsrs.review(fsrs.emptyState(), 5, T0)); });

test('Correção: artigo errado é detectado separadamente', () => {
  const r = grading.check('die Tisch', 'der Tisch', { noun: true });
  assert.strictEqual(r.ok, false); assert.strictEqual(r.issues[0].type, 'article');
  const r2 = grading.check('Tisch', 'der Tisch', { noun: true });
  assert.strictEqual(r2.ok, false); assert.strictEqual(r2.issues[0].type, 'article');
});
test('Correção: ae/oe/ue aceito com aviso; erro de digitação leve aceito', () => {
  const r = grading.check('das Broetchen', 'das Brötchen', { noun: true });
  assert.ok(r.ok); assert.strictEqual(r.issues[0].type, 'umlaut');
  const t = grading.check('Telefonnumer', 'Telefonnummer');
  assert.ok(t.ok); assert.strictEqual(t.issues[0].type, 'typo');
  assert.strictEqual(grading.check('Stuhl', 'Tisch').ok, false);
  assert.ok(grading.check('Wie heißt du', 'Wie heißt du?').ok);
});
test('Correção: substantivo minúsculo gera aviso de maiúscula', () => {
  const r = grading.check('der tisch', 'der Tisch', { noun: true });
  assert.ok(r.ok); assert.ok(r.issues.some((i) => i.type === 'capital'));
});
test('Nota FSRS derivada do desempenho', () => {
  assert.strictEqual(grading.gradeFrom({ ok: false, score: 0 }, 3000), 1);
  assert.strictEqual(grading.gradeFrom({ ok: true, score: 1 }, 2000, false, 8000), 4);
  assert.strictEqual(grading.gradeFrom({ ok: true, score: 1 }, 6000, false, 8000), 3);
  assert.strictEqual(grading.gradeFrom({ ok: true, score: 0.75 }, 6000), 2);
  assert.strictEqual(grading.gradeFrom({ ok: true, score: 1 }, 3000, true), 2);
});
test('Fala: correspondência palavra a palavra', () => {
  const m = grading.wordMatch('ich heisse rick', 'Ich heiße Rick.');
  assert.strictEqual(m.ratio, 1);
  assert.deepStrictEqual(grading.wordMatch('ich rick', 'Ich heiße Rick').missing, ['heisse']);
});

test('Conteúdo: todo substantivo tem artigo válido, plural e exemplo', () => {
  for (const it of Object.values(content.items).filter((i) => i.type === 'noun')) {
    assert.ok(['der', 'die', 'das'].includes(it.art), it.id);
    assert.ok(typeof it.pl === 'string', it.id + ' sem plural');
    assert.ok(/^[A-ZÄÖÜ]/.test(it.de), it.id + ' sem maiúscula');
    assert.ok(it.ex.length >= 1, it.id + ' sem exemplo');
  }
});
test('Conteúdo: verbos com 6 formas; unidades com itens e gramática existente', () => {
  for (const it of Object.values(content.items).filter((i) => i.type === 'verb')) assert.strictEqual(Object.values(it.conj).filter(Boolean).length, 6, it.id);
  for (const u of Object.values(content.units)) {
    for (const g of u.grammar) assert.ok(content.grammar[g], g);
    for (const p of u.prereq) assert.ok(content.units[p], p);
    if (u.id !== 'A0-P') assert.ok(u.items.length >= 15, u.id + ' tem poucos itens');
  }
  for (const g of Object.values(content.grammar)) assert.ok(g.drills.length >= 4 || (g.order || []).length >= 4, g.title);
});

function freshState() { return { profile: model.newProfile(T0), cards: {}, mistakes: {}, days: {}, assess: [] }; }
test('Modelo: não marca domínio com um único acerto', () => {
  const st = freshState();
  model.recordAnswer(st, { itemId: 'n_tisch', stage: 'recog', ok: true, score: 1, grade: 3, skill: 'wortschatz' }, T0);
  model.recordAnswer(st, { itemId: 'n_tisch', stage: 'recall', ok: true, score: 1, grade: 3, skill: 'wortschatz' }, T0 + 60000);
  assert.ok(model.mastery(st.cards.n_tisch, T0 + 120000) < 2);
});
test('Modelo: domínio "lembra" exige estabilidade ≥ 3 dias no recall', () => {
  const st = freshState(); let t = T0;
  model.recordAnswer(st, { itemId: 'n_tisch', stage: 'recog', ok: true, score: 1, grade: 3 }, t);
  for (let i = 0; i < 3; i++) { model.recordAnswer(st, { itemId: 'n_tisch', stage: 'recall', ok: true, score: 1, grade: 3 }, t); t = st.cards.n_tisch.stages.recall.due; }
  assert.ok(st.cards.n_tisch.stages.recall.s >= 3);
  assert.ok(model.mastery(st.cards.n_tisch, t) >= 2);
});
test('Modelo: erro de artigo vira padrão de erro recorrente e é resolvido após acertos', () => {
  const st = freshState();
  const iss = [{ type: 'article', msg: 'x' }];
  model.recordAnswer(st, { itemId: 'n_tisch', stage: 'recall', ok: false, score: 0.4, grade: 1, issues: iss, given: 'die Tisch' }, T0);
  model.recordAnswer(st, { itemId: 'n_tisch', stage: 'recall', ok: false, score: 0.4, grade: 1, issues: iss, given: 'die Tisch' }, T0 + 1000);
  const m = Object.values(st.mistakes)[0]; assert.strictEqual(m.count, 2);
  for (let i = 0; i < 3; i++) model.recordAnswer(st, { itemId: 'n_tisch', stage: 'recall', ok: true, score: 1, grade: 3, issues: [] }, T0 + 5000 + i);
  assert.strictEqual(m.fixed, 3);
});
test('Planejador: primeira sessão tem diálogo, itens novos, pronúncia e atividade oral', () => {
  const st = freshState();
  const s = model.buildSession(st, 20, T0);
  const kinds = s.steps.map((x) => x.kind);
  assert.strictEqual(s.unit, 'A1-U1');
  assert.ok(kinds.includes('dialog')); assert.ok(kinds.includes('intro')); assert.ok(kinds.includes('pron'));
  assert.ok(kinds.includes('speak') || kinds.includes('convo'));
  // checagem de recuperação do item novo dentro da mesma sessão
  assert.ok(s.steps.some((x) => x.kind === 'review' && x.fresh));
});
test('Planejador: sessão curta preserva revisão + fala', () => {
  const st = freshState();
  const s = model.buildSession(st, 5, T0);
  const kinds = s.steps.map((x) => x.kind);
  assert.ok(kinds.includes('speak')); assert.ok(!kinds.includes('convo')); assert.ok(kinds.filter((k) => k === 'intro').length <= 2);
});
test('Planejador: não avança de unidade sem checkpoint aprovado', () => {
  const st = freshState();
  for (const id of content.units['A1-U1'].items) st.cards[id] = model.newCard(content.items[id], T0);
  assert.strictEqual(model.currentUnit(st), 'A1-U1');
  st.profile.unitState['A1-U1'] = { passed: true };
  assert.strictEqual(model.currentUnit(st), 'A1-U2');
  assert.ok(model.checkpointPass(0.85, { a: 0.8, b: 0.75 }));
  assert.ok(!model.checkpointPass(0.9, { a: 1, b: 0.6 }), 'uma habilidade fraca reprova');
});
test('Adaptação: baixa retenção reduz novos itens e registra motivo', () => {
  const st = freshState();
  st.days[model.dayKey(T0)] = { date: model.dayKey(T0), reviews: 40, correct: 25, minutes: 10 };
  assert.ok(model.adapt(st, T0));
  assert.strictEqual(st.profile.settings.newPerDay, 6);
  assert.ok(st.profile.adapt[0].why.includes('reduzir'));
});

test('Store: persiste, recarrega, exporta e restaura com checksum', async () => {
  const be = store.MemoryBackend(null);
  const s1 = new store.Store(be); await s1.load(T0);
  const tch = model.recordAnswer(s1.state, { itemId: 'n_tisch', stage: 'recog', ok: true, score: 1, grade: 3, skill: 'wortschatz' }, T0);
  await s1.persist(tch, T0); await s1.flush();
  const s2 = new store.Store(be); await s2.load(T0);
  assert.ok(s2.state.cards.n_tisch); assert.strictEqual(s2.state.cards.n_tisch.stages.recog.reps, 1);
  const exp = s2.exportData(T0);
  assert.strictEqual(store.validateBackup(exp), null);
  const tampered = JSON.parse(JSON.stringify(exp)); tampered.data.cards[0].correct = 99;
  assert.match(store.validateBackup(tampered), /Checksum/);
  const be2 = store.MemoryBackend(null); const s3 = new store.Store(be2); await s3.load(T0);
  await s3.importData(JSON.parse(JSON.stringify(exp))); await s3.flush();
  const s4 = new store.Store(be2); await s4.load(T0);
  assert.deepStrictEqual(s4.state.cards.n_tisch, s2.state.cards.n_tisch);
});
test('Store: escritas no mesmo documento são serializadas e coalescidas', async () => {
  let inflight = 0, maxInflight = 0, writes = 0;
  const be = store.MemoryBackend(null); const orig = be.set;
  be.set = async (p, d) => { inflight++; writes++; maxInflight = Math.max(maxInflight, inflight); await new Promise((r) => setTimeout(r, 5)); await orig(p, d); inflight--; };
  const s = new store.Store(be); await s.load(T0);
  for (let i = 0; i < 10; i++) { s.state.profile.minutes = i; s.saveProfile(); }
  await s.flush();
  assert.strictEqual(maxInflight, 1); assert.ok(writes <= 3, 'coalescência: ' + writes);
  assert.strictEqual((await be.get('profile')).minutes, 9);
});
test('Store: dado corrompido é descartado na carga (integridade)', async () => {
  const be = store.MemoryBackend(null);
  await be.set('srs/A1/bad', { id: 'bad', stages: { recog: { s: 'x' } } });
  const s = new store.Store(be); await s.load(T0);
  assert.strictEqual(s.state.integrity.dropped, 1); assert.ok(!s.state.cards.bad);
});
test('Store: backup automático semanal, mantém no máximo 4', async () => {
  const be = store.MemoryBackend(null); const s = new store.Store(be); await s.load(T0);
  for (let w = 0; w < 6; w++) await s.autoBackup(T0 + w * 7 * DAY);
  const l = await s.listBackups(); assert.strictEqual(l.length, 4);
  assert.strictEqual((await s.autoBackup(T0 + 5 * 7 * DAY)).skipped, true);
  assert.strictEqual(store.validateBackup(JSON.parse(l[0].json)), null);
});
