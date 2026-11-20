/* Modelo do aluno: registro de respostas, domínio por item, critérios de unidade,
 * adaptação e planejamento de sessões. Puro (recebe o estado, devolve mudanças). */
(function (GF) {
  'use strict';
  const { fsrs } = GF;
  const DAY = 86400000;
  const STAGES = ['recog', 'recall', 'listen', 'use'];
  const STAGE_PT = { recog: 'reconhecer', recall: 'lembrar', listen: 'ouvir', use: 'usar' };
  const SKILLS = ['hoeren', 'lesen', 'schreiben', 'sprechen', 'grammatik', 'wortschatz', 'aussprache'];
  const SKILL_PT = { hoeren: 'Hören (audição)', lesen: 'Lesen (leitura)', schreiben: 'Schreiben (escrita)', sprechen: 'Sprechen (fala)', grammatik: 'Grammatik', wortschatz: 'Wortschatz (vocabulário)', aussprache: 'Aussprache (pronúncia)' };
  const MASTERY_PT = ['novo', 'reconhece', 'lembra', 'usa', 'espontâneo'];

  const dayKey = (t) => { const d = new Date(t); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };

  function newProfile(now) {
    return {
      schema: 1, createdAt: now, name: '', diag: null,
      settings: { desiredR: 0.9, newPerDay: 8, ttsRate: 0.85 },
      unitState: {}, grammarStats: {}, skillStats: {}, pronStats: { pairs: [] , done: {} },
      streak: { days: [] }, minutes: 0, sessions: 0, adapt: [], placement: null, lastSessionAt: 0
    };
  }
  function newCard(item, now) {
    const stages = {};
    for (const s of STAGES) stages[s] = fsrs.emptyState();
    return { id: item.id, unit: item.unit, level: (item.unit || 'A1').slice(0, 2), introduced: now, stages, attempts: 0, correct: 0, msSum: 0, msN: 0, errors: [], spont: 0 };
  }
  function stagesFor(item) {
    const st = ['recog', 'recall', 'listen'];
    if (item.type === 'noun' || item.type === 'verb' || item.type === 'phrase') st.push('use');
    return st;
  }
  function stageUnlocked(card, stage) {
    const S = card.stages;
    if (stage === 'recog') return true;
    if (stage === 'recall' || stage === 'listen') return S.recog.reps > 0;
    if (stage === 'use') return S.recall.state === 'review' && S.recall.s >= 2;
    return false;
  }
  function mastery(card, now) {
    if (!card) return 0;
    const S = card.stages;
    const Rrec = fsrs.currentR(S.recall, now);
    const sp = Object.assign({ recall: 0, use: 0 }, card.spaced || {});
    let m = 0;
    if (S.recog.reps > 0 && S.recog.state === 'review') m = 1;
    if (m >= 1 && S.recall.state === 'review' && S.recall.s >= 3 && Rrec >= 0.8 && sp.recall >= 1) m = 2;
    if (m >= 2 && S.use.state === 'review' && S.use.s >= 7 && S.recall.s >= 7 && sp.use >= 1) m = 3;
    if (m >= 3 && card.spont >= 2) m = 4;
    return m;
  }
  function forgetting(card, now) {
    if (!card || card.stages.recall.reps === 0) return false;
    return fsrs.currentR(card.stages.recall, now) < 0.7 || card.stages.recall.lapses >= 3;
  }
  function pushStat(arr, v, max) { arr.push(v); while (arr.length > (max || 50)) arr.shift(); return arr; }

  /**
   * Registra uma resposta. Muta e devolve os objetos tocados para persistência.
   * a = { itemId, stage, ok, score, grade, ms, issues[], given, skill }
   */
  function recordAnswer(state, a, now) {
    const touched = { profile: true, cards: [], mistakes: [], day: true };
    const p = state.profile;
    const day = state.days[dayKey(now)] || (state.days[dayKey(now)] = { date: dayKey(now), minutes: 0, reviews: 0, correct: 0, newItems: 0, sessions: 0, shortN: 0, shortOk: 0, longN: 0, longOk: 0 });
    if (a.itemId && a.stage) {
      const item = GF.content.items[a.itemId];
      let card = state.cards[a.itemId];
      if (!card) { card = state.cards[a.itemId] = newCard(item || { id: a.itemId }, now); day.newItems++; }
      const before = card.stages[a.stage];
      const elapsedDays = before.last ? (now - before.last) / DAY : 0;
      card.stages[a.stage] = fsrs.review(before, a.grade, now, p.settings.desiredR);
      card.attempts++; if (a.ok) card.correct++;
      if (a.ok && elapsedDays >= 1) { card.spaced = card.spaced || {}; card.spaced[a.stage] = (card.spaced[a.stage] || 0) + 1; }
      if (a.ms) { card.msSum += a.ms; card.msN++; }
      if (!a.ok || (a.issues && a.issues.some((i) => i.type === 'article'))) {
        card.errors.push({ t: now, stage: a.stage, given: String(a.given || '').slice(0, 60), type: (a.issues && a.issues[0] && a.issues[0].type) || 'wrong' });
        while (card.errors.length > 10) card.errors.shift();
      }
      if (before.reps > 0) {
        day.reviews++; if (a.ok) day.correct++;
        if (elapsedDays >= 7) { day.longN++; if (a.ok) day.longOk++; } else { day.shortN++; if (a.ok) day.shortOk++; }
      }
      touched.cards.push(a.itemId);
    }
    if (a.skill) { p.skillStats[a.skill] = pushStat(p.skillStats[a.skill] || [], { t: now, v: a.score != null ? a.score : (a.ok ? 1 : 0) }); }
    // padrões de erro
    for (const iss of a.issues || []) {
      if (iss.type === 'capital' || iss.type === 'umlaut' && a.ok) continue;
      const key = (iss.type + '_' + (a.itemId || a.key || 'x')).slice(0, 120);
      const m = state.mistakes[key] || (state.mistakes[key] = { key, type: iss.type, item: a.itemId || null, ref: a.key || null, msg: iss.msg, count: 0, fixed: 0, lastAt: 0, given: [] });
      m.count++; m.fixed = 0; m.lastAt = now; m.msg = iss.msg; m.given = pushStat(m.given, String(a.given || '').slice(0, 60), 5);
      touched.mistakes.push(key);
    }
    if (a.ok && !(a.issues || []).length) {
      for (const m of Object.values(state.mistakes)) {
        if ((m.item && m.item === a.itemId) || (m.ref && m.ref === a.key)) { m.fixed++; touched.mistakes.push(m.key); }
      }
    }
    return touched;
  }

  function recentRate(arr, n) { const xs = (arr || []).slice(-(n || 30)); if (!xs.length) return null; return xs.reduce((s, x) => s + (x.v != null ? x.v : x), 0) / xs.length; }

  /** Estado de uma unidade e se cumpre os critérios objetivos. */
  function unitStatus(state, uid, now) {
    const C = GF.content, u = C.units[uid];
    const us = state.profile.unitState[uid] || {};
    const items = u.items || [];
    const intro = items.filter((id) => state.cards[id]).length;
    const recalled = items.filter((id) => mastery(state.cards[id], now) >= 2).length;
    const gr = (u.grammar || []).map((g) => ({ id: g, rate: recentRate((state.profile.grammarStats[g] || []), 10), n: (state.profile.grammarStats[g] || []).length, seen: !!(us.grammarSeen || {})[g] }));
    const grammarOk = gr.every((g) => g.n >= 5 && g.rate >= 0.8);
    const listen = recentRate(us.listen || [], 10);
    const pairs = recentRate(state.profile.pronStats.pairs, 20);
    const status = {
      uid, items: items.length, intro, recalled,
      vocabPct: items.length ? recalled / items.length : 1,
      grammar: gr, grammarOk,
      listen, listenOk: uid === 'A0-P' ? true : (listen != null && listen >= 0.75 && (us.listen || []).length >= 4),
      convos: us.convos || 0, convoOk: uid === 'A0-P' ? true : (us.convos || 0) >= 1,
      writing: us.writing || null, writingOk: uid === 'A0-P' ? true : !!(us.writing && us.writing.score >= 3),
      checkpoint: us.checkpoint || null,
      passed: !!us.passed
    };
    if (uid === 'A0-P') {
      const done = Object.keys(state.profile.pronStats.done || {}).length;
      status.pronDone = done; status.pairs = pairs;
      status.ready = done >= Object.keys(C.pron).length && pairs != null && pairs >= 0.8 && state.profile.pronStats.pairs.length >= 10;
      status.vocabPct = 1;
    } else {
      status.ready = status.vocabPct >= 0.9 && grammarOk && status.listenOk && status.convoOk && status.writingOk;
    }
    return status;
  }
  function checkpointPass(score, bySkill) {
    return score >= 0.8 && Object.values(bySkill).every((v) => v >= 0.7);
  }
  function currentUnit(state) {
    const C = GF.content;
    for (const uid of C.unitOrder) {
      if (uid === 'A0-P') continue;
      const u = C.units[uid];
      const us = state.profile.unitState[uid];
      if (!(us && us.passed)) {
        const prereqOk = (u.prereq || []).every((p) => (state.profile.unitState[p] || {}).passed);
        if (prereqOk) return uid;
        return null;
      }
    }
    return null; // tudo concluído no conteúdo carregado
  }
  function estimateLevel(state) {
    const C = GF.content;
    const a1 = C.unitOrder.filter((u) => u.startsWith('A1'));
    const passed = a1.filter((u) => (state.profile.unitState[u] || {}).passed).length;
    if (passed === 0) return { code: 'A0', label: 'A0 — iniciando A1', detail: 'Nenhuma unidade A1 comprovada ainda.' };
    if (passed < a1.length) return { code: 'A1.1', label: 'A1.1 em progresso', detail: passed + ' de ' + a1.length + ' unidades do A1.1 comprovadas.' };
    return { code: 'A1.1', label: 'A1.1 concluído', detail: 'Todas as unidades A1.1 carregadas comprovadas. A1 completo exige o módulo A1.2 e o simulado Start Deutsch 1.' };
  }

  /** Adaptação da quantidade de conteúdo novo (registrada com motivo). */
  function adapt(state, now) {
    const p = state.profile;
    const days = Object.values(state.days).filter((d) => now - new Date(d.date + 'T12:00:00').getTime() <= 7 * DAY);
    const n = days.reduce((s, d) => s + d.reviews, 0), ok = days.reduce((s, d) => s + d.correct, 0);
    const backlog = dueList(state, now).length;
    const old = p.settings.newPerDay;
    let nv = old, why = '';
    if (n >= 30) {
      const r = ok / n;
      if (r < 0.8) { nv = Math.max(3, old - 2); why = `acerto nas revisões de 7 dias = ${Math.round(r * 100)}% (< 80%): reduzir novos`; }
      else if (r > 0.92 && backlog < 40) { nv = Math.min(20, old + 1); why = `acerto = ${Math.round(r * 100)}% e poucas revisões pendentes: aumentar novos`; }
    }
    if (backlog > 120 && nv > 3) { nv = 3; why = `${backlog} revisões pendentes: priorizar revisão`; }
    if (nv !== old) { p.settings.newPerDay = nv; p.adapt = pushStat(p.adapt || [], { t: now, from: old, to: nv, why }, 30); return true; }
    return false;
  }

  function dueList(state, now) {
    const out = [];
    const horizon = now + 2 * 3600000;
    for (const card of Object.values(state.cards)) {
      const item = GF.content.items[card.id]; if (!item) continue;
      for (const st of stagesFor(item)) {
        const s = card.stages[st];
        if (!stageUnlocked(card, st)) continue;
        if (s.reps === 0) {
          // estágio desbloqueado mas nunca praticado: entra como "devido" para ser introduzido
          out.push({ id: card.id, stage: st, R: 0, first: true });
          continue;
        }
        if (s.due <= horizon) out.push({ id: card.id, stage: st, R: fsrs.currentR(s, now) });
      }
    }
    out.sort((a, b) => ((a.first ? 1 : 0) - (b.first ? 1 : 0)) || (a.R - b.R));
    return out;
  }

  const EST = { review: 12, intro: 30, grammar: 240, order: 60, listen: 25, dialog: 90, pron: 180, pairs: 60, speak: 40, convo: 420, write: 420, remedy: 60, checkpoint: 600 };

  /**
   * Monta a sessão do dia. Retorna { steps, minutes, notes[] }.
   */
  function buildSession(state, minutes, now) {
    const C = GF.content, p = state.profile;
    let budget = Math.max(5, minutes) * 60;
    const steps = [], notes = [];
    const take = (step) => { budget -= EST[step.kind] || 30; steps.push(step); };
    const uid = currentUnit(state);
    const unit = uid ? C.units[uid] : null;
    const short = minutes <= 7;

    // 1) Revisões vencidas (prioridade: menor retrievability)
    const due = dueList(state, now);
    const reviewCap = Math.floor((short ? 0.7 : 0.5) * budget / EST.review);
    const dueTake = due.slice(0, reviewCap);
    if (due.length > dueTake.length) notes.push(`${due.length - dueTake.length} revisões ficaram para amanhã (o FSRS reprograma sem punição).`);
    // 2) Remediação de erros recorrentes
    const remedies = Object.values(state.mistakes).filter((m) => m.count >= 2 && m.fixed < 3 && m.item).sort((a, b) => b.count - a.count).slice(0, short ? 0 : 2);
    // 3) Unidade atual: input primeiro (diálogo), depois itens novos, gramática com contexto
    const us = unit ? (p.unitState[uid] || {}) : {};
    let newIds = [];
    if (unit) {
      const pending = unit.items.filter((id) => !state.cards[id]);
      const dueNewLimit = due.length > 80 ? 2 : p.settings.newPerDay;
      const nNew = Math.max(0, Math.min(pending.length, short ? 2 : dueNewLimit, Math.floor(budget * 0.35 / (EST.intro + EST.review))));
      newIds = pending.slice(0, nNew);
    }
    // ordem final
    const dialogNow = !!(unit && !us.dialogHeard && !short);
    if (dialogNow) take({ kind: 'dialog', unit: uid });
    // pronúncia (A0) intercalada até concluir
    const pronLeft = Object.keys(C.pron).filter((k) => !(p.pronStats.done || {})[k]);
    if (pronLeft.length && !short) take({ kind: 'pron', pron: pronLeft[0] });
    else if (!short && (p.pronStats.pairs.length < 10 || (recentRate(p.pronStats.pairs, 20) || 0) < 0.8)) take({ kind: 'pairs' });

    // intercalar: novos com revisões, e checagem do novo item algumas etapas depois
    const reviewSteps = dueTake.map((d) => ({ kind: 'review', id: d.id, stage: d.stage }));
    const mixed = [];
    const later = [];
    let ri = 0;
    for (const id of newIds) {
      mixed.push({ kind: 'intro', id });
      for (let k = 0; k < 2 && ri < reviewSteps.length; k++) mixed.push(reviewSteps[ri++]);
      later.push({ kind: 'review', id, stage: 'recog', fresh: true });
      if (later.length >= 2) mixed.push(later.shift());
    }
    while (ri < reviewSteps.length) { mixed.push(reviewSteps[ri++]); if (later.length && ri % 3 === 0) mixed.push(later.shift()); }
    mixed.push(...later);
    for (const s of mixed) take(s);
    for (const m of remedies) take({ kind: 'remedy', key: m.key, id: m.item });

    if (unit && !short) {
      // gramática: só depois de algum contexto (≥ 40% dos itens introduzidos ou diálogo ouvido)
      const introduced = unit.items.filter((id) => state.cards[id]).length + newIds.length;
      const ctx = introduced / Math.max(1, unit.items.length) >= 0.4 || us.dialogHeard || dialogNow;
      const gNext = (unit.grammar || []).find((g) => { const st = p.grammarStats[g] || []; return st.length < 5 || recentRate(st, 10) < 0.8; });
      if (gNext && ctx && budget > EST.grammar * 0.6) take({ kind: C.grammar[gNext].order ? 'order' : 'grammar', grammar: gNext });
      if (budget > EST.listen * 2) { take({ kind: 'listen', unit: uid, n: 3 }); }
      const ready = introduced >= Math.min(6, unit.items.length); // conversa desde o 1º dia (a IA se limita ao vocabulário visto)
      if (ready && budget >= EST.convo * 0.7) take({ kind: 'convo', unit: uid });
      else take({ kind: 'speak', unit: uid });
      if (introduced / unit.items.length >= 0.8 && !(us.writing && us.writing.score >= 3) && budget >= EST.write * 0.7) take({ kind: 'write', unit: uid });
      const st = unitStatus(state, uid, now);
      if (st.ready && !st.passed) take({ kind: 'checkpoint', unit: uid });
    } else if (unit) {
      take({ kind: 'speak', unit: uid });
    }
    if (!unit) notes.push('Todo o conteúdo carregado foi comprovado. O próximo módulo (A1.2) precisa ser carregado.');
    return { steps, minutes, unit: uid, notes, dueTotal: due.length };
  }

  /** Previsão de revisões por dia (calendário). */
  function forecast(state, now, days) {
    const out = [];
    const start = new Date(now); start.setHours(0, 0, 0, 0);
    for (let i = 0; i < days; i++) out.push({ date: dayKey(start.getTime() + i * DAY), n: 0 });
    for (const card of Object.values(state.cards)) {
      const item = GF.content.items[card.id]; if (!item) continue;
      for (const st of stagesFor(item)) {
        const s = card.stages[st]; if (!s.reps) continue;
        const idx = Math.max(0, Math.floor((s.due - start.getTime()) / DAY));
        if (idx < days) out[idx].n++;
      }
    }
    return out;
  }

  function streak(state, now) {
    const set = new Set(Object.values(state.days).filter((d) => d.minutes > 0 || d.reviews > 0 || d.newItems > 0).map((d) => d.date));
    let n = 0; let t = now;
    if (!set.has(dayKey(t))) t -= DAY; // hoje ainda pode ser feito
    while (set.has(dayKey(t))) { n++; t -= DAY; }
    const last7 = []; for (let i = 6; i >= 0; i--) last7.push(set.has(dayKey(now - i * DAY)));
    return { current: n, last7, week: last7.filter(Boolean).length };
  }

  function stats(state, now) {
    const cards = Object.values(state.cards).filter((c) => GF.content.items[c.id]);
    const m = cards.map((c) => mastery(c, now));
    const retained = cards.filter((c) => c.stages.recall.reps > 0 && fsrs.currentR(c.stages.recall, now) >= 0.9).length;
    const days = Object.values(state.days);
    const sum = (k) => days.reduce((s, d) => s + (d[k] || 0), 0);
    const recentDays = days.filter((d) => now - new Date(d.date + 'T12:00:00').getTime() <= 7 * DAY);
    const rs = (k) => recentDays.reduce((s, d) => s + (d[k] || 0), 0);
    return {
      introduced: cards.length,
      byMastery: [0, 1, 2, 3, 4].map((k) => m.filter((x) => x === k).length),
      recalledPlus: m.filter((x) => x >= 2).length,
      retained,
      forgetting: cards.filter((c) => forgetting(c, now)).map((c) => c.id),
      minutes: sum('minutes'), sessions: state.profile.sessions || 0,
      acc7: rs('shortN') + rs('longN') ? (rs('shortOk') + rs('longOk')) / (rs('shortN') + rs('longN')) : null,
      longRet: sum('longN') ? sum('longOk') / sum('longN') : null, longN: sum('longN'),
      shortAcc: sum('shortN') ? sum('shortOk') / sum('shortN') : null,
      skills: SKILLS.map((s) => ({ id: s, label: SKILL_PT[s], rate: recentRate(state.profile.skillStats[s], 30), n: (state.profile.skillStats[s] || []).length })),
      due: dueList(state, now).length,
      topMistakes: Object.values(state.mistakes).filter((x) => x.fixed < 3 && x.count >= 2).sort((a, b) => b.count - a.count).slice(0, 6)
    };
  }

  /** Detecta uso espontâneo de itens conhecidos num texto livre do aluno. */
  function spontaneousHits(state, text) {
    const t = ' ' + GF.grading.norm(text) + ' ';
    const hits = [];
    for (const c of Object.values(state.cards)) {
      const it = GF.content.items[c.id];
      if (!it || (it.type !== 'noun' && it.type !== 'verb')) continue;
      const forms = it.type === 'noun' ? [it.de, it.pl && it.pl !== '=' && it.pl !== '—' ? it.pl : null] : [it.de, ...Object.values(it.conj || {})];
      if (forms.filter(Boolean).some((f) => t.includes(' ' + GF.grading.norm(f) + ' '))) hits.push(c.id);
    }
    return hits;
  }

  GF.model = { STAGES, STAGE_PT, SKILLS, SKILL_PT, MASTERY_PT, dayKey, newProfile, newCard, stagesFor, stageUnlocked, mastery, forgetting, recordAnswer, unitStatus, checkpointPass, currentUnit, estimateLevel, adapt, dueList, buildSession, forecast, streak, stats, recentRate, spontaneousHits, EST };
})(globalThis.GF = globalThis.GF || {});
