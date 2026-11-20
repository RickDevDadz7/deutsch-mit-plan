/* FSRS-5 — Free Spaced Repetition Scheduler (Ye et al.; open-spaced-repetition).
 * Implementação própria, sem dependências, seguindo as fórmulas públicas do FSRS-5
 * (DSR: Difficulty, Stability, Retrievability) com os pesos padrão do ts-fsrs.
 * Notas: 1 = Errei (Again), 2 = Difícil (Hard), 3 = Bom (Good), 4 = Fácil (Easy).
 */
(function (GF) {
  'use strict';
  const W = [0.40255, 1.18385, 3.173, 15.69105, 7.1949, 0.5345, 1.4604, 0.0046, 1.54575,
    0.1192, 1.01925, 1.9395, 0.11, 0.29605, 2.2698, 0.2315, 2.9898, 0.51655, 0.6621];
  const DECAY = -0.5;
  const FACTOR = 19 / 81; // garante R(S,S) = 0.9
  const DAY = 86400000;
  const clamp = (x, a, b) => Math.min(b, Math.max(a, x));

  function retrievability(elapsedDays, S) {
    if (!S || S <= 0) return 0;
    return Math.pow(1 + FACTOR * Math.max(0, elapsedDays) / S, DECAY);
  }
  function intervalFor(S, desiredR) {
    const r = desiredR || 0.9;
    return (S / FACTOR) * (Math.pow(r, 1 / DECAY) - 1);
  }
  const initS = (g) => Math.max(0.1, W[g - 1]);
  const initD = (g) => clamp(W[4] - Math.exp(W[5] * (g - 1)) + 1, 1, 10);
  function nextD(D, g) {
    const delta = -W[6] * (g - 3);
    const dp = D + delta * (10 - D) / 9; // amortecimento linear (FSRS-5)
    return clamp(W[7] * initD(4) + (1 - W[7]) * dp, 1, 10); // reversão à média
  }
  function recallS(D, S, R, g) {
    const hard = g === 2 ? W[15] : 1;
    const easy = g === 4 ? W[16] : 1;
    return S * (Math.exp(W[8]) * (11 - D) * Math.pow(S, -W[9]) *
      (Math.exp(W[10] * (1 - R)) - 1) * hard * easy + 1);
  }
  function forgetS(D, S, R) {
    const s = W[11] * Math.pow(D, -W[12]) * (Math.pow(S + 1, W[13]) - 1) * Math.exp(W[14] * (1 - R));
    return Math.min(s, S);
  }
  const shortTermS = (S, g) => S * Math.exp(W[17] * (g - 3 + W[18]));

  /** Estado vazio de um "estágio" de memória. */
  function emptyState() {
    return { s: 0, d: 0, reps: 0, lapses: 0, last: 0, due: 0, state: 'new' };
  }

  /**
   * Aplica uma revisão. Retorna NOVO estado (não muta).
   * @param {object} st estado atual
   * @param {number} g nota 1..4
   * @param {number} now timestamp ms
   * @param {number} desiredR retenção desejada (0.7..0.97)
   */
  function review(st, g, now, desiredR) {
    if (![1, 2, 3, 4].includes(g)) throw new Error('nota inválida: ' + g);
    const r = clamp(desiredR || 0.9, 0.7, 0.97);
    const o = Object.assign(emptyState(), st || {});
    let S, D;
    if (o.state === 'new' || !o.s) {
      S = initS(g); D = initD(g);
    } else {
      const elapsed = (now - o.last) / DAY;
      if (elapsed < 1) { // revisão no mesmo dia
        S = shortTermS(o.s, g); D = nextD(o.d, g);
      } else {
        const R = retrievability(elapsed, o.s);
        D = nextD(o.d, g);
        S = g === 1 ? forgetS(o.d, o.s, R) : recallS(o.d, o.s, R, g);
      }
    }
    S = clamp(S, 0.05, 36500);
    let ivlDays;
    if (g === 1) ivlDays = 10 / 1440; // reaparece em ~10 min
    else ivlDays = Math.max(g === 2 && o.state === 'new' ? 0.25 : 1, Math.round(intervalFor(S, r)));
    return {
      s: S, d: D,
      reps: o.reps + 1,
      lapses: o.lapses + (g === 1 && o.state !== 'new' ? 1 : 0),
      last: now,
      due: now + ivlDays * DAY,
      state: g === 1 ? (o.state === 'new' ? 'learning' : 'relearning') : 'review'
    };
  }

  function currentR(st, now) {
    if (!st || st.state === 'new' || !st.s) return 0;
    return retrievability((now - st.last) / DAY, st.s);
  }

  GF.fsrs = { W, DECAY, FACTOR, DAY, retrievability, intervalFor, review, currentR, emptyState, initD, initS };
})(globalThis.GF = globalThis.GF || {});
