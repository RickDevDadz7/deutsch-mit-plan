const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs'), path = require('path'), vm = require('vm');
for (const f of ['fsrs', 'grading', 'content', 'model', 'store', 'sync']) vm.runInThisContext(fs.readFileSync(path.join(__dirname, '../src', f + '.js'), 'utf8'), { filename: f + '.js' });
const { model, sync, fsrs } = globalThis.GF;
const T0 = Date.UTC(2026, 10, 20, 12), DAY = 86400000;
const st = () => ({ profile: Object.assign(model.newProfile(T0), { diag: { minutes: 20, days: [1] } }), cards: {}, mistakes: {}, days: {}, assess: [], ext: {} });

test('Criptografia: ida e volta; senha errada é recusada', async () => {
  const salt = Buffer.from('0123456789abcdef').toString('base64');
  const k = await sync.deriveKey('senha-forte-1', salt), k2 = await sync.deriveKey('outra-senha', salt);
  const box = await sync.encrypt(k, { a: 1, txt: 'Grüß Gott' });
  assert.deepStrictEqual(await sync.decrypt(k, box), { a: 1, txt: 'Grüß Gott' });
  await assert.rejects(() => sync.decrypt(k2, box), /Senha/);
});
test('Mesclagem de item: cada estágio fica com a revisão mais recente', () => {
  const A = st(), B = st();
  model.recordAnswer(A, { itemId: 'n_tisch', stage: 'recog', ok: true, score: 1, grade: 3 }, T0);
  B.cards.n_tisch = JSON.parse(JSON.stringify(A.cards.n_tisch));
  model.recordAnswer(A, { itemId: 'n_tisch', stage: 'recall', ok: true, score: 1, grade: 3 }, T0 + DAY);      // só no aparelho A
  model.recordAnswer(B, { itemId: 'n_tisch', stage: 'recog', ok: false, score: 0, grade: 1 }, T0 + 2 * DAY); // só no B, depois
  const m = sync.mergeCard(A.cards.n_tisch, B.cards.n_tisch).v;
  assert.strictEqual(m.stages.recall.reps, 1, 'mantém recall do A');
  assert.strictEqual(m.stages.recog.last, T0 + 2 * DAY, 'recog mais recente vem do B');
  assert.strictEqual(m.stages.recog.lapses, 1);
});
test('Mesclagem é idempotente (sincronizar 2× não muda nada)', () => {
  const A = st(), B = st();
  model.recordAnswer(B, { itemId: 'n_stuhl', stage: 'recog', ok: true, score: 1, grade: 3, skill: 'wortschatz' }, T0);
  const payload = { profile: B.profile, cards: Object.values(B.cards), mistakes: [], assess: [], days: B.days };
  const t1 = sync.mergeRemote(A, payload, { id: 'dB', name: 'Celular', at: T0 });
  assert.ok(t1.cards.length === 1 && t1.ext);
  const t2 = sync.mergeRemote(A, payload, { id: 'dB', name: 'Celular', at: T0 });
  assert.strictEqual(t2.cards.length, 0); assert.strictEqual(t2.ext, false); assert.strictEqual(t2.profile, false);
});
test('Dias de estudo de aparelhos diferentes são somados, sem duplicar', () => {
  const A = st();
  A.days['2026-11-20'] = { date: '2026-11-20', minutes: 10, reviews: 5, correct: 4, sessions: 1 };
  sync.mergeRemote(A, { profile: A.profile, cards: [], mistakes: [], assess: [], days: { '2026-11-20': { date: '2026-11-20', minutes: 15, reviews: 8, correct: 8, sessions: 1 } } }, { id: 'dB', name: 'PC', at: T0 });
  sync.mergeRemote(A, { profile: A.profile, cards: [], mistakes: [], assess: [], days: { '2026-11-20': { date: '2026-11-20', minutes: 15, reviews: 8, correct: 8, sessions: 1 } } }, { id: 'dB', name: 'PC', at: T0 });
  const d = model.allDays(A)['2026-11-20'];
  assert.strictEqual(d.minutes, 25); assert.strictEqual(d.reviews, 13); assert.strictEqual(d.sessions, 2);
  assert.strictEqual(model.stats(A, T0).minutes, 25);
});
test('Perfil: aparelho novo adota o perfil; progresso de unidade nunca regride', () => {
  const fresh = { profile: model.newProfile(T0), cards: {}, mistakes: {}, days: {}, assess: [], ext: {} };
  const A = st(); A.profile.name = 'Rick'; A.profile.unitState['A1-U1'] = { passed: T0, convos: 1 };
  assert.strictEqual(sync.mergeProfile(fresh.profile, A.profile).v.name, 'Rick');
  const B = st(); B.profile._u = T0 + 999; B.profile.unitState['A1-U1'] = { convos: 3, listen: [1, 1, 0.5] };
  const m = sync.mergeProfile(A.profile, B.profile).v;
  assert.strictEqual(m.unitState['A1-U1'].passed, T0, 'aprovação do outro aparelho é mantida');
  assert.strictEqual(m.unitState['A1-U1'].convos, 3);
  assert.strictEqual(m.unitState['A1-U1'].listen.length, 3);
});
test('Avaliações são unidas por id; erros recorrentes mantêm a maior contagem', () => {
  const A = st();
  A.assess.push({ id: 'cp1', at: T0, score: 0.9 });
  sync.mergeRemote(A, { profile: A.profile, cards: [], mistakes: [{ key: 'k', count: 4, lastAt: T0, fixed: 0, msg: 'x', given: [] }], assess: [{ id: 'cp1', at: T0 }, { id: 'cp2', at: T0 + 1 }], days: {} }, { id: 'dB', name: 'PC', at: T0 });
  assert.strictEqual(A.assess.length, 2); assert.strictEqual(A.mistakes.k.count, 4);
});
