/* Conteúdo fixo B2 — parte 1 (B2-U1 a B2-U3). Explicações metade em alemão simples, metade em português.
 * Novidades do B2: texto de leitura mais longo por unidade (reading) e indicação de material autêntico (authentic). */
(function (GF) {
  'use strict';
  const K = GF.kit('B2', 'b2');
  const { unit, N, V, P, G } = K;

  /* ======================= B2-U1 Argumentieren ======================= */
  unit('B2-U1', {
    title: 'Argumentieren', subtitle: 'Argumentar, concordar, discordar e chegar a um acordo',
    goals: ['Defender um ponto de vista com argumentos e exemplos', 'Concordar e discordar com educação, admitindo o lado do outro', 'Ligar ideias com conectores de duas partes e com nominalizações'],
    dialog: [['A', 'Ich bin der Meinung, dass Homeoffice für alle Mitarbeiter möglich sein sollte.'], ['B', 'Da bin ich anderer Meinung. Zwar spart man Zeit, aber der Kontakt zu den Kollegen fehlt.'], ['A', 'Einerseits stimmt das, andererseits kann man zu Hause konzentrierter arbeiten.'], ['B', 'Das lässt sich nicht bestreiten. Trotzdem gebe ich zu bedenken, dass nicht jeder ein ruhiges Zimmer hat.'], ['A', 'Je flexibler die Regeln sind, desto zufriedener sind die Leute. Das zeigen viele Studien.'], ['B', 'Wie wäre es mit einem Kompromiss: zwei Tage im Büro, drei Tage zu Hause?'], ['A', 'Damit wäre ich einverstanden. Sowohl die Firma als auch die Mitarbeiter hätten etwas davon.']],
    dialogPt: 'Dois colegas debatem o trabalho remoto e chegam a um meio-termo.',
    listening: ['Meiner Ansicht nach ist das Argument nicht überzeugend.', 'Einerseits ist es praktisch, andererseits ist es teuer.', 'Je mehr man liest, desto besser schreibt man.', 'Ich kann weder heute noch morgen kommen.', 'Das sehe ich genauso, aber es gibt einen Einwand.'],
    writing: 'Goethe B2, Schreiben Teil 1: escreva um texto de fórum (≈ 150 palavras) sobre “Homeoffice für alle?”. Dê sua opinião, dois argumentos com exemplo, um contra-argumento e uma conclusão. Use pelo menos 2 conectores de duas partes (zwar … aber, einerseits … andererseits, je … desto).',
    speaking: { scene: 'Discussão em dupla (como no Goethe B2, Sprechen Teil 2): a empresa quer acabar com o trabalho remoto. Vocês precisam chegar a uma recomendação comum.', persona: 'Frau Albrecht, colega, educada mas firme (Sie), defende o escritório', goals: ['apresentar sua posição com um motivo', 'reagir a um argumento dela concordando em parte', 'trazer um contra-argumento com exemplo', 'propor um compromisso', 'resumir a decisão comum'] },
    criteria: 'Critérios padrão; conectores ≥ 80%; argumentação clara na conversa.',
    authentic: ['DW „Top-Thema mit Vokabeln“: textos curtos sobre temas atuais com glossário (B1–B2)', 'Deutschlandfunk „Kontrovers“: debate ao vivo, ótimo para ouvir argumentos', 'ARD „hart aber fair“ (talk show): repare como os convidados interrompem e discordam'],
    reading: {
      title: 'Homeoffice: Fluch oder Segen?',
      text: ['Seit der Pandemie arbeiten Millionen Menschen in Deutschland zumindest teilweise von zu Hause aus. Viele Firmen haben festgestellt, dass ihre Mitarbeiter im Homeoffice nicht weniger leisten. Im Gegenteil: Wer nicht jeden Tag zwei Stunden pendeln muss, ist oft ausgeruhter und motivierter.', 'Zwar bringt das Homeoffice Freiheit, aber es hat auch Nachteile. Einerseits verschwimmt die Grenze zwischen Arbeit und Freizeit, andererseits fühlen sich manche Beschäftigte einsam. Besonders Berufsanfänger lernen weniger, wenn erfahrene Kollegen nicht im Raum sind.', 'Deshalb setzen immer mehr Unternehmen auf ein hybrides Modell. Je klarer die Regeln sind, desto besser funktioniert es: feste Bürotage für Besprechungen, flexible Tage für konzentrierte Arbeit. Ein perfektes Modell für alle gibt es allerdings nicht.'],
      questions: [['Was haben viele Firmen festgestellt?', ['Im Homeoffice wird nicht weniger gearbeitet.', 'Im Homeoffice wird viel weniger gearbeitet.', 'Die Mitarbeiter wollen zurück ins Büro.'], 0], ['Für wen ist das Homeoffice laut Text besonders schwierig?', ['Für Berufsanfänger', 'Für Chefs', 'Für Pendler'], 0], ['Was empfiehlt der Text?', ['Klare Regeln für ein hybrides Modell', 'Nur noch Homeoffice', 'Nur noch Büroarbeit'], 0]]
    }
  });
  N([
    ['standpunkt', 'der', 'Standpunkt', 'Standpunkte', 'o ponto de vista', 'ˈʃtantˌpʊŋkt', 'Ich verstehe deinen Standpunkt, teile ihn aber nicht.', 'Entendo seu ponto de vista, mas não compartilho.'],
    ['behauptung', 'die', 'Behauptung', 'Behauptungen', 'a afirmação (nem sempre provada)', 'bəˈhaʊ̯ptʊŋ', 'Diese Behauptung ist nicht bewiesen.', 'Essa afirmação não está provada.'],
    ['beweis', 'der', 'Beweis', 'Beweise', 'a prova', 'bəˈvaɪ̯s', 'Gibt es dafür einen Beweis?', 'Existe uma prova disso?'],
    ['these', 'die', 'These', 'Thesen', 'a tese', 'ˈteːzə', 'Der Autor vertritt eine provokante These.', 'O autor defende uma tese provocadora.'],
    ['gegenargument', 'das', 'Gegenargument', 'Gegenargumente', 'o contra-argumento', 'ˈɡeːɡn̩ʔaʁɡuˌmɛnt', 'Ein starkes Gegenargument ist der Preis.', 'Um contra-argumento forte é o preço.'],
    ['einwand', 'der', 'Einwand', 'Einwände', 'a objeção', 'ˈaɪ̯nˌvant', 'Haben Sie noch Einwände?', 'O senhor ainda tem objeções?'],
    ['begruendung', 'die', 'Begründung', 'Begründungen', 'a justificativa', 'bəˈɡʁʏndʊŋ', 'Ohne Begründung ist eine Meinung schwach.', 'Sem justificativa, uma opinião é fraca.'],
    ['schlussfolgerung', 'die', 'Schlussfolgerung', 'Schlussfolgerungen', 'a conclusão (lógica)', 'ˈʃlʊsˌfɔlɡəʁʊŋ', 'Welche Schlussfolgerung ziehen Sie daraus?', 'Que conclusão o senhor tira disso?', 'eine Schlussfolgerung ziehen = tirar uma conclusão.'],
    ['konsens', 'der', 'Konsens', '', 'o consenso', 'kɔnˈzɛns', 'Am Ende haben wir einen Konsens gefunden.', 'No fim chegamos a um consenso.'],
    ['debatte', 'die', 'Debatte', 'Debatten', 'o debate', 'deˈbatə', 'Die Debatte im Parlament dauerte Stunden.', 'O debate no parlamento durou horas.'],
    ['auffassung', 'die', 'Auffassung', 'Auffassungen', 'a concepção, a opinião', 'ˈaʊ̯fˌfasʊŋ', 'Ich bin der Auffassung, dass wir warten sollten.', 'Sou da opinião de que deveríamos esperar.', 'Mais formal que Meinung.'],
    ['widerspruch', 'der', 'Widerspruch', 'Widersprüche', 'a contradição; a objeção formal', 'ˈviːdɐˌʃpʁʊx', 'In seiner Aussage gibt es einen Widerspruch.', 'Há uma contradição no depoimento dele.'],
    ['ueberzeugung', 'die', 'Überzeugung', 'Überzeugungen', 'a convicção', 'yːbɐˈtsɔɪ̯ɡʊŋ', 'Sie handelt aus Überzeugung.', 'Ela age por convicção.'],
    ['voraussetzung', 'die', 'Voraussetzung', 'Voraussetzungen', 'o pré-requisito, a condição', 'foˈʁaʊ̯sˌzɛtsʊŋ', 'Deutschkenntnisse sind eine Voraussetzung für die Stelle.', 'Saber alemão é pré-requisito para a vaga.'],
    ['zugestaendnis', 'das', 'Zugeständnis', 'Zugeständnisse', 'a concessão', 'ˈtsuːɡəˌʃtɛntnɪs', 'Beide Seiten mussten Zugeständnisse machen.', 'Os dois lados tiveram que fazer concessões.'],
    ['nachteil', 'der', 'Nachteil', 'Nachteile', 'a desvantagem', 'ˈnaːxˌtaɪ̯l', 'Der größte Nachteil ist der lange Weg.', 'A maior desvantagem é o caminho longo.', 'Oposto: der Vorteil.'],
  ]);
  V([
    ['behaupten', 'behaupten', 'afirmar, alegar', 'bəˈhaʊ̯ptn̩', 'behaupte|behauptest|behauptet|behaupten|behauptet|behaupten', 'Er behauptet, er habe nichts gewusst.', 'Ele alega que não sabia de nada.'],
    ['einraeumen', 'einräumen', 'admitir, conceder (num debate)', 'ˈaɪ̯nˌʁɔɪ̯mən', 'räume ein|räumst ein|räumt ein|räumen ein|räumt ein|räumen ein', 'Ich räume ein, dass das Argument gut ist.', 'Admito que o argumento é bom.', 'Também: arrumar (guardar coisas no armário).'],
    ['widersprechen', 'widersprechen', 'contradizer, discordar', 'viːdɐˈʃpʁɛçn̩', 'widerspreche|widersprichst|widerspricht|widersprechen|widersprecht|widersprechen', 'Da muss ich Ihnen widersprechen.', 'Nisso preciso discordar do senhor.', 'Pede dativo. Perfekt: hat widersprochen.'],
    ['begruenden', 'begründen', 'justificar', 'bəˈɡʁʏndn̩', 'begründe|begründest|begründet|begründen|begründet|begründen', 'Können Sie Ihre Meinung begründen?', 'O senhor pode justificar sua opinião?'],
    ['zustimmen', 'zustimmen', 'concordar', 'ˈtsuːˌʃtɪmən', 'stimme zu|stimmst zu|stimmt zu|stimmen zu|stimmt zu|stimmen zu', 'Ich stimme dir völlig zu.', 'Concordo totalmente com você.', 'Separável; pede dativo.'],
    ['abwaegen', 'abwägen', 'pesar, ponderar', 'ˈapˌvɛːɡn̩', 'wäge ab|wägst ab|wägt ab|wägen ab|wägt ab|wägen ab', 'Wir müssen Vor- und Nachteile abwägen.', 'Precisamos pesar prós e contras.', 'Perfekt: hat abgewogen.'],
  ]);
  P([
    ['ueberzeugend', 'überzeugend', 'convincente', '', 'word', 'yːbɐˈtsɔɪ̯ɡn̩t'],
    ['umstritten', 'umstritten', 'controverso, polêmico', '', 'word', 'ʊmˈʃtʁɪtn̩'],
    ['andermeinung', 'Da bin ich anderer Meinung.', 'Nisso eu tenho outra opinião.', ''],
    ['genauso', 'Das sehe ich genauso.', 'Eu vejo exatamente assim.', ''],
    ['zubedenken', 'Ich gebe zu bedenken, dass …', 'Eu gostaria de lembrar que … (ressalva educada)', 'Verbo no fim depois de dass.'],
    ['ansicht', 'Meiner Ansicht nach …', 'Na minha opinião …', 'Depois dele vem o verbo: Meiner Ansicht nach ist das falsch.'],
    ['bestreiten', 'Das lässt sich nicht bestreiten.', 'Isso não dá para negar.', ''],
    ['einverstanden', 'Damit wäre ich einverstanden.', 'Com isso eu concordaria.', ''],
  ]);
  G('g_b2_konnektoren', {
    title: 'Conectores de duas partes (zweiteilige Konnektoren)', explain: 'Zweiteilige Konnektoren verbinden zwei Ideen in einem Satz:<br>• <b>zwar … aber</b> — admite algo e depois contrapõe: Zwar ist es teuer, aber gut.<br>• <b>einerseits … andererseits</b> — dois lados da questão.<br>• <b>sowohl … als auch</b> — tanto … quanto.<br>• <b>weder … noch</b> — nem … nem (já é negativo: sem nicht/kein!).<br>• <b>je + comparativo …, desto/umso + comparativo</b> — quanto mais …, mais …; depois de <b>je</b> o verbo vai para o fim, depois de <b>desto</b> vem o verbo logo em seguida.',
    compare: '“Quanto mais você treina, melhor você fala” = <b>Je</b> mehr du <b>übst</b>, <b>desto</b> besser <b>sprichst</b> du. Repare na posição dos verbos: fim / logo depois de desto.',
    examples: [['Zwar spart man Zeit, aber der Kontakt fehlt.', 'É verdade que se economiza tempo, mas falta o contato.'], ['Je mehr man liest, desto besser schreibt man.', 'Quanto mais se lê, melhor se escreve.'], ['Ich habe weder Zeit noch Geld.', 'Não tenho nem tempo nem dinheiro.']],
    drills: [['Das Auto ist ___ teuer, aber sehr sparsam.', ['zwar']], ['___ mehr man übt, desto besser spricht man.', ['je']], ['Je früher wir anfangen, ___ schneller sind wir fertig.', ['desto', 'umso']], ['Ich trinke ___ Kaffee noch Tee.', ['weder']], ['Sie spricht sowohl Englisch ___ auch Spanisch.', ['als']], ['___ ist das Homeoffice bequem, andererseits fehlt der Kontakt.', ['einerseits']], ['Er hat weder angerufen ___ geschrieben.', ['noch']]]
  });
  G('g_b2_nominal', {
    title: 'Nominalização: de oração para substantivo', explain: 'In formellen Texten (Nachrichten, Berichte, Prüfung) wird oft ein Nebensatz zu einer Nominalgruppe:<br>• weil er krank war → <b>wegen</b> seiner Krankheit<br>• nachdem er angekommen war → <b>nach</b> seiner Ankunft<br>• bevor wir abreisen → <b>vor</b> unserer Abreise<br>• wenn man es benutzt → <b>bei</b> der Benutzung<br>• obwohl es regnete → <b>trotz</b> des Regens<br>• während wir essen → <b>während</b> des Essens<br>O substantivo vem do verbo (ankommen → die Ankunft, benutzen → die Benutzung). wegen, trotz e während pedem genitivo.',
    compare: 'O português faz o mesmo em textos formais: “porque estava doente” → “por causa da doença”.',
    examples: [['Wegen des Streiks fallen viele Züge aus.', 'Por causa da greve, muitos trens são cancelados.'], ['Nach seiner Ankunft rief er sofort an.', 'Depois da chegada, ele ligou na hora.']],
    drills: [['Weil er krank war, blieb er zu Hause. → ___ seiner Krankheit blieb er zu Hause.', ['wegen']], ['Nachdem er angekommen war, … → Nach seiner ___ …', ['Ankunft']], ['Bevor wir abreisen, … → Vor unserer ___ …', ['Abreise']], ['Wenn man das Gerät benutzt, … → Bei der ___ des Geräts …', ['Benutzung']], ['Obwohl es regnete, … → Trotz des ___ …', ['Regens']], ['Während wir essen, … → Während des ___ …', ['Essens']]]
  });

  /* ======================= B2-U2 Wirtschaft ======================= */
  unit('B2-U2', {
    title: 'Wirtschaft', subtitle: 'Economia, empresas e mercado de trabalho',
    goals: ['Entender notícias simples de economia (lucro, inflação, desemprego)', 'Descrever processos de uma empresa usando a voz passiva', 'Falar de obrigações e possibilidades na passiva com verbos modais'],
    dialog: [['A', 'Hast du gehört? Unsere Firma wird von einem amerikanischen Konzern übernommen.'], ['B', 'Ja, das wurde heute Morgen in der Versammlung bekanntgegeben.'], ['A', 'Was passiert jetzt mit den Arbeitsplätzen? Werden Leute entlassen?'], ['B', 'Angeblich nicht. Aber die Kosten müssen gesenkt werden, hat der Chef gesagt.'], ['A', 'Der Umsatz ist doch im letzten Jahr gestiegen. Warum wird gespart?'], ['B', 'Der Gewinn ist trotzdem gesunken, wegen der hohen Energiepreise und der Inflation.'], ['A', 'Hoffentlich wird bald mehr erklärt. Ich mache mir Sorgen.']],
    dialogPt: 'Dois colegas comentam a venda da empresa e o medo de demissões.',
    listening: ['Die Firma wurde im Jahr neunzehnhundertneunzig gegründet.', 'Die Kosten müssen dringend gesenkt werden.', 'Der Umsatz ist um fünf Prozent gestiegen.', 'In vielen Branchen fehlen Fachkräfte.', 'Die Produkte werden vor allem nach Asien exportiert.'],
    writing: 'Escreva um e-mail formal (≈ 150 palavras) ao conselho de funcionários (Betriebsrat) perguntando sobre a venda da empresa: o que já foi decidido, o que ainda precisa ser feito e quais são as suas preocupações. Use a passiva em pelo menos 3 tempos verbais e uma passiva com modal.',
    speaking: { scene: 'Entrevista de emprego: o recrutador pergunta sobre a empresa onde você trabalhou e sobre o mercado da sua área.', persona: 'Herr Krüger, recrutador, objetivo e formal (Sie)', goals: ['apresentar a empresa anterior (o que era produzido, quando foi fundada)', 'explicar uma mudança importante usando a passiva', 'falar da situação da sua área (falta de profissionais, salários)', 'fazer uma pergunta sobre a empresa dele'] },
    criteria: 'Critérios padrão; passiva em vários tempos ≥ 80%.',
    authentic: ['tagesschau.de, seção Wirtschaft: notícias curtas com vídeo de 1–2 min', 'DW „Made in Germany“: reportagens de economia', 'Podcast „Wirtschaft – einfach erklärt“ (ARD/BR): temas econômicos em linguagem simples'],
    reading: {
      title: 'Fachkräftemangel in Deutschland',
      text: ['In Deutschland werden Hunderttausende Fachkräfte gesucht. Besonders in der Pflege, im Handwerk und in der IT-Branche bleiben viele Stellen monatelang unbesetzt. Der Grund ist vor allem der demografische Wandel: Mehr Menschen gehen in Rente, als junge Leute nachkommen.', 'Um das Problem zu lösen, wurde 2023 ein neues Fachkräfteeinwanderungsgesetz beschlossen. Seitdem können ausländische Abschlüsse leichter anerkannt werden, und Bewerber mit Berufserfahrung dürfen schneller einreisen.', 'Kritiker sagen allerdings, dass noch viel getan werden muss. Die Verfahren in den Behörden dauern oft zu lange, und viele Zugewanderte finden keine bezahlbare Wohnung. Außerdem müssen Sprachkurse ausgebaut werden, denn ohne gute Deutschkenntnisse ist die Integration in den Arbeitsmarkt schwierig.'],
      questions: [['Was ist laut Text der wichtigste Grund für den Fachkräftemangel?', ['Der demografische Wandel', 'Die hohen Löhne', 'Die Digitalisierung'], 0], ['Was hat sich durch das neue Gesetz geändert?', ['Ausländische Abschlüsse werden leichter anerkannt.', 'Sprachkurse sind jetzt Pflicht.', 'Wohnungen werden billiger.'], 0], ['Was kritisieren manche Menschen?', ['Die Verfahren in den Behörden dauern zu lange.', 'Es kommen zu viele Fachkräfte.', 'Das Gesetz ist zu streng.'], 0]]
    }
  });
  N([
    ['umsatz', 'der', 'Umsatz', 'Umsätze', 'o faturamento', 'ˈʊmˌzats', 'Der Umsatz ist um fünf Prozent gestiegen.', 'O faturamento subiu cinco por cento.'],
    ['gewinn', 'der', 'Gewinn', 'Gewinne', 'o lucro; o prêmio', 'ɡəˈvɪn', 'Die Firma hat einen hohen Gewinn gemacht.', 'A empresa teve um lucro alto.'],
    ['verlust', 'der', 'Verlust', 'Verluste', 'o prejuízo; a perda', 'fɛɐ̯ˈlʊst', 'Im letzten Quartal gab es Verluste.', 'No último trimestre houve prejuízos.'],
    ['branche', 'die', 'Branche', 'Branchen', 'o setor, o ramo', 'ˈbʁãːʃə', 'In welcher Branche arbeiten Sie?', 'Em que setor o senhor trabalha?', 'Pronúncia francesa: “bran-xe”.'],
    ['konzern', 'der', 'Konzern', 'Konzerne', 'o grupo empresarial, a multinacional', 'kɔnˈtsɛʁn', 'Der Konzern hat Standorte in vielen Ländern.', 'O grupo tem unidades em muitos países.'],
    ['arbeitsmarkt', 'der', 'Arbeitsmarkt', 'Arbeitsmärkte', 'o mercado de trabalho', 'ˈaʁbaɪ̯tsˌmaʁkt', 'Der Arbeitsmarkt in der IT ist sehr gut.', 'O mercado de trabalho em TI está muito bom.'],
    ['arbeitslosigkeit', 'die', 'Arbeitslosigkeit', '', 'o desemprego', 'ˈaʁbaɪ̯tsloːzɪçkaɪ̯t', 'Die Arbeitslosigkeit ist leicht gesunken.', 'O desemprego caiu um pouco.'],
    ['inflation', 'die', 'Inflation', 'Inflationen', 'a inflação', 'ɪnflaˈtsi̯oːn', 'Die Inflation macht das Leben teurer.', 'A inflação encarece a vida.'],
    ['fachkraft', 'die', 'Fachkraft', 'Fachkräfte', 'o profissional qualificado', 'ˈfaxˌkʁaft', 'In der Pflege fehlen viele Fachkräfte.', 'Faltam muitos profissionais na enfermagem.', 'Fachkräftemangel = falta de mão de obra qualificada.'],
    ['mangel', 'der', 'Mangel', 'Mängel', 'a falta; o defeito', 'ˈmaŋl̩', 'Es gibt einen Mangel an Wohnungen.', 'Há falta de apartamentos.', 'Mangel an + dativo.'],
    ['investition', 'die', 'Investition', 'Investitionen', 'o investimento', 'ɪnvɛstiˈtsi̯oːn', 'Die Investition hat sich gelohnt.', 'O investimento valeu a pena.'],
    ['nachfrage', 'die', 'Nachfrage', 'Nachfragen', 'a demanda, a procura', 'ˈnaːxˌfʁaːɡə', 'Die Nachfrage nach Elektroautos steigt.', 'A procura por carros elétricos aumenta.', 'Angebot und Nachfrage = oferta e demanda.'],
    ['konkurrent', 'der', 'Konkurrent', 'Konkurrenten', 'o concorrente', 'kɔŋkʊˈʁɛnt', 'Unser größter Konkurrent sitzt in München.', 'Nosso maior concorrente fica em Munique.', 'Declinação fraca: den Konkurrenten.'],
    ['lieferkette', 'die', 'Lieferkette', 'Lieferketten', 'a cadeia de suprimentos', 'ˈliːfɐˌkɛtə', 'Die Lieferketten wurden durch die Krise gestört.', 'As cadeias de suprimento foram afetadas pela crise.'],
    ['boerse', 'die', 'Börse', 'Börsen', 'a bolsa de valores', 'ˈbœʁzə', 'Die Aktie wird an der Börse gehandelt.', 'A ação é negociada na bolsa.'],
    ['aktie', 'die', 'Aktie', 'Aktien', 'a ação (da bolsa)', 'ˈaktsi̯ə', 'Sie hat Aktien von mehreren Firmen.', 'Ela tem ações de várias empresas.'],
    ['betriebsrat', 'der', 'Betriebsrat', 'Betriebsräte', 'o conselho de funcionários', 'bəˈtʁiːpsˌʁaːt', 'Der Betriebsrat vertritt die Interessen der Mitarbeiter.', 'O conselho representa os interesses dos funcionários.', 'Típico das empresas alemãs.'],
  ]);
  V([
    ['herstellen', 'herstellen', 'fabricar, produzir', 'ˈheːɐ̯ˌʃtɛlən', 'stelle her|stellst her|stellt her|stellen her|stellt her|stellen her', 'Hier werden Autoteile hergestellt.', 'Aqui são fabricadas peças de carro.'],
    ['investieren', 'investieren', 'investir', 'ɪnvɛsˈtiːʁən', 'investiere|investierst|investiert|investieren|investiert|investieren', 'Die Firma investiert in neue Technik.', 'A empresa investe em tecnologia nova.', 'investieren in + acusativo.'],
    ['entlassen', 'entlassen', 'demitir; dar alta', 'ɛntˈlasn̩', 'entlasse|entlässt|entlässt|entlassen|entlasst|entlassen', 'Es wurden keine Mitarbeiter entlassen.', 'Nenhum funcionário foi demitido.', 'Perfekt: hat entlassen.'],
    ['gruenden', 'gründen', 'fundar', 'ˈɡʁʏndn̩', 'gründe|gründest|gründet|gründen|gründet|gründen', 'Sie hat ihr eigenes Start-up gegründet.', 'Ela fundou a própria startup.'],
    ['exportieren', 'exportieren', 'exportar', 'ɛkspɔʁˈtiːʁən', 'exportiere|exportierst|exportiert|exportieren|exportiert|exportieren', 'Deutschland exportiert viele Maschinen.', 'A Alemanha exporta muitas máquinas.'],
    ['senken', 'senken', 'reduzir, baixar', 'ˈzɛŋkn̩', 'senke|senkst|senkt|senken|senkt|senken', 'Die Firma will die Kosten senken.', 'A empresa quer reduzir os custos.', 'senken (alguém baixa algo) × sinken (algo cai sozinho).'],
  ]);
  P([
    ['wirtschaftlich', 'wirtschaftlich', 'econômico (da economia)', 'wirtschaftlich = da economia; sparsam = que economiza.', 'word', 'ˈvɪʁtʃaftlɪç'],
    ['angeblich', 'angeblich', 'supostamente', '', 'word', 'ˈanɡeːplɪç'],
    ['rentabel', 'rentabel', 'rentável', '', 'word', 'ʁɛnˈtaːbl̩'],
    ['bekanntgegeben', 'Das wurde heute bekanntgegeben.', 'Isso foi anunciado hoje.', ''],
    ['kostengesenkt', 'Die Kosten müssen gesenkt werden.', 'Os custos precisam ser reduzidos.', 'Passiva com modal.'],
    ['sorgen', 'Ich mache mir Sorgen um meinen Job.', 'Estou preocupado com meu emprego.', 'sich Sorgen machen um + acusativo.'],
    ['umprozent', 'um fünf Prozent gestiegen', 'subiu cinco por cento', 'A diferença vem com “um”.'],
  ]);
  G('g_b2_passiv_zeiten', {
    title: 'Passiva em todos os tempos', explain: 'Passiv = <b>werden</b> + Partizip II. Nos tempos compostos, o particípio de werden vira <b>worden</b> (sem ge-!):<br>• Präsens: Das Werk <b>wird</b> gebaut.<br>• Präteritum: Das Werk <b>wurde</b> gebaut.<br>• Perfekt: Das Werk <b>ist</b> gebaut <b>worden</b>.<br>• Plusquamperfekt: Das Werk <b>war</b> gebaut <b>worden</b>.<br>• Futur: Das Werk <b>wird</b> gebaut <b>werden</b>.<br>Quem faz a ação aparece com <b>von</b> + dativo (pessoa) ou <b>durch</b> + acusativo (meio).',
    compare: 'Português: “foi construído” — alemão: wurde gebaut (escrito) ou ist gebaut worden (falado). Em notícias predomina o Präteritum: wurde.',
    examples: [['Die Firma wurde 1990 gegründet.', 'A empresa foi fundada em 1990.'], ['Der Vertrag ist gestern unterschrieben worden.', 'O contrato foi assinado ontem.']],
    drills: [['Das Werk ___ 1990 gegründet. (Präteritum)', ['wurde']], ['Die Produkte sind ins Ausland exportiert ___. (Perfekt)', ['worden']], ['Die neue Fabrik ___ nächstes Jahr gebaut werden. (Futur)', ['wird']], ['Bevor das Produkt verkauft wurde, ___ es getestet worden. (Plusquamperfekt)', ['war']], ['Die Preise ___ jedes Jahr erhöht. (Präsens, plural)', ['werden']], ['Der Vertrag ist gestern unterschrieben ___.', ['worden']], ['Die Mitarbeiter wurden ___ dem Chef informiert. (por)', ['von']]]
  });
  G('g_b2_passiv_modal', {
    title: 'Passiva com verbos modais', explain: 'Mit Modalverb: Modalverb konjugiert + Partizip II + <b>werden</b> (no fim):<br>• Die Kosten <b>müssen</b> gesenkt <b>werden</b>. (precisam ser reduzidos)<br>• Der Antrag <b>kann</b> online gestellt <b>werden</b>.<br>• Hier <b>darf</b> nicht geraucht <b>werden</b>.<br>No passado: Das Problem <b>konnte</b> gelöst <b>werden</b>.<br>Em oração subordinada, o modal vai para o fim de tudo: …, dass die Kosten gesenkt werden <b>müssen</b>.',
    compare: '“Isso precisa ser feito” = Das <b>muss</b> gemacht <b>werden</b>. A ordem é quase o inverso do português.',
    examples: [['Die Rechnung muss bis Freitag bezahlt werden.', 'A conta precisa ser paga até sexta.'], ['Das Problem konnte schnell gelöst werden.', 'O problema pôde ser resolvido rápido.']],
    drills: [['Die Kosten müssen gesenkt ___.', ['werden']], ['Der Antrag kann online gestellt ___.', ['werden']], ['Die Rechnung ___ bis Freitag bezahlt werden. (precisa)', ['muss']], ['Hier darf nicht geraucht ___.', ['werden']], ['Das Problem ___ schnell gelöst werden. (pôde, Präteritum)', ['konnte']], ['Ich glaube, dass mehr investiert werden ___. (precisa)', ['muss']]]
  });

  /* ======================= B2-U3 Wissenschaft und Technik ======================= */
  unit('B2-U3', {
    title: 'Wissenschaft und Technik', subtitle: 'Pesquisa, invenções e inteligência artificial',
    goals: ['Entender textos de divulgação científica', 'Explicar como uma tecnologia funciona e quais são seus riscos', 'Usar particípios como adjetivo para descrever de forma compacta'],
    dialog: [['A', 'Hast du die neue Studie über künstliche Intelligenz gelesen?'], ['B', 'Die gestern veröffentlichte Studie aus Heidelberg? Ja, sehr spannend.'], ['A', 'Die Forscher haben einen lernenden Algorithmus entwickelt, der Krankheiten früher erkennt.'], ['B', 'Das klingt nach einem großen Fortschritt. Aber was passiert mit den gesammelten Daten?'], ['A', 'Gute Frage. Der Datenschutz ist in der Studie leider nur kurz erwähnt.'], ['B', 'Ohne klare Regeln wird die Anwendung in Krankenhäusern schwierig.'], ['A', 'Stimmt. Aber die Ergebnisse sind trotzdem beeindruckend.']],
    dialogPt: 'Dois amigos comentam um estudo sobre IA na medicina e a proteção de dados.',
    listening: ['Die Forscher haben eine wichtige Entdeckung gemacht.', 'Die veröffentlichte Studie wurde oft zitiert.', 'Der lernende Algorithmus erkennt Muster in den Daten.', 'Die Daten werden auf einem sicheren Server gespeichert.', 'Diese Erfindung hat unser Leben verändert.'],
    writing: 'Escreva um texto (≈ 180 palavras) para o blog da sua turma: “Künstliche Intelligenz im Alltag – Chance oder Risiko?”. Descreva duas aplicações, um risco e sua conclusão. Use pelo menos 3 particípios como adjetivo (ex.: die steigenden Kosten, die gespeicherten Daten).',
    speaking: { scene: 'Você apresenta em uma feira de ciências uma invenção (real ou imaginada) e responde às perguntas do público.', persona: 'Frau Dr. Yilmaz, jurada da feira, curiosa e crítica (Sie)', goals: ['apresentar a invenção e para que serve', 'explicar como funciona em 2 ou 3 passos', 'responder a uma pergunta sobre riscos ou custos', 'dizer o que ainda precisa ser pesquisado'] },
    criteria: 'Critérios padrão; particípios como adjetivo ≥ 80%.',
    authentic: ['Quarks (WDR), vídeos no YouTube e podcast: ciência explicada com clareza', 'maiLab (YouTube): química e ciência com linguagem do dia a dia', 'Deutschlandfunk „Forschung aktuell“: notícias de ciência em 5 minutos'],
    reading: {
      title: 'Künstliche Intelligenz in der Medizin',
      text: ['Künstliche Intelligenz kann heute auf Röntgenbildern Veränderungen erkennen, die für das menschliche Auge kaum sichtbar sind. In mehreren Studien haben lernende Systeme Hautkrebs ähnlich zuverlässig erkannt wie erfahrene Ärztinnen und Ärzte.', 'Die Vorteile liegen auf der Hand: Diagnosen könnten schneller gestellt werden, und überlastete Kliniken würden entlastet. Besonders in ländlichen Regionen, in denen Fachärzte fehlen, sehen Experten großes Potenzial.', 'Doch es gibt auch Bedenken. Die Systeme werden mit riesigen Mengen an Patientendaten trainiert, und diese Daten müssen gut geschützt werden. Außerdem ist oft unklar, wie ein Algorithmus zu seiner Entscheidung kommt. Deshalb betonen die meisten Forschenden: Die KI soll Ärzte unterstützen, nicht ersetzen.'],
      questions: [['Was kann KI laut Text auf Röntgenbildern?', ['Veränderungen erkennen, die man kaum sieht', 'Krankheiten heilen', 'Ärzte vollständig ersetzen'], 0], ['Wo sehen Experten besonders großes Potenzial?', ['In ländlichen Regionen ohne genug Fachärzte', 'In großen Universitätskliniken', 'In der Pharmaindustrie'], 0], ['Welches Problem nennt der Text?', ['Es ist oft unklar, wie der Algorithmus entscheidet.', 'Die Systeme sind zu langsam.', 'Die Röntgenbilder sind zu teuer.'], 0]]
    }
  });
  N([
    ['forschung', 'die', 'Forschung', 'Forschungen', 'a pesquisa (científica)', 'ˈfɔʁʃʊŋ', 'Die Forschung braucht mehr Geld.', 'A pesquisa precisa de mais dinheiro.'],
    ['studie', 'die', 'Studie', 'Studien', 'o estudo (científico)', 'ˈʃtuːdi̯ə', 'Laut einer neuen Studie schlafen wir zu wenig.', 'Segundo um novo estudo, dormimos pouco.'],
    ['erfindung', 'die', 'Erfindung', 'Erfindungen', 'a invenção', 'ɛɐ̯ˈfɪndʊŋ', 'Der Buchdruck war eine wichtige Erfindung.', 'A imprensa foi uma invenção importante.'],
    ['fortschritt', 'der', 'Fortschritt', 'Fortschritte', 'o progresso', 'ˈfɔʁtˌʃʁɪt', 'Du machst große Fortschritte im Deutschen.', 'Você está progredindo muito no alemão.', 'Fortschritte machen = progredir.'],
    ['entdeckung', 'die', 'Entdeckung', 'Entdeckungen', 'a descoberta', 'ɛntˈdɛkʊŋ', 'Die Entdeckung des Penicillins rettete Millionen Leben.', 'A descoberta da penicilina salvou milhões de vidas.'],
    ['erkenntnis', 'die', 'Erkenntnis', 'Erkenntnisse', 'a constatação, o conhecimento obtido', 'ɛɐ̯ˈkɛntnɪs', 'Die Studie liefert neue Erkenntnisse.', 'O estudo traz novas descobertas.'],
    ['hypothese', 'die', 'Hypothese', 'Hypothesen', 'a hipótese', 'hypoˈteːzə', 'Die Hypothese wurde bestätigt.', 'A hipótese foi confirmada.'],
    ['labor', 'das', 'Labor', 'Labore', 'o laboratório', 'laˈboːɐ̯', 'Die Proben werden im Labor untersucht.', 'As amostras são analisadas no laboratório.'],
    ['wissenschaftler', 'der', 'Wissenschaftler', '=', 'o cientista', 'ˈvɪsn̩ʃaftlɐ', 'Die Wissenschaftler warnen vor dem Klimawandel.', 'Os cientistas alertam sobre a mudança climática.', 'Feminino: die Wissenschaftlerin.'],
    ['algorithmus', 'der', 'Algorithmus', 'Algorithmen', 'o algoritmo', 'alɡoˈʁɪtmʊs', 'Der Algorithmus entscheidet, welche Videos du siehst.', 'O algoritmo decide quais vídeos você vê.'],
    ['datenschutz', 'der', 'Datenschutz', '', 'a proteção de dados', 'ˈdaːtn̩ˌʃʊts', 'In Deutschland ist der Datenschutz sehr streng.', 'Na Alemanha a proteção de dados é muito rígida.', 'DSGVO = a lei europeia (LGPD de lá).'],
    ['anwendung', 'die', 'Anwendung', 'Anwendungen', 'a aplicação, o uso; o aplicativo', 'ˈanˌvɛndʊŋ', 'Die Anwendung der Technik ist noch teuer.', 'A aplicação da tecnologia ainda é cara.'],
    ['technologie', 'die', 'Technologie', 'Technologien', 'a tecnologia', 'tɛçnoloˈɡiː', 'Neue Technologien verändern die Arbeitswelt.', 'Novas tecnologias mudam o mundo do trabalho.'],
    ['probe', 'die', 'Probe', 'Proben', 'a amostra; o ensaio', 'ˈpʁoːbə', 'Der Arzt nimmt eine Blutprobe.', 'O médico colhe uma amostra de sangue.', 'Também: ensaio de teatro.'],
    ['ki', 'die', 'KI', 'KIs', 'a IA (künstliche Intelligenz)', 'kaːˈʔiː', 'Die KI schreibt schon ganze Texte.', 'A IA já escreve textos inteiros.', 'Abreviação de künstliche Intelligenz.'],
    ['bedenken', 'das', 'Bedenken', '=', 'a preocupação, a ressalva', 'bəˈdɛŋkn̩', 'Viele Menschen haben Bedenken wegen des Datenschutzes.', 'Muita gente tem ressalvas por causa da proteção de dados.', 'Quase sempre no plural: Bedenken haben.'],
  ]);
  V([
    ['forschen', 'forschen', 'pesquisar (ciência)', 'ˈfɔʁʃn̩', 'forsche|forschst|forscht|forschen|forscht|forschen', 'Sie forscht seit Jahren über Alzheimer.', 'Ela pesquisa sobre Alzheimer há anos.'],
    ['erfinden', 'erfinden', 'inventar', 'ɛɐ̯ˈfɪndn̩', 'erfinde|erfindest|erfindet|erfinden|erfindet|erfinden', 'Wer hat das Telefon erfunden?', 'Quem inventou o telefone?', 'Perfekt: hat erfunden.'],
    ['beweisen', 'beweisen', 'provar, comprovar', 'bəˈvaɪ̯zn̩', 'beweise|beweist|beweist|beweisen|beweist|beweisen', 'Das ist noch nicht bewiesen.', 'Isso ainda não está comprovado.', 'Perfekt: hat bewiesen.'],
    ['analysieren', 'analysieren', 'analisar', 'analyˈziːʁən', 'analysiere|analysierst|analysiert|analysieren|analysiert|analysieren', 'Die Proben werden genau analysiert.', 'As amostras são analisadas com cuidado.'],
    ['ermoeglichen', 'ermöglichen', 'possibilitar', 'ɛɐ̯ˈmøːklɪçn̩', 'ermögliche|ermöglichst|ermöglicht|ermöglichen|ermöglicht|ermöglichen', 'Das Internet ermöglicht Fernunterricht.', 'A internet possibilita o ensino a distância.'],
    ['digitalisieren', 'digitalisieren', 'digitalizar', 'diɡitaliˈziːʁən', 'digitalisiere|digitalisierst|digitalisiert|digitalisieren|digitalisiert|digitalisieren', 'Die Behörden sollen ihre Akten digitalisieren.', 'Os órgãos públicos devem digitalizar seus arquivos.'],
  ]);
  P([
    ['wissenschaftlich', 'wissenschaftlich', 'científico', '', 'word', 'ˈvɪsn̩ʃaftlɪç'],
    ['zuverlaessig', 'zuverlässig', 'confiável', '', 'word', 'ˈtsuːfɛɐ̯ˌlɛsɪç'],
    ['bahnbrechend', 'bahnbrechend', 'revolucionário, pioneiro', 'Particípio I usado como adjetivo.', 'word', 'ˈbaːnˌbʁɛçn̩t'],
    ['laut', 'laut einer Studie', 'segundo um estudo', 'laut + dativo (ou genitivo).', ''],
    ['aufderhand', 'Die Vorteile liegen auf der Hand.', 'As vantagens são óbvias.', ''],
    ['ersetzen', 'Die KI soll Menschen nicht ersetzen.', 'A IA não deve substituir as pessoas.', ''],
    ['kaumsichtbar', 'kaum sichtbar', 'quase invisível', ''],
  ]);
  G('g_b2_partizip', {
    title: 'Particípio I e II como adjetivo', explain: 'Partizipien können wie Adjektive vor dem Nomen stehen und bekommen dann Adjektivendungen:<br>• <b>Partizip I</b> = infinitivo + <b>d</b> → ação <b>em andamento</b>, sentido ativo: das schlafen<b>d</b>e Kind (a criança que está dormindo), die steigend<b>en</b> Preise.<br>• <b>Partizip II</b> → ação <b>concluída</b> ou sentido passivo: die veröffentlicht<b>e</b> Studie (o estudo que foi publicado), mit geschlossen<b>en</b> Augen.<br>Atributo estendido (texto formal): die <b>gestern in Heidelberg veröffentlichte</b> Studie = o estudo publicado ontem em Heidelberg. Os complementos ficam entre o artigo e o particípio.',
    compare: 'Português põe depois: “o estudo publicado”. Alemão põe antes e declina: die veröffentlicht<b>e</b> Studie, in der veröffentlicht<b>en</b> Studie.',
    examples: [['Das schlafende Kind darf nicht geweckt werden.', 'A criança que está dormindo não pode ser acordada.'], ['Die gesammelten Daten werden gespeichert.', 'Os dados coletados são armazenados.']],
    drills: [['das ___ Kind (schlafen, está dormindo)', ['schlafende']], ['die ___ Studie (veröffentlichen, já publicada)', ['veröffentlichte']], ['mit ___ Augen (schließen)', ['geschlossenen']], ['ein ___ Problem (wachsen, que está crescendo)', ['wachsendes']], ['Die ___ Preise ärgern alle. (steigen)', ['steigenden']], ['die im Labor ___ Proben (untersuchen)', ['untersuchten']], ['ein gut ___ Plan (durchdenken)', ['durchdachter']]]
  });
  G('g_b2_partizip_order', {
    title: 'Montar frases com atributo de particípio', explain: 'Monte as frases. No atributo estendido, tudo o que descreve o substantivo fica entre o artigo e o particípio.',
    compare: 'Leia de trás para frente para traduzir: die [gestern veröffentlichte] Studie = o estudo [publicado ontem].',
    examples: [['Die gestern veröffentlichte Studie ist spannend.', 'O estudo publicado ontem é interessante.']],
    order: [['Die gestern veröffentlichte Studie ist sehr spannend.', 'O estudo publicado ontem é muito interessante.'], ['Der lernende Algorithmus erkennt Krankheiten früher.', 'O algoritmo que aprende reconhece doenças mais cedo.'], ['Die gesammelten Daten müssen geschützt werden.', 'Os dados coletados precisam ser protegidos.'], ['Das schlafende Kind darf nicht geweckt werden.', 'A criança que dorme não pode ser acordada.'], ['Die steigenden Kosten sind ein großes Problem.', 'Os custos crescentes são um grande problema.']]
  });

  GF.kitB2 = K;
})(globalThis.GF = globalThis.GF || {});
