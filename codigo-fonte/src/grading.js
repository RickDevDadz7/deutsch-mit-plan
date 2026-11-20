/* Correção de respostas: normalização, artigos, tremas, distância de edição,
 * e conversão de desempenho em nota FSRS. Funções puras. */
(function (GF) {
  'use strict';
  const ARTICLES = ['der', 'die', 'das'];

  function lev(a, b) {
    a = a || ''; b = b || '';
    const m = a.length, n = b.length;
    if (!m) return n; if (!n) return m;
    let prev = Array.from({ length: n + 1 }, (_, j) => j);
    for (let i = 1; i <= m; i++) {
      const cur = [i];
      for (let j = 1; j <= n; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      }
      prev = cur;
    }
    return prev[n];
  }
  function similarity(a, b) {
    const L = Math.max((a || '').length, (b || '').length);
    return L ? 1 - lev(a, b) / L : 1;
  }
  /** Normalização base: minúsculas, sem pontuação, espaços simples. Mantém ä ö ü ß. */
  function norm(s) {
    return String(s || '').toLowerCase()
      .replace(/[’']/g, "'")
      .replace(/[.,!?;:¿¡"„“”()«»…]/g, ' ')
      .replace(/\s+/g, ' ').trim();
  }
  /** Converte transliterações (ae, oe, ue, ss) para comparação tolerante. */
  function fold(s) {
    return norm(s).replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss');
  }

  /**
   * Compara a resposta do aluno com uma ou mais respostas aceitas.
   * Retorna { ok, score (0..1), issues: [{type, msg}] , best }
   * type: 'article' | 'umlaut' | 'typo' | 'capital' | 'wrong'
   */
  function check(answer, accepted, opts) {
    opts = opts || {};
    const list = Array.isArray(accepted) ? accepted : [accepted];
    const a = norm(answer);
    if (!a) return { ok: false, score: 0, issues: [{ type: 'wrong', msg: 'Sem resposta.' }], best: list[0] };
    let best = null;
    for (const target of list) {
      const t = norm(target);
      const r = { target, issues: [], score: 0, ok: false };
      if (a === t) { r.ok = true; r.score = 1; }
      else {
        const aw = a.split(' '), tw = t.split(' ');
        // artigo errado num substantivo: "die tisch" vs "der tisch"
        if (opts.noun && ARTICLES.includes(tw[0]) && aw.length === tw.length &&
            aw.slice(1).join(' ') === tw.slice(1).join(' ')) {
          if (ARTICLES.includes(aw[0])) r.issues.push({ type: 'article', msg: `Artigo: o correto é “${tw[0]}”, não “${aw[0]}”.` });
          else r.issues.push({ type: 'article', msg: `Faltou o artigo “${tw[0]}”.` });
          r.score = 0.4;
        } else if (opts.noun && ARTICLES.includes(tw[0]) && aw.join(' ') === tw.slice(1).join(' ')) {
          r.issues.push({ type: 'article', msg: `Faltou o artigo “${tw[0]}”. Substantivo sempre com artigo.` });
          r.score = 0.4;
        } else if (fold(a) === fold(t)) {
          r.ok = true; r.score = 0.9;
          r.issues.push({ type: 'umlaut', msg: 'Aceito, mas use ä/ö/ü/ß em vez de ae/oe/ue/ss.' });
        } else {
          const sim = similarity(fold(a), fold(t));
          if (sim >= 0.85 && t.length >= 4) {
            r.ok = true; r.score = 0.75;
            r.issues.push({ type: 'typo', msg: `Quase: confira a grafia (“${target}”).` });
          } else {
            r.score = Math.max(0, sim * 0.5);
            r.issues.push({ type: 'wrong', msg: `Resposta esperada: “${target}”.` });
          }
        }
      }
      // maiúscula de substantivo (só aviso)
      if (r.ok && opts.noun && opts.raw !== false) {
        const words = String(answer).trim().split(/\s+/);
        const nounWord = words[words.length - 1] || '';
        if (nounWord && nounWord[0] === nounWord[0].toLowerCase() && /[a-zäöü]/.test(nounWord[0])) {
          r.issues.push({ type: 'capital', msg: 'Em alemão, substantivos começam com maiúscula.' });
        }
      }
      if (!best || r.score > best.score) best = r;
    }
    return { ok: best.ok, score: best.score, issues: best.issues, best: best.target };
  }

  /** Nota FSRS a partir do resultado. ms = tempo de resposta; hint = usou dica. */
  function gradeFrom(result, ms, hint, expectedMs) {
    if (!result.ok) return 1;
    if (hint || result.score < 0.85) return 2;
    const e = expectedMs || 8000;
    if (ms && ms < e * 0.45 && result.score === 1) return 4;
    if (ms && ms > e * 1.6) return 2;
    return 3;
  }

  /** Similaridade palavra a palavra para avaliar inteligibilidade de fala transcrita. */
  function wordMatch(spoken, target) {
    const s = fold(spoken).split(' ').filter(Boolean);
    const t = fold(target).split(' ').filter(Boolean);
    if (!t.length) return { ratio: 0, missing: [] };
    const used = new Array(s.length).fill(false);
    const missing = [];
    let hit = 0;
    for (const w of t) {
      let k = -1;
      for (let i = 0; i < s.length; i++) if (!used[i] && (s[i] === w || (w.length > 3 && similarity(s[i], w) >= 0.8))) { k = i; break; }
      if (k >= 0) { used[k] = true; hit++; } else missing.push(w);
    }
    return { ratio: hit / t.length, missing };
  }

  GF.grading = { lev, similarity, norm, fold, check, gradeFrom, wordMatch };
})(globalThis.GF = globalThis.GF || {});
