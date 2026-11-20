/* Conteúdo fixo B1 — parte 1 (B1-U1 a B1-U4). Frases didáticas para o nível. */
(function (GF) {
  'use strict';
  const K = GF.kit('B1', 'b1');
  const { unit, N, V, P, G } = K;

  /* ======================= B1-U1 Nachbarschaft ======================= */
  unit('B1-U1', {
    title: 'Nachbarschaft', subtitle: 'Vizinhança, regras do prédio e convivência',
    goals: ['Apresentar-se aos vizinhos e pedir favores', 'Reclamar de forma educada', 'Descrever pessoas e coisas com orações relativas'],
    dialog: [['A', 'Guten Tag! Darf ich mich vorstellen? Ich bin der neue Mieter aus dem dritten Stock.'], ['B', 'Herzlich willkommen! Ich bin Frau Becker. Ich wohne direkt unter Ihnen.'], ['A', 'Gibt es hier eine Hausordnung, die ich kennen sollte?'], ['B', 'Ja, sie hängt im Treppenhaus. Die Ruhezeit beginnt um 22 Uhr.'], ['A', 'Gut zu wissen. Und wer kümmert sich um die Mülltonnen?'], ['B', 'Der Hausmeister, der im Erdgeschoss wohnt. Wenn Sie Hilfe brauchen, klingeln Sie einfach.']],
    dialogPt: 'Um novo morador conhece a vizinha e pergunta sobre as regras do prédio.',
    listening: ['Die Ruhezeit beginnt um zweiundzwanzig Uhr.', 'Der Nachbar, der über mir wohnt, ist sehr laut.', 'Könnten Sie bitte etwas leiser sein?', 'Der Hausmeister kümmert sich um die Heizung.', 'Kannst du mir deine Leiter leihen?'],
    writing: 'Escreva um bilhete educado ao vizinho: apresente-se, explique um problema (barulho, lixo…) e proponha uma solução. Use pelo menos 2 orações relativas.',
    speaking: { scene: 'O vizinho de cima faz barulho tarde da noite. Você toca a campainha para conversar.', persona: 'Herr Lang, vizinho, formal (Sie), um pouco na defensiva', goals: ['cumprimentar e se apresentar', 'explicar o problema com educação', 'mencionar a regra do prédio', 'propor um acordo', 'encerrar de forma cordial'] },
    criteria: 'Critérios padrão; pronomes relativos ≥ 80%.'
  });
  N([
    ['mieter', 'der', 'Mieter', '=', 'o inquilino', 'ˈmiːtɐ', 'Der Mieter zahlt die Miete pünktlich.', 'O inquilino paga o aluguel em dia.'],
    ['mieterin', 'die', 'Mieterin', 'Mieterinnen', 'a inquilina', 'ˈmiːtəʁɪn', 'Die neue Mieterin kommt aus Italien.', 'A nova inquilina é da Itália.'],
    ['hausordnung', 'die', 'Hausordnung', 'Hausordnungen', 'o regulamento do prédio', 'ˈhaʊ̯sˌʔɔʁdnʊŋ', 'Die Hausordnung hängt im Treppenhaus.', 'O regulamento está afixado na escadaria.'],
    ['hausmeister', 'der', 'Hausmeister', '=', 'o zelador', 'ˈhaʊ̯sˌmaɪ̯stɐ', 'Der Hausmeister repariert die Klingel.', 'O zelador conserta a campainha.'],
    ['treppenhaus', 'das', 'Treppenhaus', 'Treppenhäuser', 'a escadaria', 'ˈtʁɛpn̩ˌhaʊ̯s', 'Im Treppenhaus darf man nicht rauchen.', 'Não se pode fumar na escadaria.'],
    ['ruhezeit', 'die', 'Ruhezeit', 'Ruhezeiten', 'o horário de silêncio', 'ˈʁuːəˌtsaɪ̯t', 'Die Ruhezeit beginnt um 22 Uhr.', 'O horário de silêncio começa às 22h.', 'Comum também no domingo e na hora do almoço.'],
    ['laerm', 'der', 'Lärm', '', 'o barulho', 'lɛʁm', 'Der Lärm von der Straße stört mich.', 'O barulho da rua me incomoda.'],
    ['ruecksicht', 'die', 'Rücksicht', '', 'a consideração (pelos outros)', 'ˈʁʏkzɪçt', 'Bitte nehmen Sie Rücksicht auf die Nachbarn.', 'Por favor, tenha consideração com os vizinhos.'],
    ['stockwerk', 'das', 'Stockwerk', 'Stockwerke', 'o andar', 'ˈʃtɔkvɛʁk', 'Wir wohnen im vierten Stockwerk.', 'Moramos no quarto andar.', 'Mais comum na fala: im vierten Stock.'],
    ['aufzug', 'der', 'Aufzug', 'Aufzüge', 'o elevador', 'ˈaʊ̯fˌtsuːk', 'Der Aufzug ist leider kaputt.', 'Infelizmente o elevador está quebrado.'],
    ['klingel', 'die', 'Klingel', 'Klingeln', 'a campainha', 'ˈklɪŋl̩', 'Die Klingel funktioniert nicht.', 'A campainha não funciona.'],
    ['briefkasten', 'der', 'Briefkasten', 'Briefkästen', 'a caixa de correio', 'ˈbʁiːfˌkastn̩', 'Der Brief liegt im Briefkasten.', 'A carta está na caixa de correio.'],
    ['muelltonne', 'die', 'Mülltonne', 'Mülltonnen', 'a lixeira (do prédio)', 'ˈmʏlˌtɔnə', 'Das Papier gehört in die blaue Mülltonne.', 'O papel vai na lixeira azul.'],
    ['viertel', 'das', 'Viertel', '=', 'o bairro', 'ˈfɪʁtl̩', 'Unser Viertel ist ruhig und grün.', 'Nosso bairro é tranquilo e arborizado.', 'Também “ein Viertel” = um quarto.'],
    ['leiter', 'die', 'Leiter', 'Leitern', 'a escada (móvel)', 'ˈlaɪ̯tɐ', 'Ich brauche eine Leiter für die Lampe.', 'Preciso de uma escada para a luminária.', 'der Leiter = o diretor.'],
  ]);
  V([
    ['sichbeschweren', 'sich beschweren', 'reclamar', 'zɪç bəˈʃveːʁən', 'beschwere mich|beschwerst dich|beschwert sich|beschweren uns|beschwert euch|beschweren sich', 'Sie beschwert sich über den Lärm.', 'Ela reclama do barulho.', 'sich beschweren über + acusativo.'],
    ['stoeren', 'stören', 'incomodar, atrapalhar', 'ˈʃtøːʁən', 'störe|störst|stört|stören|stört|stören', 'Entschuldigung, störe ich?', 'Com licença, estou atrapalhando?'],
    ['gruessen', 'grüßen', 'cumprimentar', 'ˈɡʁyːsn̩', 'grüße|grüßt|grüßt|grüßen|grüßt|grüßen', 'Er grüßt mich jeden Morgen.', 'Ele me cumprimenta toda manhã.'],
    ['klingeln', 'klingeln', 'tocar a campainha; tocar (telefone)', 'ˈklɪŋl̩n', 'klingle|klingelst|klingelt|klingeln|klingelt|klingeln', 'Es klingelt an der Tür.', 'Estão tocando a campainha.', 'ich klingle (o -e- cai).'],
    ['sichkuemmern', 'sich kümmern', 'cuidar de, encarregar-se', 'zɪç ˈkʏmɐn', 'kümmere mich|kümmerst dich|kümmert sich|kümmern uns|kümmert euch|kümmern sich', 'Ich kümmere mich um die Pflanzen.', 'Eu cuido das plantas.', 'sich kümmern um + acusativo.'],
    ['leihen', 'leihen', 'emprestar', 'ˈlaɪ̯ən', 'leihe|leihst|leiht|leihen|leiht|leihen', 'Kannst du mir dein Fahrrad leihen?', 'Você pode me emprestar sua bicicleta?', 'Perfekt: hat geliehen.'],
  ]);
  P([
    ['freundlich', 'freundlich', 'simpático, cordial', '', 'word', 'ˈfʁɔɪ̯ntlɪç'],
    ['hilfsbereit', 'hilfsbereit', 'prestativo', '', 'word', 'ˈhɪlfsbəˌʁaɪ̯t'],
    ['ruecksichtsvoll', 'rücksichtsvoll', 'atencioso, considerado', '', 'word', 'ˈʁʏkzɪçtsˌfɔl'],
    ['vorstellen', 'Darf ich mich vorstellen?', 'Posso me apresentar?', ''],
    ['leiser', 'Könnten Sie bitte etwas leiser sein?', 'O senhor poderia fazer um pouco menos de barulho?', 'Pedido educado com Konjunktiv II.'],
    ['dasstoert', 'Das stört mich.', 'Isso me incomoda.', ''],
    ['kuemmeredarum', 'Ich kümmere mich darum.', 'Eu cuido disso.', ''],
    ['gutzuwissen', 'Gut zu wissen.', 'Bom saber.', ''],
  ]);
  G('g_b1_relativ', {
    title: 'Orações relativas (der, die, das, denen…)', explain: 'A oração relativa explica um substantivo. O pronome relativo é quase igual ao artigo definido:<br>• o <b>gênero/número</b> vem do substantivo explicado;<br>• o <b>caso</b> vem da função dentro da relativa;<br>• o verbo conjugado vai para o <b>fim</b>.<br>Nominativo: der, die, das, die · Acusativo: <b>den</b>, die, das, die · Dativo: <b>dem</b>, <b>der</b>, <b>dem</b>, <b>denen</b>.<br>Com preposição, ela vem antes: der Nachbar, <b>mit dem</b> ich spreche.',
    compare: 'Português usa quase sempre “que”. Em alemão o pronome muda: “o homem que eu conheço” = der Mann, <b>den</b> ich kenne.',
    examples: [['Der Nachbar, der über mir wohnt, ist laut.', 'O vizinho que mora em cima de mim é barulhento.'], ['Das ist die Leiter, die ich dir geliehen habe.', 'Esta é a escada que eu te emprestei.'], ['Die Nachbarn, mit denen ich spreche, sind nett.', 'Os vizinhos com quem eu falo são legais.']],
    drills: [['Der Nachbar, ___ neben mir wohnt, ist nett.', ['der']], ['Die Frau, ___ ich gestern gesehen habe, wohnt oben.', ['die']], ['Das Kind, ___ ich helfe, ist sieben.', ['dem']], ['Der Mann, ___ ich kenne, heißt Paul.', ['den']], ['Die Leute, ___ hier wohnen, sind laut.', ['die']], ['Die Nachbarn, mit ___ ich spreche, sind nett.', ['denen']], ['Das ist die Kollegin, ___ ich das Buch geliehen habe.', ['der']]]
  });
  G('g_b1_relativ_order', {
    title: 'Montar orações relativas', explain: 'Monte as frases: a relativa fica entre vírgulas, logo depois do substantivo, com o verbo conjugado no fim.',
    compare: 'O verbo no fim é o que mais muda em relação ao português.',
    examples: [['Ich suche eine Wohnung, die einen Balkon hat.', 'Procuro um apartamento que tenha varanda.']],
    order: [['Das ist der Nachbar, der immer laut Musik hört.', 'Esse é o vizinho que sempre ouve música alta.'], ['Die Wohnung, die ich gemietet habe, ist sehr hell.', 'O apartamento que aluguei é muito claro.'], ['Der Hausmeister, mit dem ich gesprochen habe, ist nett.', 'O zelador com quem falei é legal.'], ['Ich suche eine Wohnung, die einen Balkon hat.', 'Procuro um apartamento que tenha varanda.'], ['Wo ist der Brief, der gestern gekommen ist?', 'Onde está a carta que chegou ontem?']]
  });

  /* ======================= B1-U2 Bildung und Karriere ======================= */
  unit('B1-U2', {
    title: 'Bildung und Karriere', subtitle: 'Escola, formação e trajetória profissional',
    goals: ['Contar a própria trajetória escolar e profissional', 'Usar o Präteritum para narrar', 'Falar de qualificações e candidaturas'],
    dialog: [['A', 'Erzähl mal, wie war deine Schulzeit?'], ['B', 'In der Schule war ich nicht sehr fleißig. Mathe mochte ich gar nicht.'], ['A', 'Und nach dem Abschluss?'], ['B', 'Zuerst machte ich ein Praktikum, dann begann ich mein Studium.'], ['A', 'Hast du dich schon bei vielen Firmen beworben?'], ['B', 'Ja, bei zehn. Schließlich bekam ich eine Stelle in Stuttgart.']],
    dialogPt: 'Uma pessoa conta sua trajetória da escola até o primeiro emprego.',
    listening: ['Nach der Schule machte ich ein Praktikum.', 'Sie studierte drei Jahre in Leipzig.', 'Er bekam eine gute Note in Deutsch.', 'Ich habe mich bei einer Firma beworben.', 'Der Kurs begann im Oktober.'],
    writing: 'Escreva seu Lebenslauf em texto corrido (8–10 frases, no Präteritum): escola, formação, empregos e o que quer fazer agora.',
    speaking: { scene: 'Um recrutador pede que você conte sua trajetória numa entrevista.', persona: 'Herr Fischer, recrutador, formal (Sie), objetivo', goals: ['contar a formação no passado', 'descrever uma experiência profissional', 'citar uma habilidade', 'explicar por que quer a vaga'] },
    criteria: 'Critérios padrão; Präteritum regular e irregular ≥ 80%.'
  });
  N([
    ['schule', 'die', 'Schule', 'Schulen', 'a escola', 'ˈʃuːlə', 'Die Schule beginnt um acht Uhr.', 'A escola começa às oito.'],
    ['schueler', 'der', 'Schüler', '=', 'o aluno (da escola)', 'ˈʃyːlɐ', 'Die Schüler schreiben einen Test.', 'Os alunos fazem uma prova.'],
    ['universitaet', 'die', 'Universität', 'Universitäten', 'a universidade', 'univɛʁziˈtɛːt', 'Sie studiert an der Universität Wien.', 'Ela estuda na Universidade de Viena.', 'Coloquial: die Uni.'],
    ['abschluss', 'der', 'Abschluss', 'Abschlüsse', 'a conclusão (do curso), o diploma', 'ˈapʃlʊs', 'Nach dem Abschluss suchte er Arbeit.', 'Depois de se formar, ele procurou trabalho.'],
    ['fach', 'das', 'Fach', 'Fächer', 'a matéria, a disciplina', 'fax', 'Mein Lieblingsfach war Geschichte.', 'Minha matéria favorita era história.'],
    ['note', 'die', 'Note', 'Noten', 'a nota', 'ˈnoːtə', 'Sie hat gute Noten.', 'Ela tem boas notas.', 'Na Alemanha: 1 = ótimo, 6 = insuficiente.'],
    ['zeugnis', 'das', 'Zeugnis', 'Zeugnisse', 'o boletim; o certificado', 'ˈtsɔɪ̯knɪs', 'Schick bitte eine Kopie von deinem Zeugnis.', 'Mande uma cópia do seu certificado.'],
    ['praktikum', 'das', 'Praktikum', 'Praktika', 'o estágio', 'ˈpʁaktikʊm', 'Ich mache ein Praktikum bei einer Bank.', 'Faço estágio num banco.'],
    ['lebenslauf', 'der', 'Lebenslauf', 'Lebensläufe', 'o currículo', 'ˈleːbn̩sˌlaʊ̯f', 'Der Lebenslauf sollte kurz sein.', 'O currículo deve ser curto.'],
    ['karriere', 'die', 'Karriere', 'Karrieren', 'a carreira', 'kaˈʁi̯eːʁə', 'Sie macht Karriere in der Technik.', 'Ela faz carreira em tecnologia.'],
    ['weiterbildung', 'die', 'Weiterbildung', 'Weiterbildungen', 'o curso de aperfeiçoamento', 'ˈvaɪ̯tɐˌbɪldʊŋ', 'Die Firma bezahlt die Weiterbildung.', 'A empresa paga o curso de aperfeiçoamento.'],
    ['semester', 'das', 'Semester', '=', 'o semestre', 'zeˈmɛstɐ', 'Ich bin im dritten Semester.', 'Estou no terceiro semestre.'],
    ['faehigkeit', 'die', 'Fähigkeit', 'Fähigkeiten', 'a habilidade, a capacidade', 'ˈfɛːɪçkaɪ̯t', 'Teamarbeit ist eine wichtige Fähigkeit.', 'Trabalho em equipe é uma habilidade importante.'],
  ]);
  V([
    ['unterrichten', 'unterrichten', 'dar aula, ensinar', 'ʊntɐˈʁɪçtn̩', 'unterrichte|unterrichtest|unterrichtet|unterrichten|unterrichtet|unterrichten', 'Sie unterrichtet Deutsch an einer Schule.', 'Ela dá aula de alemão numa escola.'],
    ['sichbewerben', 'sich bewerben', 'candidatar-se', 'zɪç bəˈvɛʁbn̩', 'bewerbe mich|bewirbst dich|bewirbt sich|bewerben uns|bewerbt euch|bewerben sich', 'Ich bewerbe mich um die Stelle.', 'Eu me candidato à vaga.', 'e→i; sich bewerben um/bei. Perfekt: hat sich beworben.'],
    ['beginnen', 'beginnen', 'começar', 'bəˈɡɪnən', 'beginne|beginnst|beginnt|beginnen|beginnt|beginnen', 'Das Semester beginnt im Oktober.', 'O semestre começa em outubro.', 'Präteritum: begann; Perfekt: hat begonnen.'],
    ['bekommen', 'bekommen', 'receber, conseguir', 'bəˈkɔmən', 'bekomme|bekommst|bekommt|bekommen|bekommt|bekommen', 'Ich habe die Stelle bekommen!', 'Consegui a vaga!', 'Falso amigo: NÃO é “become”. Präteritum: bekam.'],
    ['erreichen', 'erreichen', 'alcançar, atingir', 'ɛɐ̯ˈʁaɪ̯çn̩', 'erreiche|erreichst|erreicht|erreichen|erreicht|erreichen', 'Sie hat ihr Ziel erreicht.', 'Ela atingiu sua meta.'],
    ['wechseln', 'wechseln', 'trocar, mudar', 'ˈvɛksl̩n', 'wechsle|wechselst|wechselt|wechseln|wechselt|wechseln', 'Er wechselte die Firma.', 'Ele trocou de empresa.'],
  ]);
  P([
    ['fleissig', 'fleißig', 'esforçado, aplicado', '', 'word', 'ˈflaɪ̯sɪç'],
    ['erfolgreich', 'erfolgreich', 'bem-sucedido', '', 'word', 'ɛɐ̯ˈfɔlkʁaɪ̯ç'],
    ['zuerst', 'zuerst', 'primeiro', 'Narrar: zuerst … dann … danach … schließlich.', 'word', 'tsuˈʔeːɐ̯st'],
    ['schliesslich', 'schließlich', 'por fim, finalmente', '', 'word', 'ˈʃliːslɪç'],
    ['beworben', 'Ich habe mich bei einer Firma beworben.', 'Eu me candidatei numa empresa.', ''],
    ['erzaehlmal', 'Erzähl mal!', 'Conta aí!', ''],
    ['abschlussjahr', 'Ich habe 2015 meinen Abschluss gemacht.', 'Eu me formei em 2015.', 'Ano sem preposição (ou: im Jahr 2015).'],
  ]);
  G('g_b1_praet_reg', {
    title: 'Präteritum dos verbos regulares e mistos', explain: 'O Präteritum é o passado da <b>narração escrita</b> (histórias, notícias, currículo). Regulares: radical + <b>-te</b>:<br>ich mach<b>te</b> · du mach<b>test</b> · er mach<b>te</b> · wir mach<b>ten</b> · ihr mach<b>tet</b> · sie mach<b>ten</b>.<br>Radical em -t/-d: + <b>-ete</b>: arbeit<b>ete</b>, red<b>ete</b>.<br>Mistos: mögen → <b>mochte</b>, denken → <b>dachte</b>, bringen → <b>brachte</b>, wissen → <b>wusste</b>, kennen → <b>kannte</b>.',
    compare: 'Na fala usa-se mais o Perfekt; o Präteritum é o “pretérito” dos textos. ich = er (sem terminação própria).',
    examples: [['Nach der Schule arbeitete ich in einem Café.', 'Depois da escola trabalhei num café.'], ['Damals wohnten wir in Porto Alegre.', 'Naquela época morávamos em Porto Alegre.']],
    drills: [['Er ___ zwei Jahre in Berlin. (wohnen)', ['wohnte']], ['Wir ___ in einem Hotel. (arbeiten)', ['arbeiteten']], ['Ich ___ Mathe nicht. (mögen)', ['mochte']], ['Sie ___ Englisch und Spanisch. (lernen)', ['lernte']], ['Du ___ viel. (lernen)', ['lerntest']], ['Ihr ___ an mich. (denken)', ['dachtet']], ['Ich ___ die Antwort nicht. (wissen)', ['wusste']]]
  });
  G('g_b1_praet_irr', {
    title: 'Präteritum dos verbos irregulares', explain: 'Irregulares mudam a vogal e <b>não</b> levam -te. ich e er não têm terminação: ich <b>ging</b>, er <b>ging</b>, wir <b>gingen</b>.<br>Frequentes: gehen → <b>ging</b> · kommen → <b>kam</b> · sehen → <b>sah</b> · finden → <b>fand</b> · geben → <b>gab</b> · nehmen → <b>nahm</b> · beginnen → <b>begann</b> · schreiben → <b>schrieb</b> · bleiben → <b>blieb</b> · fahren → <b>fuhr</b> · sprechen → <b>sprach</b> · bekommen → <b>bekam</b>.',
    compare: 'Como “ir → fui”, “ver → vi”: memorize em trio: gehen – ging – gegangen.',
    examples: [['Sie kam um acht und ging um zehn.', 'Ela chegou às oito e foi embora às dez.'], ['Wir fuhren mit dem Zug nach Wien.', 'Fomos de trem para Viena.']],
    drills: [['Er ___ nach Hause. (gehen)', ['ging']], ['Wir ___ spät. (kommen)', ['kamen']], ['Ich ___ einen Brief. (schreiben)', ['schrieb']], ['Sie ___ nach München. (fahren)', ['fuhr']], ['Der Kurs ___ um neun. (beginnen)', ['begann']], ['Du ___ den Film. (sehen)', ['sahst']], ['Er ___ eine gute Note. (bekommen)', ['bekam']]]
  });

  /* ======================= B1-U3 Zusammenleben ======================= */
  unit('B1-U3', {
    title: 'Zusammenleben', subtitle: 'Opiniões, conselhos e desejos',
    goals: ['Dar e pedir conselhos', 'Expressar desejos e hipóteses (Konjunktiv II)', 'Concordar, discordar e propor soluções'],
    dialog: [['A', 'Mein Mitbewohner räumt nie auf. Was würdest du machen?'], ['B', 'An deiner Stelle würde ich ehrlich mit ihm reden.'], ['A', 'Das habe ich schon versucht. Es ist ihm egal.'], ['B', 'Vielleicht könntet ihr einen Putzplan machen.'], ['A', 'Gute Idee! Wenn er sich daran halten würde, wäre alles einfacher.'], ['B', 'Und wenn nicht, solltest du eine neue Wohnung suchen.']],
    dialogPt: 'Uma pessoa pede conselho sobre um colega de apartamento desorganizado.',
    listening: ['An deiner Stelle würde ich mit ihr reden.', 'Wenn ich mehr Zeit hätte, würde ich Sport machen.', 'Könnten Sie mir bitte helfen?', 'Du solltest dich entschuldigen.', 'Ich bin anderer Meinung.'],
    writing: 'Um amigo escreveu que tem problemas com o colega de apartamento. Responda com 3 conselhos (an deiner Stelle…, du solltest…, wenn ich du wäre…).',
    speaking: { scene: 'Reunião de moradores: vocês precisam decidir regras de convivência.', persona: 'Clara, moradora, informal (du), gosta de discutir', goals: ['dar a sua opinião', 'discordar com educação', 'fazer uma proposta com würde/könnte', 'chegar a um acordo'] },
    criteria: 'Critérios padrão; Konjunktiv II ≥ 80%.'
  });
  N([
    ['gesellschaft', 'die', 'Gesellschaft', 'Gesellschaften', 'a sociedade', 'ɡəˈzɛlʃaft', 'Die Gesellschaft verändert sich.', 'A sociedade está mudando.'],
    ['vorurteil', 'das', 'Vorurteil', 'Vorurteile', 'o preconceito', 'ˈfoːɐ̯ˌʔʊʁtaɪ̯l', 'Wir sollten keine Vorurteile haben.', 'Não deveríamos ter preconceitos.'],
    ['ratschlag', 'der', 'Ratschlag', 'Ratschläge', 'o conselho', 'ˈʁaːtʃlaːk', 'Danke für den Ratschlag!', 'Obrigado pelo conselho!'],
    ['meinung', 'die', 'Meinung', 'Meinungen', 'a opinião', 'ˈmaɪ̯nʊŋ', 'Meiner Meinung nach ist das falsch.', 'Na minha opinião, isso está errado.'],
    ['problem', 'das', 'Problem', 'Probleme', 'o problema', 'pʁoˈbleːm', 'Wir haben ein Problem.', 'Temos um problema.'],
    ['loesung', 'die', 'Lösung', 'Lösungen', 'a solução', 'ˈløːzʊŋ', 'Wir finden bestimmt eine Lösung.', 'Com certeza encontramos uma solução.'],
    ['kompromiss', 'der', 'Kompromiss', 'Kompromisse', 'o acordo, o meio-termo', 'kɔmpʁoˈmɪs', 'Wir müssen einen Kompromiss finden.', 'Precisamos encontrar um meio-termo.'],
    ['regel', 'die', 'Regel', 'Regeln', 'a regra', 'ˈʁeːɡl̩', 'Jede WG hat ihre Regeln.', 'Cada república tem suas regras.', 'WG = Wohngemeinschaft (apartamento dividido).'],
    ['verantwortung', 'die', 'Verantwortung', '', 'a responsabilidade', 'fɛɐ̯ˈʔantvɔʁtʊŋ', 'Jeder trägt Verantwortung.', 'Cada um tem responsabilidade.'],
    ['mitbewohner', 'der', 'Mitbewohner', '=', 'o colega de apartamento', 'ˈmɪtbəˌvoːnɐ', 'Mein Mitbewohner kocht sehr gut.', 'Meu colega de apartamento cozinha muito bem.'],
    ['respekt', 'der', 'Respekt', '', 'o respeito', 'ʁeˈspɛkt', 'Respekt ist wichtig im Zusammenleben.', 'Respeito é importante na convivência.'],
    ['hilfe', 'die', 'Hilfe', '', 'a ajuda', 'ˈhɪlfə', 'Brauchst du Hilfe?', 'Você precisa de ajuda?'],
  ]);
  V([
    ['raten', 'raten', 'aconselhar; adivinhar', 'ˈʁaːtn̩', 'rate|rätst|rät|raten|ratet|raten', 'Was rätst du mir?', 'O que você me aconselha?', 'a→ä; pede dativo (mir, dir).'],
    ['empfehlen', 'empfehlen', 'recomendar', 'ɛmˈpfeːlən', 'empfehle|empfiehlst|empfiehlt|empfehlen|empfehlt|empfehlen', 'Ich empfehle dir dieses Buch.', 'Recomendo este livro a você.', 'e→ie.'],
    ['sichaergern', 'sich ärgern', 'irritar-se, ficar bravo', 'zɪç ˈɛʁɡɐn', 'ärgere mich|ärgerst dich|ärgert sich|ärgern uns|ärgert euch|ärgern sich', 'Ich ärgere mich über die Unordnung.', 'Fico irritado com a bagunça.', 'sich ärgern über + acusativo.'],
    ['sichentschuldigen', 'sich entschuldigen', 'desculpar-se', 'zɪç ɛntˈʃʊldɪɡn̩', 'entschuldige mich|entschuldigst dich|entschuldigt sich|entschuldigen uns|entschuldigt euch|entschuldigen sich', 'Er hat sich bei ihr entschuldigt.', 'Ele pediu desculpas a ela.', 'sich entschuldigen bei + pessoa, für + coisa.'],
    ['diskutieren', 'diskutieren', 'discutir, debater', 'dɪskuˈtiːʁən', 'diskutiere|diskutierst|diskutiert|diskutieren|diskutiert|diskutieren', 'Wir diskutieren über die Regeln.', 'Debatemos as regras.', 'Debate de ideias; briga é “streiten”.'],
    ['reden', 'reden', 'conversar, falar', 'ˈʁeːdn̩', 'rede|redest|redet|reden|redet|reden', 'Lass uns morgen darüber reden.', 'Vamos conversar sobre isso amanhã.'],
  ]);
  P([
    ['eigentlich', 'eigentlich', 'na verdade', '', 'word', 'ˈaɪ̯ɡn̩tlɪç'],
    ['unbedingt', 'unbedingt', 'sem falta, com certeza', '', 'word', 'ˈʊnbəˌdɪŋt'],
    ['egal', 'Das ist mir egal.', 'Para mim tanto faz.', ''],
    ['anderermeinung', 'Ich bin anderer Meinung.', 'Eu tenho outra opinião.', ''],
    ['andeinerstelle', 'An deiner Stelle würde ich mit ihm reden.', 'No seu lugar, eu falaria com ele.', ''],
    ['wenndu', 'Wenn ich du wäre, würde ich warten.', 'Se eu fosse você, esperaria.', ''],
    ['waswuerdest', 'Was würdest du machen?', 'O que você faria?', ''],
    ['meinermeinungnach', 'Meiner Meinung nach …', 'Na minha opinião…', 'Verbo logo depois: Meiner Meinung nach ist das …'],
  ]);
  G('g_b1_konj2', {
    title: 'Konjunktiv II: würde, wäre, hätte, könnte, sollte', explain: 'Para desejos, hipóteses, conselhos e pedidos educados.<br>Maioria dos verbos: <b>würde</b> + infinitivo no fim: Ich <b>würde</b> gern reisen. (würde, würdest, würde, würden, würdet, würden)<br>Formas próprias muito usadas: sein → <b>wäre</b> · haben → <b>hätte</b> · können → <b>könnte</b> · müssen → <b>müsste</b> · sollen → <b>sollte</b> (sem trema) · dürfen → <b>dürfte</b>.<br>Conselho: Du <b>solltest</b> … · Pedido educado: <b>Könnten</b> Sie …?',
    compare: 'Equivale ao futuro do pretérito/imperfeito do subjuntivo: “eu faria”, “se eu tivesse”, “você deveria”.',
    examples: [['Ich hätte gern mehr Zeit.', 'Eu gostaria de ter mais tempo.'], ['Das wäre toll!', 'Isso seria ótimo!'], ['Du solltest mehr schlafen.', 'Você deveria dormir mais.']],
    drills: [['Ich ___ gern mehr reisen. (werden → K II)', ['würde']], ['Wenn ich Zeit ___, würde ich kommen. (haben)', ['hätte']], ['Das ___ schön! (sein)', ['wäre']], ['___ Sie mir bitte helfen? (können)', ['Könnten']], ['Du ___ mehr schlafen. (sollen)', ['solltest']], ['Wir ___ gern ein Haus am See. (haben)', ['hätten']], ['Wenn ich du ___, würde ich warten. (sein)', ['wäre']]]
  });
  G('g_b1_konj2_order', {
    title: 'Frases hipotéticas e conselhos', explain: 'Monte as frases. Em “Wenn …, …” a segunda parte começa com o verbo (würde/wäre…).',
    compare: '“Se eu fosse rico, compraria uma casa” = Wenn ich reich wäre, würde ich ein Haus kaufen.',
    examples: [['Wenn ich reich wäre, würde ich ein Haus kaufen.', 'Se eu fosse rico, compraria uma casa.']],
    order: [['Wenn ich reich wäre, würde ich ein Haus kaufen.', 'Se eu fosse rico, compraria uma casa.'], ['An deiner Stelle würde ich mit ihr reden.', 'No seu lugar eu falaria com ela.'], ['Wenn ich mehr Zeit hätte, würde ich Sport machen.', 'Se eu tivesse mais tempo, faria esporte.'], ['Könnten Sie bitte das Fenster schließen?', 'O senhor poderia fechar a janela?'], ['Ich würde gern in Wien leben.', 'Eu gostaria de morar em Viena.']]
  });

  /* ======================= B1-U4 Konsum und Umwelt ======================= */
  unit('B1-U4', {
    title: 'Konsum und Umwelt', subtitle: 'Consumo, reciclagem e meio ambiente',
    goals: ['Falar de hábitos de consumo e de meio ambiente', 'Descrever processos com a voz passiva', 'Argumentar sobre sustentabilidade'],
    dialog: [['A', 'Warum hast du so viele Flaschen in der Tasche?'], ['B', 'Ich bringe sie zum Supermarkt. Auf die Flaschen gibt es Pfand.'], ['A', 'Und was passiert dann mit ihnen?'], ['B', 'Sie werden gereinigt und wieder benutzt.'], ['A', 'Praktisch! In Brasilien wird viel weniger recycelt.'], ['B', 'Hier wird der Müll in vier Tonnen getrennt. Am Anfang war das kompliziert.']],
    dialogPt: 'Conversa sobre garrafas retornáveis e separação do lixo na Alemanha.',
    listening: ['In Deutschland wird der Müll getrennt.', 'Auf die Flasche gibt es fünfundzwanzig Cent Pfand.', 'Die Produkte werden regional produziert.', 'Ich versuche, weniger Plastik zu kaufen.', 'Hier wird viel Energie verbraucht.'],
    writing: 'Escreva um comentário (8–10 frases) para um fórum: o que você faz pelo meio ambiente e o que poderia melhorar. Use a voz passiva pelo menos 2 vezes.',
    speaking: { scene: 'Um colega alemão te explica o sistema de lixo do prédio; você pergunta e compara com o Brasil.', persona: 'Paul, colega de trabalho, informal (du), muito organizado', goals: ['perguntar como o lixo é separado (Passiv)', 'comparar com o Brasil', 'dar sua opinião sobre consumo', 'dizer o que você vai mudar'] },
    criteria: 'Critérios padrão; voz passiva no presente ≥ 80%.'
  });
  N([
    ['umwelt', 'die', 'Umwelt', '', 'o meio ambiente', 'ˈʊmvɛlt', 'Wir müssen die Umwelt schützen.', 'Precisamos proteger o meio ambiente.'],
    ['klimawandel', 'der', 'Klimawandel', '', 'a mudança climática', 'ˈkliːmaˌvandl̩', 'Der Klimawandel ist ein großes Problem.', 'A mudança climática é um grande problema.'],
    ['energie', 'die', 'Energie', 'Energien', 'a energia', 'enɛʁˈɡiː', 'Wir sparen Energie.', 'Economizamos energia.'],
    ['strom', 'der', 'Strom', '', 'a eletricidade, a luz', 'ʃtʁoːm', 'Der Strom ist in Deutschland teuer.', 'A eletricidade é cara na Alemanha.'],
    ['plastik', 'das', 'Plastik', '', 'o plástico', 'ˈplastɪk', 'Ich kaufe Gemüse ohne Plastik.', 'Compro verduras sem plástico.'],
    ['verpackung', 'die', 'Verpackung', 'Verpackungen', 'a embalagem', 'fɛɐ̯ˈpakʊŋ', 'Die Verpackung gehört in den gelben Sack.', 'A embalagem vai no saco amarelo.'],
    ['flasche', 'die', 'Flasche', 'Flaschen', 'a garrafa', 'ˈflaʃə', 'Die Flasche ist leer.', 'A garrafa está vazia.'],
    ['pfand', 'das', 'Pfand', '', 'o depósito (da garrafa retornável)', 'pfant', 'Auf die Dose gibt es Pfand.', 'A lata tem depósito retornável.'],
    ['natur', 'die', 'Natur', '', 'a natureza', 'naˈtuːɐ̯', 'Am Wochenende sind wir gern in der Natur.', 'No fim de semana gostamos de estar na natureza.'],
    ['abfall', 'der', 'Abfall', 'Abfälle', 'o resíduo, o lixo', 'ˈapfal', 'Der Abfall wird abgeholt.', 'O lixo é recolhido.'],
    ['produkt', 'das', 'Produkt', 'Produkte', 'o produto', 'pʁoˈdʊkt', 'Das Produkt kommt aus der Region.', 'O produto é da região.'],
    ['qualitaet', 'die', 'Qualität', 'Qualitäten', 'a qualidade', 'kvaliˈtɛːt', 'Die Qualität ist sehr gut.', 'A qualidade é muito boa.'],
    ['verbraucher', 'der', 'Verbraucher', '=', 'o consumidor', 'fɛɐ̯ˈbʁaʊ̯xɐ', 'Die Verbraucher wollen mehr Informationen.', 'Os consumidores querem mais informações.'],
    ['werbung', 'die', 'Werbung', '', 'a publicidade', 'ˈvɛʁbʊŋ', 'Ich mag keine Werbung.', 'Não gosto de propaganda.'],
  ]);
  V([
    ['sparen', 'sparen', 'economizar, poupar', 'ˈʃpaːʁən', 'spare|sparst|spart|sparen|spart|sparen', 'Wir sparen Wasser und Strom.', 'Economizamos água e luz.'],
    ['schuetzen', 'schützen', 'proteger', 'ˈʃʏtsn̩', 'schütze|schützt|schützt|schützen|schützt|schützen', 'Der Wald muss geschützt werden.', 'A floresta precisa ser protegida.'],
    ['trennen', 'trennen', 'separar', 'ˈtʁɛnən', 'trenne|trennst|trennt|trennen|trennt|trennen', 'Wir trennen den Müll.', 'Separamos o lixo.'],
    ['wegwerfen', 'wegwerfen', 'jogar fora', 'ˈvɛkˌvɛʁfn̩', 'werfe weg|wirfst weg|wirft weg|werfen weg|werft weg|werfen weg', 'Wirf das nicht weg!', 'Não jogue isso fora!', 'e→i; Perfekt: hat weggeworfen.'],
    ['recyceln', 'recyceln', 'reciclar', 'ʁiˈsaɪ̯kl̩n', 'recycle|recycelst|recycelt|recyceln|recycelt|recyceln', 'Glas wird recycelt.', 'O vidro é reciclado.'],
    ['verbrauchen', 'verbrauchen', 'consumir, gastar', 'fɛɐ̯ˈbʁaʊ̯xn̩', 'verbrauche|verbrauchst|verbraucht|verbrauchen|verbraucht|verbrauchen', 'Das Auto verbraucht wenig Benzin.', 'O carro gasta pouca gasolina.'],
    ['produzieren', 'produzieren', 'produzir', 'pʁoduˈtsiːʁən', 'produziere|produzierst|produziert|produzieren|produziert|produzieren', 'Die Firma produziert Möbel.', 'A empresa produz móveis.'],
  ]);
  P([
    ['nachhaltig', 'nachhaltig', 'sustentável', '', 'word', 'ˈnaːxhaltɪç'],
    ['umweltfreundlich', 'umweltfreundlich', 'ecológico', '', 'word', 'ˈʊmvɛltˌfʁɔɪ̯ntlɪç'],
    ['regional', 'regional', 'regional, da região', '', 'word', 'ʁeɡi̯oˈnaːl'],
    ['muellgetrennt', 'Der Müll wird getrennt.', 'O lixo é separado.', 'Voz passiva.'],
    ['pfandgibtes', 'Auf die Flasche gibt es Pfand.', 'A garrafa tem depósito retornável.', ''],
    ['wenigerplastik', 'Ich versuche, weniger Plastik zu kaufen.', 'Tento comprar menos plástico.', ''],
    ['schlechtumwelt', 'Das ist schlecht für die Umwelt.', 'Isso é ruim para o meio ambiente.', ''],
  ]);
  G('g_b1_passiv', {
    title: 'Voz passiva no presente (werden + particípio)', explain: 'Quando o importante é a <b>ação</b>, não quem faz: <b>werden</b> (conjugado, 2ª posição) + <b>particípio II no fim</b>.<br>Der Müll <b>wird</b> getrennt. · Die Flaschen <b>werden</b> recycelt.<br>Quem faz (se importar): <b>von</b> + dativo: Das Paket wird <b>von der</b> Post gebracht.<br>Sem sujeito: Hier <b>wird</b> nicht geraucht. (Aqui não se fuma.)',
    compare: 'Como “o lixo é separado” ou “separa-se o lixo”. Em alemão o auxiliar é werden, não sein.',
    examples: [['Das Brot wird jeden Morgen gebacken.', 'O pão é assado toda manhã.'], ['Die Häuser werden von einer Firma gebaut.', 'As casas são construídas por uma empresa.']],
    drills: [['Der Müll ___ getrennt.', ['wird']], ['Die Flaschen ___ recycelt.', ['werden']], ['Hier ___ nicht geraucht.', ['wird']], ['Das Brot wird hier ___. (backen)', ['gebacken']], ['Die Produkte werden in Deutschland ___. (produzieren)', ['produziert']], ['Das Paket wird ___ der Post gebracht.', ['von']], ['Wie ___ das Wort geschrieben?', ['wird']]]
  });
  G('g_b1_passiv_order', {
    title: 'Montar frases na voz passiva', explain: 'werden na 2ª posição, particípio no fim. Monte as frases.',
    compare: 'O particípio fecha a frase, como o infinitivo com os modais.',
    examples: [['In Deutschland wird der Müll getrennt.', 'Na Alemanha o lixo é separado.']],
    order: [['In Deutschland wird der Müll getrennt.', 'Na Alemanha o lixo é separado.'], ['Die Flaschen werden im Supermarkt zurückgegeben.', 'As garrafas são devolvidas no supermercado.'], ['Hier wird viel Energie verbraucht.', 'Aqui se consome muita energia.'], ['Das Gemüse wird regional produziert.', 'As verduras são produzidas na região.'], ['Die Kinder werden von den Eltern abgeholt.', 'As crianças são buscadas pelos pais.']]
  });

  GF.kitB1 = K;
})(globalThis.GF = globalThis.GF || {});
