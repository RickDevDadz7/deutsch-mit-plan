/* Geração de unidades pelo professor (IA), com validação estrutural e revisão.
 * A unidade gerada fica guardada no banco do aluno (e sincroniza), então é criada uma vez só. */
(function (GF) {
  'use strict';
  const C = GF.content;
  const slug = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ß/g, 'ss').replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '').slice(0, 40);
  const ARTS = ['der', 'die', 'das'];
  const SAFE = (h) => String(h || '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
    .replace(/&lt;(\/?)(b|i)&gt;/g, '<$1$2>').replace(/&lt;br\s*\/?&gt;/g, '<br>'); // só <b>, <i>, <br>

  const SIZES = { A1: [18, 26], A2: [20, 28], B1: [20, 28], B2: [18, 26], C1: [16, 24], C2: [14, 22] };
  const PT_SHARE = { A1: 'Explicações 100% em português do Brasil.', A2: 'Explicações em português do Brasil.', B1: 'Explicações em português, exemplos e termos técnicos em alemão.', B2: 'Explicações metade em alemão simples, metade em português.', C1: 'Explicações principalmente em alemão, com notas curtas em português.', C2: 'Explicações em alemão.' };

  function schemaText(level) {
    const [lo, hi] = SIZES[level] || [18, 26];
    return `JSON com EXATAMENTE este formato:
{
 "title": "título curto em alemão",
 "subtitle": "subtítulo em português",
 "goals": ["3 objetivos can-do em português"],
 "items": [  // ${lo}-${hi} itens de ALTA FREQUÊNCIA para o tema, sem repetir os já conhecidos
   {"type":"noun","art":"der|die|das","de":"Wort (sem artigo, com maiúscula)","pl":"plural sem artigo | \\"=\\" se igual | \\"\\" se não usual | \\"—\\" se só plural","pt":"tradução","ipa":"IPA sem colchetes (ou \\"\\")","ex":["frase natural em alemão","tradução"],"note":"dica curta ou \\"\\""},
   {"type":"verb","de":"infinitivo","pt":"tradução","ipa":"","conj":{"ich":"","du":"","er":"","wir":"","ihr":"","sie":""},"ex":["frase","tradução"],"note":"ex.: separável, irregular, Perfekt com sein"},
   {"type":"phrase","de":"bloco/frase útil","pt":"tradução","note":"quando usar"},
   {"type":"word","de":"adjetivo/advérbio/conector","pt":"tradução","ipa":"","note":""}
 ],
 "grammar": [  // 1 ou 2 tópicos, o foco gramatical pedido
   {"title":"","explain":"explicação curta; só <b>, <i>, <br> permitidos","compare":"comparação com o português","examples":[["frase","tradução"],["",""],["",""]],
    "drills":[{"q":"frase com ___ no lugar da resposta (pode ter dica entre parênteses)","a":["resposta aceita","variante aceita"],"hint":"opcional"}]  // 6-8 drills, resposta curta (1-3 palavras)
   }
 ],
 "dialog": [["A","fala"],["B","fala"]],  // 6-8 falas naturais usando o vocabulário
 "dialogPt": "resumo do diálogo em português",
 "listening": ["5 frases para ditado, curtas, do tema"],
 "writing": "tarefa de escrita em português, adequada ao nível",
 "speaking": {"scene":"cena em português","persona":"personagem do parceiro","goals":["4-5 metas comunicativas"]}
}`;
  }
  function genPrompt(pe, known, recurring) {
    return `Você é um autor de material didático de alemão (DaF), alinhado ao CEFR e ao Goethe-Institut, escrevendo para um aluno brasileiro.
Crie a unidade ${pe.id} (nível ${pe.level}) do currículo.
TEMA: ${pe.topic}. TÍTULO SUGERIDO: ${pe.title}. FOCO GRAMATICAL: ${pe.grammar}.
${PT_SHARE[pe.level] || ''}
REGRAS DE QUALIDADE (obrigatórias):
- Alemão padrão da Alemanha, natural e correto; nada inventado. Gênero e plural conferidos (como no Duden).
- Substantivos SEMPRE com artigo e plural. Verbos com presente completo correto (incluindo mudanças de vogal).
- Vocabulário adequado ao nível ${pe.level}, de alta frequência, útil para o tema.
- Exemplos curtos e naturais; não use nomes de marcas.
- Drills: a lacuna "___" deve ter UMA resposta claramente correta; inclua variantes aceitas (ex.: ß/ss).
- Não repita estes itens que o aluno já conhece: ${known.slice(0, 400).join(', ') || '(nenhum)'}
- Dificuldades recorrentes do aluno (reutilize de forma natural nos exercícios): ${recurring.join(' | ') || 'nenhuma'}
${schemaText(pe.level)}
Responda SOMENTE com o JSON.`;
  }
  function reviewPrompt(pe, json) {
    return `Você é um revisor nativo de alemão e professor de DaF. Revise rigorosamente esta unidade de nível ${pe.level} (${pe.topic}; foco: ${pe.grammar}).
Corrija QUALQUER erro: gênero/artigo, plural, conjugação, ortografia, maiúsculas, naturalidade das frases, tradução para o português, adequação ao nível, drills com mais de uma resposta possível (acrescente as variantes em "a" ou reescreva a frase), explicações gramaticais imprecisas.
Mantenha exatamente o mesmo formato JSON. Devolva o JSON CORRIGIDO completo, com um campo extra "review": {"changes": ["lista curta do que você corrigiu"], "confidence": "alta|média|baixa"}.
UNIDADE:
${JSON.stringify(json)}
Responda SOMENTE com o JSON.`;
  }

  /** Valida e normaliza o JSON da IA. Lança erro se inutilizável; descarta itens ruins. */
  function validate(pe, raw) {
    const errs = [];
    if (!raw || typeof raw !== 'object') throw new Error('resposta sem JSON');
    const prefix = pe.id.toLowerCase().replace(/-/g, '') + '_';
    const seen = new Set(Object.values(C.items).map((i) => (i.type === 'noun' ? i.art + ' ' : '') + i.de.toLowerCase()));
    const itemsData = [];
    for (const it of Array.isArray(raw.items) ? raw.items : []) {
      const type = ['noun', 'verb', 'phrase', 'word'].includes(it.type) ? it.type : null;
      const de = String(it.de || '').trim(), pt = String(it.pt || '').trim();
      if (!type || !de || !pt) { errs.push('item incompleto'); continue; }
      const o = { type, de, pt, ipa: String(it.ipa || '').replace(/[\[\]\/]/g, ''), note: String(it.note || '').slice(0, 200), ex: [] };
      if (Array.isArray(it.ex) && it.ex[0] && it.ex[1]) o.ex = [[String(it.ex[0]), String(it.ex[1])]];
      if (type === 'noun') {
        if (!ARTS.includes(it.art)) { errs.push('artigo inválido: ' + de); continue; }
        if (!/^[A-ZÄÖÜ]/.test(de) || de.includes(' ')) { errs.push('substantivo inválido: ' + de); continue; }
        o.art = it.art; o.pl = typeof it.pl === 'string' ? it.pl.replace(/^die\s+/, '') : '';
        if (!o.ex.length) { errs.push('substantivo sem exemplo: ' + de); continue; }
      }
      if (type === 'verb') {
        const c = it.conj || {}; const keys = ['ich', 'du', 'er', 'wir', 'ihr', 'sie'];
        if (!keys.every((k) => typeof c[k] === 'string' && c[k].trim())) { errs.push('conjugação incompleta: ' + de); continue; }
        o.conj = {}; keys.forEach((k) => { o.conj[k] = c[k].trim(); });
      }
      const key = (type === 'noun' ? o.art + ' ' : '') + de.toLowerCase();
      if (seen.has(key)) continue; seen.add(key);
      o.id = prefix + (type === 'noun' ? 'n_' : type === 'verb' ? 'v_' : type === 'phrase' ? 'p_' : 'w_') + slug(de);
      if (itemsData.some((x) => x.id === o.id)) continue;
      itemsData.push(o);
    }
    if (itemsData.length < 10) throw new Error('poucos itens válidos (' + itemsData.length + ')');
    const grammarData = {};
    (Array.isArray(raw.grammar) ? raw.grammar : []).slice(0, 2).forEach((g, gi) => {
      const drills = (Array.isArray(g.drills) ? g.drills : []).filter((d) => d && /___/.test(d.q || '') && Array.isArray(d.a) && d.a.length && d.a.every((x) => typeof x === 'string' && x.trim()))
        .map((d) => ({ q: String(d.q), a: d.a.map((x) => String(x).trim()), hint: String(d.hint || '') }));
      if (drills.length < 4) { errs.push('gramática com poucos exercícios válidos'); return; }
      grammarData['g_' + prefix + gi] = { title: String(g.title || pe.grammar).slice(0, 120), level: pe.level, explain: SAFE(g.explain), compare: String(g.compare || ''), examples: (g.examples || []).filter((e) => Array.isArray(e) && e[0]).slice(0, 4).map((e) => [String(e[0]), String(e[1] || '')]), drills, gen: true };
    });
    if (!Object.keys(grammarData).length) throw new Error('nenhum tópico de gramática válido');
    const dialog = (Array.isArray(raw.dialog) ? raw.dialog : []).filter((l) => Array.isArray(l) && (l[0] === 'A' || l[0] === 'B') && l[1]).map((l) => [l[0], String(l[1])]);
    const listening = (Array.isArray(raw.listening) ? raw.listening : []).filter((x) => typeof x === 'string' && x.trim()).slice(0, 6);
    if (dialog.length < 4 || listening.length < 3) throw new Error('diálogo ou ditado insuficiente');
    const sp = raw.speaking || {};
    const unit = {
      id: pe.id, level: pe.level, title: String(raw.title || pe.title), subtitle: String(raw.subtitle || pe.topic),
      goals: (raw.goals || []).map(String).slice(0, 4), dialog, dialogPt: String(raw.dialogPt || ''), listening,
      writing: String(raw.writing || 'Escreva um texto curto sobre o tema da unidade.'),
      speaking: { scene: String(sp.scene || pe.topic), persona: String(sp.persona || 'parceiro de conversa'), goals: (sp.goals || []).map(String).slice(0, 5) },
      criteria: '≥ 90% dos itens no nível “lembra”; gramática ≥ 80%; ditado ≥ 75%; 1 conversa; texto aprovado; checkpoint ≥ 80% (≥ 70% por habilidade).',
      itemsData, grammarData,
      gen: { at: Date.now(), reviewed: !!raw.review, changes: (raw.review && raw.review.changes || []).slice(0, 20), confidence: raw.review && raw.review.confidence || null, warnings: errs.slice(0, 20), contentVersion: C.version }
    };
    if (!unit.speaking.goals.length) unit.speaking.goals = ['cumprimentar', 'fazer perguntas sobre o tema', 'responder com frases completas', 'despedir-se'];
    return unit;
  }

  /** Cria a unidade: geração → validação → revisão → validação. */
  async function generate(pe, ask, ctx, onStep) {
    const step = (t) => { try { onStep && onStep(t); } catch (e) { /* */ } };
    step('Escrevendo a unidade…');
    const draft = await ask(genPrompt(pe, ctx.known || [], ctx.recurring || []), { modelTier: 'complex' });
    validate(pe, draft); // falha cedo se o rascunho for inutilizável
    step('Revisando o alemão…');
    let reviewed;
    try { reviewed = await ask(reviewPrompt(pe, draft), { modelTier: 'complex' }); validate(pe, reviewed); }
    catch (e) { reviewed = Object.assign({}, draft, { review: { changes: [], confidence: 'não revisado (' + (e.message || e.code) + ')' } }); }
    step('Conferindo a estrutura…');
    return validate(pe, reviewed);
  }

  /** Corrige um item reportado como errado. */
  async function fixItem(item, unit, ask, complaint) {
    const r = await ask(`Um aluno reportou erro neste item de vocabulário alemão (unidade ${unit.id}, nível ${unit.level}). Reclamação: "${complaint || 'não especificada'}".
Item: ${JSON.stringify({ type: item.type, art: item.art, de: item.de, pl: item.pl, pt: item.pt, ipa: item.ipa, conj: item.conj, ex: item.ex[0], note: item.note })}
Verifique com rigor (gênero, plural, conjugação, ortografia, tradução, naturalidade do exemplo). Responda SOMENTE com JSON:
{"ok": true|false, "explanation_pt": "o que estava errado (ou por que está certo)", "fixed": { mesmo formato do item, corrigido } }`, { modelTier: 'complex' });
    return r;
  }

  GF.gen = { genPrompt, reviewPrompt, validate, generate, fixItem, slug };
})(globalThis.GF = globalThis.GF || {});
