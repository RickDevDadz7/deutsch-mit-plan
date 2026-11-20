/* Conteúdo fixo A1.2 (unidades A1-U6 a A1-U11), escrito e revisado à mão.
 * Exemplos são frases didáticas para o nível. */
(function (GF) {
  'use strict';
  const C = GF.content;
  const U = {};
  let cur = null;
  const add = (o) => { o.unit = cur; o.ex = o.ex || []; o.note = o.note || ''; o.ipa = o.ipa || ''; C.items[o.id] = o; U[cur].items.push(o.id); };
  const N = (list) => list.forEach(([id, art, de, pl, pt, ipa, exde, expt, note]) => add({ id, type: 'noun', art, de, pl, pt, ipa, ex: [[exde, expt]], note }));
  const V = (list) => list.forEach(([id, de, pt, ipa, c, exde, expt, note]) => { const [ich, du, er, wir, ihr, sie] = c.split('|'); add({ id, type: 'verb', de, pt, ipa, conj: { ich, du, er, wir, ihr, sie }, ex: [[exde, expt]], note }); });
  const P = (list) => list.forEach(([id, de, pt, note, type, ipa]) => add({ id, type: type || 'phrase', de, pt, note, ipa }));
  const G = (id, g) => { g.unit = cur; g.level = 'A1'; g.drills = (g.drills || []).map(([q, a, hint]) => ({ q, a, hint: hint || '' })); C.grammar[id] = g; U[cur].grammar.push(id); };
  const unit = (id, o) => { cur = id; U[id] = Object.assign({ id, level: 'A1', items: [], grammar: [], prereq: (C.plan.find((e) => e.id === id) || {}).prereq || [] }, o); };

  /* ======================= A1-U6 Mein Alltag ======================= */
  unit('A1-U6', {
    title: 'Mein Alltag', subtitle: 'Rotina, horas e dias da semana',
    goals: ['Perguntar e dizer as horas', 'Descrever a rotina do dia', 'Usar verbos separáveis e um/am'],
    dialog: [['A', 'Wann stehst du auf?'], ['B', 'Ich stehe um halb sieben auf.'], ['A', 'So früh! Wann fängt deine Arbeit an?'], ['B', 'Um acht Uhr. Am Freitag habe ich um drei Feierabend.'], ['A', 'Und was machst du am Abend?'], ['B', 'Ich koche und dann sehe ich fern.']],
    dialogPt: 'Duas pessoas falam sobre a rotina e os horários.',
    listening: ['Ich stehe um sechs Uhr auf.', 'Es ist Viertel nach drei.', 'Wann fängt der Kurs an?', 'Am Sonntag schlafe ich lange.', 'Am Abend sehe ich fern.'],
    writing: 'Descreva seu dia típico em 5–6 frases, com horários (um …) e pelo menos 2 verbos separáveis.',
    speaking: { scene: 'Você e uma colega nova do curso comparam a rotina da semana.', persona: 'Mia, 25, estudante, informal (du)', goals: ['perguntar as horas', 'dizer quando se levanta', 'falar do trabalho/estudo', 'falar do fim de semana', 'propor um dia para se encontrar'] },
    criteria: 'Critérios padrão da unidade; ditado de horas ≥ 75%.'
  });
  N([
    ['a12_wecker', 'der', 'Wecker', '=', 'o despertador', 'ˈvɛkɐ', 'Der Wecker klingelt um sechs.', 'O despertador toca às seis.'],
    ['a12_uhr', 'die', 'Uhr', 'Uhren', 'o relógio; hora (no horário)', 'uːɐ̯', 'Es ist acht Uhr.', 'São oito horas.', '“acht Uhr” = 8 horas; “die Uhr” = o relógio.'],
    ['a12_uhrzeit', 'die', 'Uhrzeit', 'Uhrzeiten', 'a hora, o horário', 'ˈuːɐ̯ˌtsaɪ̯t', 'Die Uhrzeit steht auf dem Ticket.', 'O horário está no bilhete.'],
    ['a12_fruehstueck', 'das', 'Frühstück', '', 'o café da manhã', 'ˈfʁyːʃtʏk', 'Das Frühstück ist um sieben.', 'O café da manhã é às sete.'],
    ['a12_mittagessen', 'das', 'Mittagessen', '=', 'o almoço', 'ˈmɪtaːkˌʔɛsn̩', 'Das Mittagessen ist fertig.', 'O almoço está pronto.'],
    ['a12_abendessen', 'das', 'Abendessen', '=', 'o jantar', 'ˈaːbn̩tˌʔɛsn̩', 'Wir machen das Abendessen.', 'Nós fazemos o jantar.'],
    ['a12_vormittag', 'der', 'Vormittag', 'Vormittage', 'a manhã (até o meio-dia)', 'ˈfoːɐ̯mɪtaːk', 'Am Vormittag arbeite ich.', 'De manhã eu trabalho.'],
    ['a12_nachmittag', 'der', 'Nachmittag', 'Nachmittage', 'a tarde', 'ˈnaːxmɪtaːk', 'Am Nachmittag lerne ich Deutsch.', 'À tarde eu estudo alemão.'],
    ['a12_woche', 'die', 'Woche', 'Wochen', 'a semana', 'ˈvɔxə', 'Die Woche hat sieben Tage.', 'A semana tem sete dias.'],
    ['a12_wochenende', 'das', 'Wochenende', 'Wochenenden', 'o fim de semana', 'ˈvɔxn̩ˌʔɛndə', 'Am Wochenende schlafe ich lange.', 'No fim de semana eu durmo até tarde.'],
    ['a12_feierabend', 'der', 'Feierabend', 'Feierabende', 'o fim do expediente', 'ˈfaɪ̯ɐˌʔaːbn̩t', 'Um fünf habe ich Feierabend.', 'Às cinco termino o expediente.', 'Palavra muito usada: “Schönen Feierabend!”'],
    ['a12_montag', 'der', 'Montag', 'Montage', 'a segunda-feira', 'ˈmoːntaːk', 'Am Montag beginnt die Woche.', 'Na segunda começa a semana.', 'Dias: Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag, Sonntag — todos “der”.'],
    ['a12_mittwoch', 'der', 'Mittwoch', 'Mittwoche', 'a quarta-feira', 'ˈmɪtvɔx', 'Am Mittwoch habe ich Kurs.', 'Na quarta tenho curso.'],
    ['a12_freitag', 'der', 'Freitag', 'Freitage', 'a sexta-feira', 'ˈfʁaɪ̯taːk', 'Am Freitag gehe ich ins Kino.', 'Na sexta vou ao cinema.'],
    ['a12_sonntag', 'der', 'Sonntag', 'Sonntage', 'o domingo', 'ˈzɔntaːk', 'Am Sonntag ist alles zu.', 'No domingo está tudo fechado.', 'Na Alemanha, lojas fecham aos domingos.'],
  ]);
  V([
    ['a12_aufstehen', 'aufstehen', 'levantar-se', 'ˈaʊ̯fˌʃteːən', 'stehe auf|stehst auf|steht auf|stehen auf|steht auf|stehen auf', 'Ich stehe um sechs Uhr auf.', 'Eu me levanto às seis.', 'Separável: o “auf” vai para o fim.'],
    ['a12_anfangen', 'anfangen', 'começar', 'ˈanˌfaŋən', 'fange an|fängst an|fängt an|fangen an|fangt an|fangen an', 'Der Kurs fängt um zehn an.', 'O curso começa às dez.', 'Separável; a→ä em du/er.'],
    ['a12_aufhoeren', 'aufhören', 'parar, terminar', 'ˈaʊ̯fˌhøːʁən', 'höre auf|hörst auf|hört auf|hören auf|hört auf|hören auf', 'Wann hörst du heute auf?', 'Quando você termina hoje?'],
    ['a12_einkaufen', 'einkaufen', 'fazer compras', 'ˈaɪ̯nˌkaʊ̯fn̩', 'kaufe ein|kaufst ein|kauft ein|kaufen ein|kauft ein|kaufen ein', 'Wir kaufen am Samstag ein.', 'Fazemos compras no sábado.'],
    ['a12_fernsehen', 'fernsehen', 'ver televisão', 'ˈfɛʁnˌzeːən', 'sehe fern|siehst fern|sieht fern|sehen fern|seht fern|sehen fern', 'Am Abend sehe ich fern.', 'À noite eu vejo TV.', 'Separável; e→ie em du/er.'],
    ['a12_anrufen', 'anrufen', 'ligar (telefonar)', 'ˈanˌʁuːfn̩', 'rufe an|rufst an|ruft an|rufen an|ruft an|rufen an', 'Ich rufe dich morgen an.', 'Eu te ligo amanhã.'],
    ['a12_fruehstuecken', 'frühstücken', 'tomar café da manhã', 'ˈfʁyːʃtʏkn̩', 'frühstücke|frühstückst|frühstückt|frühstücken|frühstückt|frühstücken', 'Ich frühstücke um sieben.', 'Tomo café às sete.', 'NÃO é separável.'],
    ['a12_schlafen', 'schlafen', 'dormir', 'ˈʃlaːfn̩', 'schlafe|schläfst|schläft|schlafen|schlaft|schlafen', 'Am Sonntag schläft er lange.', 'No domingo ele dorme até tarde.', 'a→ä em du/er.'],
    ['a12_arbeiten', 'arbeiten', 'trabalhar', 'ˈaʁbaɪ̯tn̩', 'arbeite|arbeitest|arbeitet|arbeiten|arbeitet|arbeiten', 'Sie arbeitet von neun bis fünf.', 'Ela trabalha das nove às cinco.', 'Radical em -t: du arbeitest, er arbeitet.'],
  ]);
  P([
    ['a12_wiespaet', 'Wie spät ist es?', 'Que horas são?', 'Também: Wie viel Uhr ist es?'],
    ['a12_halbacht', 'Es ist halb acht.', 'São sete e meia.', '“halb acht” = meia hora ANTES das oito.'],
    ['a12_viertelnach', 'Es ist Viertel nach drei.', 'São três e quinze.', ''],
    ['a12_viertelvor', 'Es ist Viertel vor neun.', 'São quinze para as nove.', ''],
    ['a12_umwieviel', 'Um wie viel Uhr?', 'A que horas?', 'Resposta: um + hora (um acht Uhr).'],
    ['a12_keinezeit', 'Ich habe keine Zeit.', 'Eu não tenho tempo.', ''],
    ['a12_frueh', 'früh', 'cedo', '', 'word', 'fʁyː'],
    ['a12_spaet', 'spät', 'tarde', '', 'word', 'ʃpɛːt'],
    ['a12_dann', 'dann', 'então, depois', '', 'word', 'dan'],
    ['a12_oft', 'oft', 'frequentemente', 'Frequência: immer > oft > manchmal > nie.', 'word', 'ɔft'],
    ['a12_manchmal', 'manchmal', 'às vezes', '', 'word', 'ˈmançmaːl'],
    ['a12_nie', 'nie', 'nunca', '', 'word', 'niː'],
  ]);
  G('g_trennbar', {
    title: 'Verbos separáveis', explain: 'Alguns verbos têm um prefixo que se separa no presente: <b>auf</b>stehen → Ich stehe um sechs <b>auf</b>.<br>O verbo conjugado fica na 2ª posição e o prefixo vai para o <b>fim</b> da frase. Prefixos separáveis comuns: an-, auf-, aus-, ein-, mit-, fern-, zurück-. Na fala, o prefixo é tônico: ANfangen.',
    compare: 'Não existe em português. Pense no inglês “get up” → “I get up at six”: a partícula também se separa.',
    examples: [['Ich stehe früh auf.', 'Eu me levanto cedo.'], ['Wann fängt der Film an?', 'Quando começa o filme?'], ['Wir kaufen heute ein.', 'Hoje fazemos compras.']],
    drills: [['Ich ___ um sechs auf. (aufstehen)', ['stehe']], ['Der Kurs fängt um zehn ___.', ['an']], ['Wir ___ am Samstag ein. (einkaufen)', ['kaufen']], ['Er ___ am Abend fern. (fernsehen)', ['sieht'], 'e→ie'], ['Du ___ um acht an. (anfangen)', ['fängst', 'faengst'], 'a→ä'], ['Ich rufe dich morgen ___.', ['an']], ['Wann ___ du auf? (aufhören)', ['hörst', 'hoerst']]]
  });
  G('g_uhrzeit', {
    title: 'Horas e expressões de tempo (um, am)', explain: 'Hora oficial: <b>Es ist 7:30 Uhr</b> (sieben Uhr dreißig). Hora do dia a dia: <b>halb acht</b> (= 7:30, meia hora antes das 8), <b>Viertel nach drei</b> (3:15), <b>Viertel vor neun</b> (8:45), <b>zehn nach vier</b> (4:10).<br><b>um</b> + hora: um acht Uhr. <b>am</b> + dia ou parte do dia: am Montag, am Abend, am Wochenende. Exceção: <b>in der Nacht</b>.',
    compare: '“halb acht” engana brasileiros: NÃO é “oito e meia”, é sete e meia.',
    examples: [['Der Zug fährt um halb zehn.', 'O trem sai às nove e meia.'], ['Am Montag arbeite ich.', 'Na segunda eu trabalho.'], ['In der Nacht schlafe ich.', 'À noite (madrugada) eu durmo.']],
    drills: [['7:30 = Es ist ___ acht.', ['halb']], ['8:45 = Es ist Viertel ___ neun.', ['vor']], ['3:15 = Es ist Viertel ___ drei.', ['nach']], ['Der Kurs ist ___ zehn Uhr.', ['um']], ['Ich arbeite ___ Montag.', ['am']], ['___ Abend sehe ich fern.', ['am']], ['Ich schlafe ___ der Nacht.', ['in']]]
  });

  /* ======================= A1-U7 Einkaufen ======================= */
  unit('A1-U7', {
    title: 'Einkaufen', subtitle: 'Roupas, cores, tamanhos e preços',
    goals: ['Pedir ajuda numa loja e perguntar preço', 'Descrever roupas com cores e tamanhos', 'Dizer o que agrada e o que vai levar'],
    dialog: [['A', 'Guten Tag! Kann ich Ihnen helfen?'], ['B', 'Ja, ich suche eine Jacke.'], ['A', 'Welche Größe brauchen Sie?'], ['B', 'Größe M. Haben Sie die Jacke auch in Blau?'], ['A', 'Ja, hier. Die kostet 59 Euro.'], ['B', 'Sie gefällt mir. Ich nehme die Jacke.']],
    dialogPt: 'Numa loja de roupas: procurar uma jaqueta, tamanho, cor e preço.',
    listening: ['Ich suche eine Hose.', 'Die Schuhe kosten achtzig Euro.', 'Kann ich das anprobieren?', 'Das Hemd ist zu klein.', 'Der Pullover gefällt mir.'],
    writing: 'Escreva uma mensagem curta a um amigo contando o que você comprou: o quê, a cor, o preço e se gostou.',
    speaking: { scene: 'Você está numa loja de roupas em Colônia e quer comprar um casaco para o inverno.', persona: 'Herr Klein, vendedor, formal (Sie)', goals: ['dizer o que procura', 'dizer tamanho e cor', 'perguntar o preço', 'pedir para experimentar', 'decidir e dizer o que leva'] },
    criteria: 'Critérios padrão; acusativo com artigo definido ≥ 80%.'
  });
  N([
    ['a12_kleidung', 'die', 'Kleidung', '', 'a roupa (coletivo)', 'ˈklaɪ̯dʊŋ', 'Die Kleidung ist hier billig.', 'A roupa aqui é barata.'],
    ['a12_hose', 'die', 'Hose', 'Hosen', 'a calça', 'ˈhoːzə', 'Die Hose ist zu lang.', 'A calça é comprida demais.', 'Singular em alemão: “eine Hose” = uma calça.'],
    ['a12_hemd', 'das', 'Hemd', 'Hemden', 'a camisa', 'hɛmt', 'Das Hemd ist weiß.', 'A camisa é branca.'],
    ['a12_tshirt', 'das', 'T-Shirt', 'T-Shirts', 'a camiseta', 'ˈtiːʃœɐ̯t', 'Ich kaufe ein T-Shirt.', 'Eu compro uma camiseta.'],
    ['a12_pullover', 'der', 'Pullover', '=', 'o suéter, a blusa de frio', 'pʊˈloːvɐ', 'Der Pullover ist warm.', 'O suéter é quente.'],
    ['a12_jacke', 'die', 'Jacke', 'Jacken', 'a jaqueta, o casaco', 'ˈjakə', 'Die Jacke kostet 59 Euro.', 'A jaqueta custa 59 euros.'],
    ['a12_kleid', 'das', 'Kleid', 'Kleider', 'o vestido', 'klaɪ̯t', 'Das Kleid ist sehr schön.', 'O vestido é muito bonito.'],
    ['a12_schuh', 'der', 'Schuh', 'Schuhe', 'o sapato', 'ʃuː', 'Die Schuhe sind neu.', 'Os sapatos são novos.'],
    ['a12_groesse', 'die', 'Größe', 'Größen', 'o tamanho', 'ˈɡʁøːsə', 'Welche Größe haben Sie?', 'Qual é o seu tamanho?'],
    ['a12_preis', 'der', 'Preis', 'Preise', 'o preço', 'pʁaɪ̯s', 'Der Preis ist gut.', 'O preço é bom.'],
    ['a12_geschaeft', 'das', 'Geschäft', 'Geschäfte', 'a loja', 'ɡəˈʃɛft', 'Das Geschäft ist bis acht offen.', 'A loja fica aberta até as oito.'],
    ['a12_supermarkt', 'der', 'Supermarkt', 'Supermärkte', 'o supermercado', 'ˈzuːpɐˌmaʁkt', 'Der Supermarkt ist um die Ecke.', 'O supermercado fica na esquina.'],
    ['a12_kasse', 'die', 'Kasse', 'Kassen', 'o caixa (de pagar)', 'ˈkasə', 'Bitte zahlen Sie an der Kasse.', 'Por favor, pague no caixa.'],
  ]);
  V([
    ['a12_kaufen', 'kaufen', 'comprar', 'ˈkaʊ̯fn̩', 'kaufe|kaufst|kauft|kaufen|kauft|kaufen', 'Ich kaufe einen Pullover.', 'Eu compro um suéter.'],
    ['a12_brauchen', 'brauchen', 'precisar de', 'ˈbʁaʊ̯xn̩', 'brauche|brauchst|braucht|brauchen|braucht|brauchen', 'Ich brauche neue Schuhe.', 'Preciso de sapatos novos.', 'Objeto direto no acusativo.'],
    ['a12_suchen', 'suchen', 'procurar', 'ˈzuːxn̩', 'suche|suchst|sucht|suchen|sucht|suchen', 'Wir suchen ein Geschäft.', 'Procuramos uma loja.'],
    ['a12_anprobieren', 'anprobieren', 'experimentar (roupa)', 'ˈanpʁoˌbiːʁən', 'probiere an|probierst an|probiert an|probieren an|probiert an|probieren an', 'Kann ich das Kleid anprobieren?', 'Posso experimentar o vestido?', 'Separável.'],
    ['a12_nehmen', 'nehmen', 'pegar; levar (comprar)', 'ˈneːmən', 'nehme|nimmst|nimmt|nehmen|nehmt|nehmen', 'Ich nehme die Jacke.', 'Vou levar a jaqueta.', 'Irregular: du nimmst, er nimmt.'],
    ['a12_gefallen', 'gefallen', 'agradar', 'ɡəˈfalən', 'gefalle|gefällst|gefällt|gefallen|gefallt|gefallen', 'Die Jacke gefällt mir.', 'Gosto da jaqueta. (A jaqueta me agrada.)', 'Quem agrada é o sujeito: “Die Schuhe gefallen mir”.'],
  ]);
  P([
    ['a12_rot', 'rot', 'vermelho', '', 'word', 'ʁoːt'], ['a12_blau', 'blau', 'azul', '', 'word', 'blaʊ̯'], ['a12_gruen', 'grün', 'verde', '', 'word', 'ɡʁyːn'],
    ['a12_schwarz', 'schwarz', 'preto', '', 'word', 'ʃvaʁts'], ['a12_weiss', 'weiß', 'branco', '', 'word', 'vaɪ̯s'], ['a12_grau', 'grau', 'cinza', '', 'word', 'ɡʁaʊ̯'],
    ['a12_ichsuche', 'Ich suche eine Jacke.', 'Estou procurando uma jaqueta.', ''],
    ['a12_inblau', 'Haben Sie das auch in Blau?', 'Tem também em azul?', 'Cores como substantivo: in Blau, in Rot.'],
    ['a12_anprobieren_p', 'Kann ich das anprobieren?', 'Posso experimentar?', ''],
    ['a12_zugross', 'Das ist zu groß.', 'Está grande demais.', '“zu” + adjetivo = demais.'],
    ['a12_gefaelltmir', 'Das gefällt mir.', 'Gosto disso.', 'Negação: Das gefällt mir nicht.'],
    ['a12_ichnehme', 'Ich nehme den Pullover.', 'Vou levar o suéter.', 'den = acusativo masculino.'],
  ]);
  G('g_akk_def', {
    title: 'Acusativo com artigo definido', explain: 'Objeto direto no acusativo: só o masculino muda — <b>der → den</b>. Feminino <b>die</b>, neutro <b>das</b> e plural <b>die</b> ficam iguais.<br>Verbos com acusativo frequentes: haben, brauchen, kaufen, suchen, nehmen, finden, möchten.',
    compare: 'Como em “eu o compro”, o alemão marca o objeto — mas no artigo: Der Pullover ist teuer → Ich kaufe den Pullover.',
    examples: [['Ich nehme den Rock.', 'Levo a saia.'], ['Er kauft die Hose.', 'Ele compra a calça.'], ['Wir suchen das Geschäft.', 'Procuramos a loja.']],
    drills: [['Ich nehme ___ Pullover.', ['den']], ['Ich kaufe ___ Jacke.', ['die']], ['Er sucht ___ Hemd.', ['das']], ['Wir brauchen ___ Schuhe.', ['die']], ['Ich finde ___ Preis gut.', ['den']], ['Kann ich ___ Kleid anprobieren?', ['das']], ['___ Pullover ist warm. (sujeito)', ['der']]]
  });
  G('g_gefallen', {
    title: 'gefallen: “gostar” de coisas', explain: 'Para dizer que algo agrada: <b>[coisa] gefällt mir</b>. A coisa é o sujeito; por isso o verbo concorda com ela: Die Jacke <b>gefällt</b> mir / Die Schuhe <b>gefallen</b> mir.<br>Perguntas: Wie gefällt <b>dir</b> (du) / <b>Ihnen</b> (Sie) die Jacke?',
    compare: 'Igual ao espanhol “me gusta / me gustan”: o verbo concorda com a coisa, não com a pessoa.',
    examples: [['Das Kleid gefällt mir.', 'Gosto do vestido.'], ['Die Farben gefallen mir nicht.', 'Não gosto das cores.']],
    drills: [['Die Jacke ___ mir.', ['gefällt', 'gefaellt']], ['Die Schuhe ___ mir.', ['gefallen']], ['Das Hemd ___ mir nicht.', ['gefällt', 'gefaellt']], ['Wie gefällt ___ der Rock? (du)', ['dir']], ['Wie gefällt ___ das Kleid? (Sie)', ['Ihnen']]]
  });

  /* ======================= A1-U8 In der Stadt ======================= */
  unit('A1-U8', {
    title: 'In der Stadt', subtitle: 'Lugares, transporte e direções',
    goals: ['Perguntar e explicar o caminho', 'Dizer como você vai (mit dem Bus…)', 'Entender instruções formais (Gehen Sie…)'],
    dialog: [['A', 'Entschuldigung, wie komme ich zum Bahnhof?'], ['B', 'Gehen Sie hier geradeaus und dann die zweite Straße links.'], ['A', 'Ist das weit?'], ['B', 'Zu Fuß zehn Minuten. Sie können auch mit dem Bus fahren.'], ['A', 'Wo ist die Haltestelle?'], ['B', 'Neben der Apotheke. Steigen Sie am Marktplatz aus.']],
    dialogPt: 'Uma pessoa pergunta o caminho até a estação.',
    listening: ['Wie komme ich zum Museum?', 'Gehen Sie geradeaus.', 'Ich fahre mit der U-Bahn.', 'Die Bank ist neben dem Kino.', 'Steigen Sie an der Haltestelle aus.'],
    writing: 'Explique a um amigo como chegar da estação à sua casa (5 frases, com mit, zu e direções).',
    speaking: { scene: 'Você está perdido em Munique e pergunta o caminho para o museu a uma senhora na rua.', persona: 'Frau Huber, moradora, formal (Sie), prestativa', goals: ['pedir licença e perguntar o caminho', 'perguntar se é longe', 'perguntar qual transporte usar', 'confirmar a direção (links/rechts)', 'agradecer'] },
    criteria: 'Critérios padrão; dativo com preposições ≥ 80%.'
  });
  N([
    ['a12_bahnhof', 'der', 'Bahnhof', 'Bahnhöfe', 'a estação de trem', 'ˈbaːnhoːf', 'Der Bahnhof ist in der Stadtmitte.', 'A estação fica no centro.'],
    ['a12_haltestelle', 'die', 'Haltestelle', 'Haltestellen', 'o ponto (de ônibus, bonde)', 'ˈhaltəˌʃtɛlə', 'Die Haltestelle ist neben der Bank.', 'O ponto fica ao lado do banco.'],
    ['a12_bus', 'der', 'Bus', 'Busse', 'o ônibus', 'bʊs', 'Der Bus kommt in fünf Minuten.', 'O ônibus chega em cinco minutos.'],
    ['a12_ubahn', 'die', 'U-Bahn', 'U-Bahnen', 'o metrô', 'ˈuːbaːn', 'Ich fahre mit der U-Bahn.', 'Eu vou de metrô.'],
    ['a12_strassenbahn', 'die', 'Straßenbahn', 'Straßenbahnen', 'o bonde', 'ˈʃtʁaːsn̩ˌbaːn', 'Die Straßenbahn ist voll.', 'O bonde está cheio.'],
    ['a12_zug', 'der', 'Zug', 'Züge', 'o trem', 'tsuːk', 'Der Zug hat Verspätung.', 'O trem está atrasado.'],
    ['a12_fahrrad', 'das', 'Fahrrad', 'Fahrräder', 'a bicicleta', 'ˈfaːɐ̯ʁaːt', 'Sie fährt mit dem Fahrrad.', 'Ela vai de bicicleta.'],
    ['a12_strasse', 'die', 'Straße', 'Straßen', 'a rua', 'ˈʃtʁaːsə', 'Nehmen Sie die erste Straße links.', 'Pegue a primeira rua à esquerda.'],
    ['a12_ampel', 'die', 'Ampel', 'Ampeln', 'o semáforo', 'ˈampl̩', 'An der Ampel gehen Sie rechts.', 'No semáforo, vire à direita.'],
    ['a12_apotheke', 'die', 'Apotheke', 'Apotheken', 'a farmácia', 'apoˈteːkə', 'Die Apotheke ist am Marktplatz.', 'A farmácia fica na praça do mercado.'],
    ['a12_bank', 'die', 'Bank', 'Banken', 'o banco (instituição)', 'baŋk', 'Ich gehe zur Bank.', 'Eu vou ao banco.', 'Banco de sentar: die Bank, plural Bänke.'],
    ['a12_museum', 'das', 'Museum', 'Museen', 'o museu', 'muˈzeːʊm', 'Das Museum ist montags zu.', 'O museu fecha às segundas.'],
    ['a12_kino', 'das', 'Kino', 'Kinos', 'o cinema', 'ˈkiːno', 'Wir treffen uns vor dem Kino.', 'Nos encontramos na frente do cinema.'],
    ['a12_fahrkarte', 'die', 'Fahrkarte', 'Fahrkarten', 'a passagem, o bilhete', 'ˈfaːɐ̯ˌkaʁtə', 'Die Fahrkarte kostet drei Euro.', 'O bilhete custa três euros.'],
  ]);
  V([
    ['a12_fahren', 'fahren', 'ir (com veículo), dirigir', 'ˈfaːʁən', 'fahre|fährst|fährt|fahren|fahrt|fahren', 'Wir fahren mit dem Zug.', 'Vamos de trem.', 'a→ä em du/er. A pé: gehen.'],
    ['a12_gehen', 'gehen', 'ir (a pé), andar', 'ˈɡeːən', 'gehe|gehst|geht|gehen|geht|gehen', 'Ich gehe zu Fuß.', 'Eu vou a pé.'],
    ['a12_finden', 'finden', 'encontrar; achar (opinião)', 'ˈfɪndn̩', 'finde|findest|findet|finden|findet|finden', 'Ich finde die Haltestelle nicht.', 'Não encontro o ponto.'],
    ['a12_aussteigen', 'aussteigen', 'descer (do veículo)', 'ˈaʊ̯sˌʃtaɪ̯ɡn̩', 'steige aus|steigst aus|steigt aus|steigen aus|steigt aus|steigen aus', 'Wir steigen am Bahnhof aus.', 'Descemos na estação.'],
    ['a12_umsteigen', 'umsteigen', 'fazer baldeação', 'ˈʊmˌʃtaɪ̯ɡn̩', 'steige um|steigst um|steigt um|steigen um|steigt um|steigen um', 'Sie müssen in Köln umsteigen.', 'O senhor precisa trocar de trem em Colônia.'],
  ]);
  P([
    ['a12_links', 'links', 'à esquerda', '', 'word', 'lɪŋks'], ['a12_rechts', 'rechts', 'à direita', '', 'word', 'ʁɛçts'], ['a12_geradeaus', 'geradeaus', 'em frente, reto', '', 'word', 'ɡəʁaːdəˈʔaʊ̯s'],
    ['a12_weit', 'weit', 'longe', 'Perto: nah.', 'word', 'vaɪ̯t'],
    ['a12_wiekomme', 'Wie komme ich zum Bahnhof?', 'Como chego à estação?', 'zum = zu dem; zur = zu der.'],
    ['a12_istdasweit', 'Ist das weit?', 'É longe?', ''],
    ['a12_zufuss', 'Ich gehe zu Fuß.', 'Eu vou a pé.', ''],
    ['a12_mitdembus', 'Ich fahre mit dem Bus.', 'Eu vou de ônibus.', 'mit + dativo.'],
    ['a12_ersteStrasse', 'Nehmen Sie die erste Straße links.', 'Pegue a primeira rua à esquerda.', ''],
  ]);
  G('g_dativ_praep', {
    title: 'Dativo com preposições (mit, zu, bei, neben, in)', explain: 'Depois de <b>mit, zu, bei, von, aus, nach, seit</b> vem sempre o <b>dativo</b>. Artigos no dativo: <b>der → dem</b>, <b>das → dem</b>, <b>die → der</b>, plural <b>die → den (+n)</b>.<br>Contrações: <b>zum</b> = zu dem, <b>zur</b> = zu der, <b>im</b> = in dem, <b>am</b> = an dem, <b>beim</b> = bei dem.<br>Para dizer onde algo está (lugar): in, an, neben, vor + dativo.',
    compare: 'Português não marca caso no artigo. Memorize blocos prontos: mit dem Bus, mit der U-Bahn, zum Bahnhof, zur Bank.',
    examples: [['Ich fahre mit dem Fahrrad.', 'Vou de bicicleta.'], ['Wie komme ich zur Apotheke?', 'Como chego à farmácia?'], ['Die Bank ist neben dem Kino.', 'O banco fica ao lado do cinema.']],
    drills: [['Ich fahre mit ___ Bus.', ['dem']], ['Wir fahren mit ___ U-Bahn.', ['der']], ['Wie komme ich ___ Bahnhof? (zu + dem)', ['zum']], ['Ich gehe ___ Apotheke. (zu + der)', ['zur']], ['Die Bank ist neben ___ Kino.', ['dem']], ['Er fährt mit ___ Fahrrad.', ['dem']], ['Wir treffen uns ___ Museum. (in + dem)', ['im']]]
  });
  G('g_imp_sie', {
    title: 'Imperativo formal (Sie)', explain: 'Para instruções educadas: <b>verbo + Sie</b>. Gehen Sie geradeaus! Nehmen Sie den Bus!<br>Verbos separáveis: o prefixo vai para o fim: Steigen Sie am Bahnhof <b>aus</b>!<br>Com “bitte” fica mais gentil: Fahren Sie bitte langsam.',
    compare: 'Equivale a “Siga em frente”, “Pegue o ônibus” — mas em alemão o “Sie” vem depois do verbo.',
    examples: [['Gehen Sie die zweite Straße rechts.', 'Pegue a segunda rua à direita.'], ['Steigen Sie hier um.', 'Faça baldeação aqui.']],
    drills: [['___ Sie geradeaus! (gehen)', ['Gehen']], ['___ Sie die U2! (nehmen)', ['Nehmen']], ['Steigen Sie am Rathaus ___! (aussteigen)', ['aus']], ['___ Sie bitte langsam! (sprechen)', ['Sprechen']], ['___ Sie an der Ampel rechts! (fahren)', ['Fahren']]]
  });

  /* ======================= A1-U9 Freizeit ======================= */
  unit('A1-U9', {
    title: 'Freizeit', subtitle: 'Hobbies, convites e verbos modais',
    goals: ['Falar de hobbies e do que sabe fazer', 'Convidar, aceitar e recusar', 'Usar können, wollen, müssen, dürfen'],
    dialog: [['A', 'Hast du am Samstag Zeit?'], ['B', 'Am Vormittag muss ich arbeiten. Warum?'], ['A', 'Wollen wir am Nachmittag Fußball spielen?'], ['B', 'Gute Idee! Aber ich kann nicht so gut spielen.'], ['A', 'Kein Problem. Danach können wir ins Kino gehen.'], ['B', 'Super, das machen wir!']],
    dialogPt: 'Dois amigos combinam o programa de sábado.',
    listening: ['Ich kann gut schwimmen.', 'Wollen wir ins Kino gehen?', 'Leider muss ich arbeiten.', 'Hier darf man nicht parken.', 'Was machst du gern in der Freizeit?'],
    writing: 'Escreva uma mensagem convidando um amigo para algo no fim de semana: o quê, quando, onde. Inclua 2 verbos modais.',
    speaking: { scene: 'Você liga para um amigo alemão para combinar algo no fim de semana.', persona: 'Jonas, 30, amigo, informal (du), meio ocupado', goals: ['perguntar se ele tem tempo', 'propor uma atividade com wollen', 'reagir a uma recusa com outra proposta', 'combinar dia e hora'] },
    criteria: 'Critérios padrão; modais (forma e posição do infinitivo) ≥ 80%.'
  });
  N([
    ['a12_freizeit', 'die', 'Freizeit', '', 'o tempo livre', 'ˈfʁaɪ̯ˌtsaɪ̯t', 'In der Freizeit lese ich.', 'No tempo livre eu leio.'],
    ['a12_hobby', 'das', 'Hobby', 'Hobbys', 'o hobby', 'ˈhɔbi', 'Mein Hobby ist Musik.', 'Meu hobby é música.'],
    ['a12_sport', 'der', 'Sport', '', 'o esporte', 'ʃpɔʁt', 'Sport macht Spaß.', 'Esporte é divertido.'],
    ['a12_fussball', 'der', 'Fußball', 'Fußbälle', 'o futebol; a bola de futebol', 'ˈfuːsbal', 'Wir spielen am Sonntag Fußball.', 'Jogamos futebol no domingo.'],
    ['a12_schwimmbad', 'das', 'Schwimmbad', 'Schwimmbäder', 'a piscina (pública)', 'ˈʃvɪmbaːt', 'Das Schwimmbad ist im Sommer voll.', 'A piscina fica cheia no verão.'],
    ['a12_park', 'der', 'Park', 'Parks', 'o parque', 'paʁk', 'Wir gehen in den Park.', 'Vamos ao parque.'],
    ['a12_konzert', 'das', 'Konzert', 'Konzerte', 'o show, o concerto', 'kɔnˈtsɛʁt', 'Das Konzert beginnt um acht.', 'O show começa às oito.'],
    ['a12_buch', 'das', 'Buch', 'Bücher', 'o livro', 'buːx', 'Das Buch ist spannend.', 'O livro é emocionante.'],
    ['a12_musik', 'die', 'Musik', '', 'a música', 'muˈziːk', 'Ich höre gern Musik.', 'Gosto de ouvir música.'],
    ['a12_film', 'der', 'Film', 'Filme', 'o filme', 'fɪlm', 'Der Film ist lustig.', 'O filme é engraçado.'],
    ['a12_zeit', 'die', 'Zeit', 'Zeiten', 'o tempo (horas)', 'tsaɪ̯t', 'Ich habe heute keine Zeit.', 'Hoje não tenho tempo.', 'Tempo/clima é outro: das Wetter.'],
  ]);
  V([
    ['a12_koennen', 'können', 'poder; saber (fazer)', 'ˈkœnən', 'kann|kannst|kann|können|könnt|können', 'Ich kann gut kochen.', 'Eu sei cozinhar bem.', 'Modal: infinitivo no fim. ich/er sem terminação.'],
    ['a12_wollen', 'wollen', 'querer', 'ˈvɔlən', 'will|willst|will|wollen|wollt|wollen', 'Wir wollen ins Kino gehen.', 'Queremos ir ao cinema.', '“Ich will” é direto; educado: “Ich möchte”.'],
    ['a12_muessen', 'müssen', 'ter de, precisar', 'ˈmʏsn̩', 'muss|musst|muss|müssen|müsst|müssen', 'Ich muss morgen arbeiten.', 'Tenho de trabalhar amanhã.'],
    ['a12_duerfen', 'dürfen', 'poder (ter permissão)', 'ˈdʏʁfn̩', 'darf|darfst|darf|dürfen|dürft|dürfen', 'Hier darf man nicht rauchen.', 'Aqui não se pode fumar.'],
    ['a12_moegen', 'mögen', 'gostar de', 'ˈmøːɡn̩', 'mag|magst|mag|mögen|mögt|mögen', 'Ich mag Jazz.', 'Eu gosto de jazz.', 'Com substantivo. Com atividade: Ich spiele gern…'],
    ['a12_spielen', 'spielen', 'jogar; tocar (instrumento)', 'ˈʃpiːlən', 'spiele|spielst|spielt|spielen|spielt|spielen', 'Er spielt Gitarre.', 'Ele toca violão.'],
    ['a12_schwimmen', 'schwimmen', 'nadar', 'ˈʃvɪmən', 'schwimme|schwimmst|schwimmt|schwimmen|schwimmt|schwimmen', 'Im Sommer schwimme ich viel.', 'No verão eu nado muito.'],
    ['a12_lesen', 'lesen', 'ler', 'ˈleːzn̩', 'lese|liest|liest|lesen|lest|lesen', 'Sie liest gern Romane.', 'Ela gosta de ler romances.', 'e→ie: du liest, er liest.'],
    ['a12_treffen', 'treffen', 'encontrar (alguém)', 'ˈtʁɛfn̩', 'treffe|triffst|trifft|treffen|trefft|treffen', 'Ich treffe Anna im Café.', 'Encontro a Anna no café.', 'e→i: du triffst.'],
  ]);
  P([
    ['a12_gern', 'gern', 'com prazer (gostar de fazer)', 'verbo + gern: Ich lese gern.', 'word', 'ɡɛʁn'],
    ['a12_leider', 'leider', 'infelizmente', '', 'word', 'ˈlaɪ̯dɐ'],
    ['a12_hastduzeit', 'Hast du heute Zeit?', 'Você tem tempo hoje?', ''],
    ['a12_wollenwir', 'Wollen wir ins Kino gehen?', 'Vamos ao cinema?', 'Convite com “wollen wir”.'],
    ['a12_guteidee', 'Gute Idee!', 'Boa ideia!', ''],
    ['a12_leiderkann', 'Leider kann ich nicht.', 'Infelizmente não posso.', ''],
    ['a12_wasmachstdugern', 'Was machst du gern?', 'O que você gosta de fazer?', ''],
  ]);
  G('g_modal', {
    title: 'Verbos modais: können, wollen, müssen, dürfen', explain: 'O modal fica na 2ª posição, conjugado; o outro verbo vai no <b>infinitivo, no fim</b>: Ich <b>kann</b> gut <b>schwimmen</b>.<br>No singular, ich e er/sie/es são iguais e sem -t: ich kann, er kann; ich muss, er muss.<br>können = saber/conseguir · wollen = querer · müssen = ter de · dürfen = ter permissão.',
    compare: 'Como em português (“eu posso nadar”), mas o infinitivo vai para o final da frase: “Ich kann heute nicht kommen”.',
    examples: [['Ich muss heute lange arbeiten.', 'Hoje tenho de trabalhar até tarde.'], ['Kannst du Gitarre spielen?', 'Você sabe tocar violão?']],
    drills: [['Ich ___ gut schwimmen. (können)', ['kann']], ['Du ___ heute arbeiten. (müssen)', ['musst']], ['Er ___ ins Kino gehen. (wollen)', ['will']], ['Hier ___ man nicht rauchen. (dürfen)', ['darf']], ['Wir ___ zusammen tanzen. (wollen)', ['wollen']], ['___ du Gitarre spielen? (können)', ['Kannst']], ['Ihr ___ morgen früh aufstehen. (müssen)', ['müsst', 'muesst']]]
  });
  G('g_modal_order', {
    title: 'Frase com modal: o infinitivo no fim', explain: 'Monte as frases com o modal na 2ª posição (ou 1ª, em pergunta sim/não) e o infinitivo no fim — a “moldura” (Satzklammer).',
    compare: 'Em português o infinitivo vem logo depois do modal; em alemão ele espera o fim da frase.',
    examples: [['Am Samstag will ich Fußball spielen.', 'No sábado quero jogar futebol.']],
    order: [['Ich kann heute nicht kommen.', 'Não posso vir hoje.'], ['Wir wollen ins Kino gehen.', 'Queremos ir ao cinema.'], ['Musst du morgen arbeiten?', 'Você tem de trabalhar amanhã?'], ['Er darf hier nicht parken.', 'Ele não pode estacionar aqui.'], ['Am Samstag will ich Fußball spielen.', 'No sábado quero jogar futebol.']]
  });

  /* ======================= A1-U10 Was hast du gemacht? ======================= */
  unit('A1-U10', {
    title: 'Was hast du gemacht?', subtitle: 'Contar o passado com o Perfekt',
    goals: ['Contar o que fez no fim de semana', 'Usar haben/sein + particípio', 'Reagir ao relato de alguém'],
    dialog: [['A', 'Was hast du am Wochenende gemacht?'], ['B', 'Am Samstag habe ich meine Eltern besucht.'], ['A', 'Und am Sonntag?'], ['B', 'Da bin ich zu Hause geblieben und habe ein Buch gelesen.'], ['A', 'Ich bin mit Freunden an den See gefahren.'], ['B', 'Toll! Wie war das Wetter?']],
    dialogPt: 'Colegas contam o que fizeram no fim de semana.',
    listening: ['Ich habe Pizza gekocht.', 'Wir sind nach Hamburg gefahren.', 'Was hast du gestern gemacht?', 'Er ist zu Hause geblieben.', 'Das war toll!'],
    writing: 'Conte em 6 frases o que você fez no último fim de semana (pelo menos 2 verbos com “sein”).',
    speaking: { scene: 'Segunda-feira de manhã: um colega pergunta sobre o seu fim de semana.', persona: 'Lukas, colega de trabalho, informal (du), curioso', goals: ['contar o que fez no sábado', 'contar o que fez no domingo', 'usar um verbo com sein', 'perguntar sobre o fim de semana dele'] },
    criteria: 'Critérios padrão; Perfekt (auxiliar e particípio) ≥ 80%.'
  });
  N([
    ['a12_ausflug', 'der', 'Ausflug', 'Ausflüge', 'o passeio, a excursão', 'ˈaʊ̯sfluːk', 'Wir machen einen Ausflug.', 'Fazemos um passeio.'],
    ['a12_urlaub', 'der', 'Urlaub', 'Urlaube', 'as férias (do trabalho)', 'ˈuːɐ̯laʊ̯p', 'Im Urlaub war ich in Spanien.', 'Nas férias estive na Espanha.'],
    ['a12_restaurant', 'das', 'Restaurant', 'Restaurants', 'o restaurante', 'ʁɛstoˈʁɑ̃ː', 'Das Restaurant war sehr gut.', 'O restaurante foi muito bom.'],
    ['a12_wetter', 'das', 'Wetter', '', 'o tempo (clima)', 'ˈvɛtɐ', 'Das Wetter war schön.', 'O tempo estava bonito.'],
    ['a12_strand', 'der', 'Strand', 'Strände', 'a praia', 'ʃtʁant', 'Wir waren am Strand.', 'Estivemos na praia.'],
    ['a12_foto', 'das', 'Foto', 'Fotos', 'a foto', 'ˈfoːto', 'Ich habe viele Fotos gemacht.', 'Tirei muitas fotos.'],
    ['a12_reise', 'die', 'Reise', 'Reisen', 'a viagem', 'ˈʁaɪ̯zə', 'Die Reise war lang.', 'A viagem foi longa.'],
    ['a12_see', 'der', 'See', 'Seen', 'o lago', 'zeː', 'Der See ist sehr schön.', 'O lago é muito bonito.', 'die See = o mar (poético/norte); comum: das Meer.'],
    ['a12_meer', 'das', 'Meer', 'Meere', 'o mar', 'meːɐ̯', 'Im Sommer fahren wir ans Meer.', 'No verão vamos para o mar.'],
  ]);
  V([
    ['a12_machen', 'machen', 'fazer', 'ˈmaxn̩', 'mache|machst|macht|machen|macht|machen', 'Was hast du gemacht?', 'O que você fez?', 'Perfekt: hat gemacht.'],
    ['a12_besuchen', 'besuchen', 'visitar', 'bəˈzuːxn̩', 'besuche|besuchst|besucht|besuchen|besucht|besuchen', 'Ich habe meine Eltern besucht.', 'Visitei meus pais.', 'Perfekt: hat besucht (sem ge-, por causa de be-).'],
    ['a12_kochen', 'kochen', 'cozinhar', 'ˈkɔxn̩', 'koche|kochst|kocht|kochen|kocht|kochen', 'Gestern habe ich Pasta gekocht.', 'Ontem cozinhei macarrão.', 'Perfekt: hat gekocht.'],
    ['a12_fliegen', 'fliegen', 'voar, ir de avião', 'ˈfliːɡn̩', 'fliege|fliegst|fliegt|fliegen|fliegt|fliegen', 'Wir sind nach Lissabon geflogen.', 'Voamos para Lisboa.', 'Perfekt: ist geflogen (movimento).'],
    ['a12_bleiben', 'bleiben', 'ficar, permanecer', 'ˈblaɪ̯bn̩', 'bleibe|bleibst|bleibt|bleiben|bleibt|bleiben', 'Ich bin zu Hause geblieben.', 'Fiquei em casa.', 'Perfekt: ist geblieben (exceção a decorar).'],
    ['a12_schreiben', 'schreiben', 'escrever', 'ˈʃʁaɪ̯bn̩', 'schreibe|schreibst|schreibt|schreiben|schreibt|schreiben', 'Sie hat eine E-Mail geschrieben.', 'Ela escreveu um e-mail.', 'Perfekt: hat geschrieben.'],
    ['a12_sehen', 'sehen', 'ver', 'ˈzeːən', 'sehe|siehst|sieht|sehen|seht|sehen', 'Hast du den Film gesehen?', 'Você viu o filme?', 'Perfekt: hat gesehen.'],
    ['a12_reisen', 'reisen', 'viajar', 'ˈʁaɪ̯zn̩', 'reise|reist|reist|reisen|reist|reisen', 'Wir sind durch Italien gereist.', 'Viajamos pela Itália.', 'Perfekt: ist gereist.'],
  ]);
  P([
    ['a12_gestern', 'gestern', 'ontem', '', 'word', 'ˈɡɛstɐn'],
    ['a12_toll', 'toll', 'ótimo, demais', '', 'word', 'tɔl'],
    ['a12_langweilig', 'langweilig', 'chato, entediante', '', 'word', 'ˈlaŋvaɪ̯lɪç'],
    ['a12_wasgemacht', 'Was hast du am Wochenende gemacht?', 'O que você fez no fim de semana?', ''],
    ['a12_daswartoll', 'Das war toll!', 'Foi ótimo!', '“war” = Präteritum de sein, mais usado que “ist gewesen”.'],
    ['a12_wiewar', 'Wie war dein Urlaub?', 'Como foram suas férias?', ''],
    ['a12_zuhause', 'Ich bin zu Hause geblieben.', 'Fiquei em casa.', ''],
  ]);
  G('g_perfekt', {
    title: 'Perfekt: o passado da conversa', explain: 'Forma: <b>haben/sein</b> conjugado (2ª posição) + <b>particípio II no fim</b>.<br>Regulares: <b>ge-…-t</b> (machen → gemacht, kochen → gekocht). Irregulares: <b>ge-…-en</b>, às vezes com vogal diferente (sehen → gesehen, schreiben → geschrieben).<br>Verbos com be-, ver-, er- e em -ieren não levam ge-: besucht, studiert.<br><b>sein</b> com verbos de movimento ou mudança (fahren, fliegen, gehen, kommen) e com <b>bleiben</b>; o resto usa <b>haben</b>.',
    compare: 'O Perfekt é o passado normal da fala alemã: “Ich habe gekocht” = “eu cozinhei”. Não tem o sentido do “tenho cozinhado”.',
    examples: [['Ich habe am Samstag gearbeitet.', 'Trabalhei no sábado.'], ['Wir sind ans Meer gefahren.', 'Fomos para o mar.'], ['Hast du das Buch gelesen?', 'Você leu o livro?']],
    drills: [['Ich ___ Pizza gekocht.', ['habe']], ['Wir ___ nach Berlin gefahren.', ['sind']], ['Er hat einen Film ___. (sehen)', ['gesehen']], ['Hast du Anna ___? (besuchen)', ['besucht']], ['Sie (ela) ___ zu Hause geblieben.', ['ist']], ['Ich habe eine E-Mail ___. (schreiben)', ['geschrieben']], ['Was ___ du gestern gemacht?', ['hast']], ['Wir haben viele Fotos ___. (machen)', ['gemacht']]]
  });

  /* ======================= A1-U11 Gesundheit ======================= */
  unit('A1-U11', {
    title: 'Gesundheit', subtitle: 'Corpo, sintomas e médico',
    goals: ['Dizer o que dói e como se sente', 'Marcar consulta e entender conselhos', 'Usar o imperativo e sollen'],
    dialog: [['A', 'Guten Tag, was fehlt Ihnen?'], ['B', 'Ich habe Kopfschmerzen und Fieber.'], ['A', 'Seit wann haben Sie Fieber?'], ['B', 'Seit gestern. Und mir tut der Hals weh.'], ['A', 'Bleiben Sie drei Tage im Bett und trinken Sie viel Tee.'], ['B', 'Danke, Frau Doktor.']],
    dialogPt: 'Consulta médica: sintomas e recomendações.',
    listening: ['Mir tut der Bauch weh.', 'Ich habe Fieber.', 'Nimm eine Tablette!', 'Sie sollen viel Wasser trinken.', 'Gute Besserung!'],
    writing: 'Escreva uma mensagem ao seu chefe dizendo que está doente: o que tem, que vai ao médico e quando volta.',
    speaking: { scene: 'Você liga para um consultório para marcar uma consulta e explica seus sintomas.', persona: 'Frau Wagner, recepcionista do consultório, formal (Sie)', goals: ['dizer que quer marcar uma consulta', 'explicar o que dói', 'dizer desde quando', 'combinar dia e hora'] },
    criteria: 'Critérios padrão; imperativo ≥ 80%. Conclui o A1.2.'
  });
  N([
    ['a12_koerper', 'der', 'Körper', '=', 'o corpo', 'ˈkœʁpɐ', 'Sport ist gut für den Körper.', 'Esporte é bom para o corpo.'],
    ['a12_kopf', 'der', 'Kopf', 'Köpfe', 'a cabeça', 'kɔpf', 'Mir tut der Kopf weh.', 'Estou com dor de cabeça.'],
    ['a12_bauch', 'der', 'Bauch', 'Bäuche', 'a barriga', 'baʊ̯x', 'Mir tut der Bauch weh.', 'Estou com dor de barriga.'],
    ['a12_ruecken', 'der', 'Rücken', '=', 'as costas', 'ˈʁʏkn̩', 'Mein Rücken tut weh.', 'Minhas costas doem.', 'Singular em alemão.'],
    ['a12_bein', 'das', 'Bein', 'Beine', 'a perna', 'baɪ̯n', 'Das Bein ist gebrochen.', 'A perna está quebrada.'],
    ['a12_arm', 'der', 'Arm', 'Arme', 'o braço', 'aʁm', 'Mein Arm tut weh.', 'Meu braço dói.'],
    ['a12_hand', 'die', 'Hand', 'Hände', 'a mão', 'hant', 'Wasch dir die Hände!', 'Lave as mãos!'],
    ['a12_fuss', 'der', 'Fuß', 'Füße', 'o pé', 'fuːs', 'Mir tun die Füße weh.', 'Meus pés doem.'],
    ['a12_auge', 'das', 'Auge', 'Augen', 'o olho', 'ˈaʊ̯ɡə', 'Sie hat blaue Augen.', 'Ela tem olhos azuis.'],
    ['a12_hals', 'der', 'Hals', 'Hälse', 'o pescoço; a garganta', 'hals', 'Mir tut der Hals weh.', 'Estou com dor de garganta.'],
    ['a12_zahn', 'der', 'Zahn', 'Zähne', 'o dente', 'tsaːn', 'Ich muss zum Zahnarzt.', 'Preciso ir ao dentista.'],
    ['a12_arzt', 'der', 'Arzt', 'Ärzte', 'o médico', 'aːɐ̯tst', 'Ich gehe zum Arzt.', 'Vou ao médico.', 'Médica: die Ärztin.'],
    ['a12_praxis', 'die', 'Praxis', 'Praxen', 'o consultório', 'ˈpʁaksɪs', 'Die Praxis ist am Mittwoch zu.', 'O consultório fecha na quarta.'],
    ['a12_fieber', 'das', 'Fieber', '', 'a febre', 'ˈfiːbɐ', 'Das Kind hat Fieber.', 'A criança está com febre.'],
    ['a12_termin', 'der', 'Termin', 'Termine', 'a consulta marcada, o compromisso', 'tɛʁˈmiːn', 'Ich habe morgen einen Termin.', 'Amanhã tenho uma consulta.'],
    ['a12_tablette', 'die', 'Tablette', 'Tabletten', 'o comprimido', 'taˈblɛtə', 'Nehmen Sie zwei Tabletten am Tag.', 'Tome dois comprimidos por dia.'],
  ]);
  V([
    ['a12_sollen', 'sollen', 'dever (conselho, ordem de outro)', 'ˈzɔlən', 'soll|sollst|soll|sollen|sollt|sollen', 'Der Arzt sagt, ich soll im Bett bleiben.', 'O médico diz que devo ficar de cama.'],
    ['a12_helfen', 'helfen', 'ajudar', 'ˈhɛlfn̩', 'helfe|hilfst|hilft|helfen|helft|helfen', 'Kannst du mir helfen?', 'Você pode me ajudar?', 'e→i; pede dativo: mir, dir.'],
    ['a12_liegen', 'liegen', 'estar deitado; ficar (localização)', 'ˈliːɡn̩', 'liege|liegst|liegt|liegen|liegt|liegen', 'Er liegt im Bett.', 'Ele está deitado na cama.'],
  ]);
  P([
    ['a12_krank', 'krank', 'doente', '', 'word', 'kʁaŋk'], ['a12_gesund', 'gesund', 'saudável', '', 'word', 'ɡəˈzʊnt'], ['a12_muede', 'müde', 'cansado', '', 'word', 'ˈmyːdə'],
    ['a12_wasfehlt', 'Was fehlt Ihnen?', 'O que o senhor tem?', 'Pergunta típica do médico.'],
    ['a12_kopfschmerzen', 'Ich habe Kopfschmerzen.', 'Estou com dor de cabeça.', 'Também: Bauchschmerzen, Halsschmerzen.'],
    ['a12_tutweh', 'Mir tut der Bauch weh.', 'Estou com dor de barriga.', 'Plural: Mir tun die Füße weh.'],
    ['a12_besserung', 'Gute Besserung!', 'Melhoras!', ''],
    ['a12_termin_p', 'Ich möchte einen Termin machen.', 'Gostaria de marcar uma consulta.', ''],
    ['a12_seitwann', 'Seit wann?', 'Desde quando?', 'seit + dativo: seit gestern, seit einer Woche.'],
  ]);
  G('g_imperativ', {
    title: 'Imperativo: du, ihr e Sie', explain: '<b>du</b>: radical do verbo, sem “du”: Trink! Komm! Geh!<br>Verbos e→i/ie mantêm a mudança: <b>Nimm!</b> <b>Hilf!</b> <b>Iss!</b> <b>Lies!</b> (mas a→ä não: <b>Schlaf!</b>, <b>Fahr!</b>).<br><b>ihr</b>: igual ao presente sem “ihr”: Trinkt! Bleibt!<br><b>Sie</b>: verbo + Sie: Trinken Sie!<br>Separáveis: prefixo no fim: <b>Ruf</b> den Arzt <b>an</b>!',
    compare: 'Equivale ao “Beba!”, “Bebam!”, “Beba (o senhor)!”. Use “bitte” para soar gentil.',
    examples: [['Trink viel Wasser!', 'Beba muita água!'], ['Nimm eine Tablette!', 'Tome um comprimido!'], ['Bleiben Sie im Bett!', 'Fique de cama!']],
    drills: [['(du, trinken) ___ viel Wasser!', ['Trink', 'Trinke']], ['(Sie, nehmen) ___ Sie die Tabletten!', ['Nehmen']], ['(du, nehmen) ___ eine Tablette!', ['Nimm']], ['(ihr, bleiben) ___ zu Hause!', ['Bleibt']], ['(du, anrufen) Ruf den Arzt ___!', ['an']], ['(du, schlafen) ___ viel!', ['Schlaf', 'Schlafe']], ['(du, helfen) ___ mir bitte!', ['Hilf']]]
  });
  G('g_wehtun', {
    title: 'Dor: Mir tut … weh', explain: 'Para dizer o que dói: <b>Mir tut [parte do corpo] weh</b>. O verbo concorda com a parte do corpo: Mir <b>tut</b> der Kopf weh / Mir <b>tun</b> die Füße weh.<br>Alternativa com -schmerzen: Ich habe Kopfschmerzen, Bauchschmerzen, Halsschmerzen.',
    compare: 'Literalmente “a mim dói a cabeça” — parecido com o espanhol “me duele la cabeza”.',
    examples: [['Mir tut der Rücken weh.', 'Estou com dor nas costas.'], ['Tut dir das Bein weh?', 'Sua perna dói?']],
    drills: [['Mir ___ der Rücken weh.', ['tut']], ['Mir ___ die Augen weh.', ['tun']], ['Mir tut der Bauch ___.', ['weh']], ['Tut ___ der Hals weh? (du)', ['dir']], ['Mir ___ das Bein weh.', ['tut']]]
  });

  for (const u of Object.values(U)) C.units[u.id] = u;
  C.recomputeOrder();
  C.version = '2026.11.20-3';
})(globalThis.GF = globalThis.GF || {});
