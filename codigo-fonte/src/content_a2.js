/* Conteúdo fixo A2 (A2-U1 a A2-U8), escrito e revisado à mão. Frases didáticas para o nível. */
(function (GF) {
  'use strict';
  const K = GF.kit('A2', 'a2');
  const { unit, N, V, P, G } = K;

  /* ======================= A2-U1 Arbeit und Beruf ======================= */
  unit('A2-U1', {
    title: 'Arbeit und Beruf', subtitle: 'Profissão, experiência e justificativas',
    goals: ['Falar da profissão e do local de trabalho', 'Contar sobre o passado profissional (war, hatte, konnte)', 'Justificar com weil'],
    dialog: [['A', 'Was sind Sie von Beruf?'], ['B', 'Ich bin Ingenieur. Ich arbeite bei einer Firma in São Paulo.'], ['A', 'Und was haben Sie früher gemacht?'], ['B', 'Früher war ich Lehrer, aber ich hatte zu wenig Zeit für meine Familie.'], ['A', 'Warum möchten Sie in Deutschland arbeiten?'], ['B', 'Weil ich neue Erfahrungen sammeln möchte.']],
    dialogPt: 'Entrevista sobre profissão, passado e motivação.',
    listening: ['Früher war ich Lehrerin.', 'Ich hatte gestern eine Besprechung.', 'Ich konnte nicht kommen, weil ich krank war.', 'Die Firma sucht einen Ingenieur.', 'Das Gehalt ist nicht schlecht.'],
    writing: 'Apresente-se para uma vaga: profissão, experiência anterior (war/hatte) e por que quer o emprego (weil). 6–8 frases.',
    speaking: { scene: 'Entrevista de emprego por vídeo com uma empresa de Hamburgo.', persona: 'Frau Berg, recursos humanos, formal (Sie)', goals: ['dizer a profissão', 'contar a experiência anterior no passado', 'explicar a motivação com weil', 'perguntar sobre horário ou salário'] },
    criteria: 'Critérios padrão; Präteritum de sein/haben/modais ≥ 80%.'
  });
  N([
    ['beruf', 'der', 'Beruf', 'Berufe', 'a profissão', 'bəˈʁuːf', 'Was sind Sie von Beruf?', 'Qual é a sua profissão?', 'Profissão sem artigo: Ich bin Ingenieur.'],
    ['firma', 'die', 'Firma', 'Firmen', 'a empresa', 'ˈfɪʁma', 'Die Firma hat 200 Mitarbeiter.', 'A empresa tem 200 funcionários.'],
    ['kollege', 'der', 'Kollege', 'Kollegen', 'o colega de trabalho', 'kɔˈleːɡə', 'Mein Kollege hilft mir oft.', 'Meu colega me ajuda muitas vezes.', 'Acusativo/dativo: den/dem Kollegen.'],
    ['kollegin', 'die', 'Kollegin', 'Kolleginnen', 'a colega de trabalho', 'kɔˈleːɡɪn', 'Die Kollegin kommt aus Polen.', 'A colega é da Polônia.'],
    ['chef', 'der', 'Chef', 'Chefs', 'o chefe', 'ʃɛf', 'Der Chef ist heute nicht da.', 'O chefe não está hoje.'],
    ['buero', 'das', 'Büro', 'Büros', 'o escritório', 'byˈʁoː', 'Ich arbeite im Büro.', 'Eu trabalho no escritório.'],
    ['stelle', 'die', 'Stelle', 'Stellen', 'a vaga, o emprego', 'ˈʃtɛlə', 'Ich suche eine neue Stelle.', 'Procuro um novo emprego.'],
    ['gehalt', 'das', 'Gehalt', 'Gehälter', 'o salário (mensal)', 'ɡəˈhalt', 'Das Gehalt ist gut.', 'O salário é bom.'],
    ['bewerbung', 'die', 'Bewerbung', 'Bewerbungen', 'a candidatura', 'bəˈvɛʁbʊŋ', 'Ich schreibe eine Bewerbung.', 'Escrevo uma candidatura.'],
    ['vorstellungsgespraech', 'das', 'Vorstellungsgespräch', 'Vorstellungsgespräche', 'a entrevista de emprego', '', 'Morgen habe ich ein Vorstellungsgespräch.', 'Amanhã tenho uma entrevista de emprego.'],
    ['erfahrung', 'die', 'Erfahrung', 'Erfahrungen', 'a experiência', 'ɛɐ̯ˈfaːʁʊŋ', 'Sie hat viel Erfahrung.', 'Ela tem muita experiência.'],
    ['ausbildung', 'die', 'Ausbildung', 'Ausbildungen', 'a formação profissional', 'ˈaʊ̯sˌbɪldʊŋ', 'Er macht eine Ausbildung als Koch.', 'Ele faz uma formação de cozinheiro.', 'Sistema dual alemão: escola + empresa.'],
    ['studium', 'das', 'Studium', 'Studien', 'o curso superior', 'ˈʃtuːdi̯ʊm', 'Mein Studium hat fünf Jahre gedauert.', 'Minha faculdade durou cinco anos.'],
    ['kunde', 'der', 'Kunde', 'Kunden', 'o cliente', 'ˈkʊndə', 'Der Kunde wartet schon.', 'O cliente já está esperando.'],
    ['besprechung', 'die', 'Besprechung', 'Besprechungen', 'a reunião', 'bəˈʃpʁɛçʊŋ', 'Die Besprechung beginnt um zehn.', 'A reunião começa às dez.'],
  ]);
  V([
    ['verdienen', 'verdienen', 'ganhar (dinheiro)', 'fɛɐ̯ˈdiːnən', 'verdiene|verdienst|verdient|verdienen|verdient|verdienen', 'Sie verdient gut.', 'Ela ganha bem.'],
    ['studieren', 'studieren', 'estudar (na faculdade)', 'ʃtuˈdiːʁən', 'studiere|studierst|studiert|studieren|studiert|studieren', 'Ich habe Informatik studiert.', 'Estudei informática.', 'Perfekt sem ge-: hat studiert.'],
    ['telefonieren', 'telefonieren', 'falar ao telefone', 'telefoˈniːʁən', 'telefoniere|telefonierst|telefoniert|telefonieren|telefoniert|telefonieren', 'Er telefoniert mit einem Kunden.', 'Ele fala ao telefone com um cliente.'],
    ['erledigen', 'erledigen', 'resolver, dar conta de', 'ɛɐ̯ˈleːdɪɡn̩', 'erledige|erledigst|erledigt|erledigen|erledigt|erledigen', 'Ich erledige das sofort.', 'Resolvo isso imediatamente.'],
  ]);
  P([
    ['weil', 'weil', 'porque', 'O verbo vai para o fim: …, weil ich müde bin.', 'word', 'vaɪ̯l'],
    ['frueher', 'früher', 'antigamente, antes', '', 'word', 'ˈfʁyːɐ'],
    ['damals', 'damals', 'naquela época', '', 'word', 'ˈdaːmaːls'],
    ['arbeiteals', 'Ich arbeite als Ingenieur.', 'Trabalho como engenheiro.', 'als + profissão, sem artigo.'],
    ['beieinerfirma', 'Ich arbeite bei einer Firma.', 'Trabalho numa empresa.', 'bei + empresa (dativo).'],
    ['warich', 'Früher war ich Lehrer.', 'Antes eu era professor.', ''],
    ['keinezeitpast', 'Ich hatte keine Zeit.', 'Eu não tinha tempo.', ''],
    ['warum', 'Warum?', 'Por quê?', 'Resposta: Weil …', 'word', 'vaˈʁʊm'],
  ]);
  G('g_a2_praet', {
    title: 'Präteritum de sein, haben e dos modais', explain: 'Na fala, o passado da maioria dos verbos é o Perfekt, mas <b>sein</b>, <b>haben</b> e os <b>modais</b> usam quase sempre o Präteritum:<br><b>sein</b>: ich war, du warst, er war, wir waren, ihr wart, sie waren<br><b>haben</b>: ich hatte, du hattest, er hatte, wir hatten, ihr hattet, sie hatten<br><b>Modais</b> perdem o trema: können → konnte, müssen → musste, dürfen → durfte, wollen → wollte, sollen → sollte (ich/er iguais: ich konnte, er konnte).',
    compare: '“Ich war” cobre “eu era” e “eu estava”; “ich hatte” = “eu tinha/tive”.',
    examples: [['Gestern war ich müde.', 'Ontem eu estava cansado.'], ['Wir hatten keine Zeit.', 'Não tínhamos tempo.'], ['Ich musste lange arbeiten.', 'Tive de trabalhar até tarde.']],
    drills: [['Ich ___ gestern krank. (sein)', ['war']], ['Wir ___ keine Zeit. (haben)', ['hatten']], ['Du ___ müde. (sein)', ['warst']], ['Er ___ einen Termin. (haben)', ['hatte']], ['Ich ___ nicht kommen. (können)', ['konnte']], ['Sie (ela) ___ lange arbeiten. (müssen)', ['musste']], ['Ihr ___ im Büro. (sein)', ['wart']]]
  });
  G('g_a2_weil', {
    title: 'weil: o verbo vai para o fim', explain: 'Em orações com <b>weil</b> (porque), o verbo conjugado vai para o <b>fim</b>: …, weil ich müde <b>bin</b>. Com modal ou Perfekt, o conjugado é o último: …, weil ich arbeiten <b>muss</b> / weil ich viel gearbeitet <b>habe</b>.<br>Monte as frases.',
    compare: 'Português mantém a ordem normal depois de “porque”; o alemão empurra o verbo para o final.',
    examples: [['Ich lerne Deutsch, weil ich in Berlin arbeiten will.', 'Estudo alemão porque quero trabalhar em Berlim.']],
    order: [['Ich bleibe zu Hause, weil ich krank bin.', 'Fico em casa porque estou doente.'], ['Er kommt nicht, weil er arbeiten muss.', 'Ele não vem porque tem de trabalhar.'], ['Ich bin müde, weil ich viel gearbeitet habe.', 'Estou cansado porque trabalhei muito.'], ['Sie lernt Deutsch, weil sie in Wien studieren will.', 'Ela estuda alemão porque quer estudar em Viena.'], ['Wir nehmen den Bus, weil das Auto kaputt ist.', 'Pegamos o ônibus porque o carro está quebrado.']]
  });

  /* ======================= A2-U2 Unterwegs ======================= */
  unit('A2-U2', {
    title: 'Unterwegs', subtitle: 'Viagens, trem, avião e hotel',
    goals: ['Lidar com viagens de trem e avião', 'Dizer onde algo está e para onde se vai (Wo?/Wohin?)', 'Falar de quando aconteceu algo (vor, seit)'],
    dialog: [['A', 'Entschuldigung, von welchem Gleis fährt der Zug nach Leipzig ab?'], ['B', 'Von Gleis sieben. Aber er hat zwanzig Minuten Verspätung.'], ['A', 'Oh nein! Ich muss in Leipzig umsteigen.'], ['B', 'Dann fragen Sie am besten im Reisezentrum.'], ['A', 'Wo ist das Reisezentrum?'], ['B', 'In der Halle, neben dem Café.']],
    dialogPt: 'Na estação: plataforma, atraso e baldeação.',
    listening: ['Der Zug fährt von Gleis drei ab.', 'Wir kommen um acht Uhr in Wien an.', 'Ich habe vor zwei Tagen ein Hotel gebucht.', 'Der Koffer liegt auf dem Bett.', 'Ich fahre in die Stadt.'],
    writing: 'Escreva um e-mail a um hotel: quer reservar um quarto, diga datas, quantas pessoas e pergunte o preço.',
    speaking: { scene: 'Seu trem atrasou e você perdeu a conexão. Você fala no balcão de informações da estação.', persona: 'Herr Wolf, atendente da Deutsche Bahn, formal (Sie)', goals: ['explicar o problema', 'perguntar pelo próximo trem', 'perguntar de qual plataforma sai', 'perguntar quando chega'] },
    criteria: 'Critérios padrão; Wo?/Wohin? (dativo/acusativo) ≥ 80%.'
  });
  N([
    ['koffer', 'der', 'Koffer', '=', 'a mala', 'ˈkɔfɐ', 'Mein Koffer ist zu schwer.', 'Minha mala está pesada demais.'],
    ['flughafen', 'der', 'Flughafen', 'Flughäfen', 'o aeroporto', 'ˈfluːkˌhaːfn̩', 'Wir fahren zum Flughafen.', 'Vamos ao aeroporto.'],
    ['flugzeug', 'das', 'Flugzeug', 'Flugzeuge', 'o avião', 'ˈfluːkˌtsɔɪ̯k', 'Das Flugzeug landet um neun.', 'O avião pousa às nove.'],
    ['flug', 'der', 'Flug', 'Flüge', 'o voo', 'fluːk', 'Der Flug dauert elf Stunden.', 'O voo dura onze horas.'],
    ['gleis', 'das', 'Gleis', 'Gleise', 'a plataforma (trilho)', 'ɡlaɪ̯s', 'Der Zug fährt von Gleis vier ab.', 'O trem sai da plataforma quatro.'],
    ['abfahrt', 'die', 'Abfahrt', 'Abfahrten', 'a partida', 'ˈapˌfaːɐ̯t', 'Die Abfahrt ist um 10:15 Uhr.', 'A partida é às 10h15.'],
    ['ankunft', 'die', 'Ankunft', 'Ankünfte', 'a chegada', 'ˈanˌkʊnft', 'Die Ankunft ist am Abend.', 'A chegada é à noite.'],
    ['verspaetung', 'die', 'Verspätung', 'Verspätungen', 'o atraso', 'fɛɐ̯ˈʃpɛːtʊŋ', 'Der Zug hat Verspätung.', 'O trem está atrasado.'],
    ['hotel', 'das', 'Hotel', 'Hotels', 'o hotel', 'hoˈtɛl', 'Das Hotel liegt im Zentrum.', 'O hotel fica no centro.'],
    ['gepaeck', 'das', 'Gepäck', '', 'a bagagem', 'ɡəˈpɛk', 'Wo kann ich mein Gepäck lassen?', 'Onde posso deixar minha bagagem?'],
    ['pass', 'der', 'Pass', 'Pässe', 'o passaporte', 'pas', 'Vergiss deinen Pass nicht!', 'Não esqueça seu passaporte!'],
    ['grenze', 'die', 'Grenze', 'Grenzen', 'a fronteira', 'ˈɡʁɛntsə', 'Wir sind über die Grenze gefahren.', 'Atravessamos a fronteira.'],
    ['unterkunft', 'die', 'Unterkunft', 'Unterkünfte', 'a hospedagem', 'ˈʊntɐˌkʊnft', 'Wir suchen eine billige Unterkunft.', 'Procuramos uma hospedagem barata.'],
    ['ticket', 'das', 'Ticket', 'Tickets', 'o bilhete, a passagem', 'ˈtɪkət', 'Ich kaufe das Ticket online.', 'Compro a passagem online.'],
  ]);
  V([
    ['abfahren', 'abfahren', 'partir (veículo)', 'ˈapˌfaːʁən', 'fahre ab|fährst ab|fährt ab|fahren ab|fahrt ab|fahren ab', 'Der Bus fährt um acht ab.', 'O ônibus parte às oito.', 'Perfekt: ist abgefahren.'],
    ['ankommen', 'ankommen', 'chegar', 'ˈanˌkɔmən', 'komme an|kommst an|kommt an|kommen an|kommt an|kommen an', 'Wann kommt der Zug an?', 'Quando o trem chega?', 'Perfekt: ist angekommen.'],
    ['buchen', 'buchen', 'reservar', 'ˈbuːxn̩', 'buche|buchst|bucht|buchen|bucht|buchen', 'Ich habe einen Flug gebucht.', 'Reservei um voo.'],
    ['packen', 'packen', 'fazer a mala, empacotar', 'ˈpakn̩', 'packe|packst|packt|packen|packt|packen', 'Hast du den Koffer schon gepackt?', 'Você já fez a mala?'],
    ['uebernachten', 'übernachten', 'pernoitar', 'yːbɐˈnaxtn̩', 'übernachte|übernachtest|übernachtet|übernachten|übernachtet|übernachten', 'Wir übernachten in einem Hotel.', 'Pernoitamos num hotel.', 'Inseparável: hat übernachtet.'],
    ['verpassen', 'verpassen', 'perder (o horário)', 'fɛɐ̯ˈpasn̩', 'verpasse|verpasst|verpasst|verpassen|verpasst|verpassen', 'Ich habe den Zug verpasst.', 'Perdi o trem.'],
  ]);
  P([
    ['puenktlich', 'pünktlich', 'pontual, no horário', '', 'word', 'ˈpʏŋktlɪç'],
    ['unterwegs', 'unterwegs', 'a caminho, viajando', '', 'word', 'ʊntɐˈveːks'],
    ['zwischen', 'zwischen', 'entre', 'Preposição de duas vias.', 'word', 'ˈtsvɪʃn̩'],
    ['hinter', 'hinter', 'atrás de', 'Preposição de duas vias.', 'word', 'ˈhɪntɐ'],
    ['welchesgleis', 'Von welchem Gleis fährt der Zug?', 'De qual plataforma sai o trem?', ''],
    ['verspaetungp', 'Der Zug hat zehn Minuten Verspätung.', 'O trem está dez minutos atrasado.', ''],
    ['zimmergebucht', 'Ich habe ein Zimmer gebucht.', 'Reservei um quarto.', ''],
    ['gutereise', 'Gute Reise!', 'Boa viagem!', ''],
    ['einfachoderhin', 'Einfach oder hin und zurück?', 'Só ida ou ida e volta?', 'Pergunta na compra de passagem.'],
  ]);
  G('g_a2_wechsel', {
    title: 'Preposições de duas vias: Wo? (dativo) × Wohin? (acusativo)', explain: '<b>in, an, auf, über, unter, vor, hinter, neben, zwischen</b> usam:<br>• <b>dativo</b> para lugar (pergunta <b>Wo?</b>): Ich bin <b>in der</b> Stadt.<br>• <b>acusativo</b> para direção/movimento (pergunta <b>Wohin?</b>): Ich fahre <b>in die</b> Stadt.<br>Contrações: in dem → <b>im</b>, in das → <b>ins</b>, an dem → <b>am</b>, an das → <b>ans</b>.',
    compare: 'Português usa “em” para os dois casos (“estou na cidade / vou à cidade” mudam pouco). Em alemão, a diferença aparece no artigo.',
    examples: [['Wir fahren ans Meer.', 'Vamos para o mar.'], ['Wir sind am Meer.', 'Estamos no mar (na praia).'], ['Ich gehe ins Hotel.', 'Vou para o hotel.']],
    drills: [['Ich fahre in ___ Stadt. (Wohin? die)', ['die']], ['Ich wohne in ___ Stadt. (Wo? die)', ['der']], ['Wir gehen ___ Hotel. (Wohin? in + das)', ['ins']], ['Wir sind ___ Hotel. (Wo? in + dem)', ['im']], ['Der Koffer liegt auf ___ Bett. (das)', ['dem']], ['Ich lege den Pass auf ___ Tisch. (der)', ['den']], ['Er wartet vor ___ Bahnhof. (der)', ['dem']]]
  });
  G('g_a2_vorseit', {
    title: 'Tempo: vor (há…) e seit (desde, há…)', explain: '<b>vor</b> + dativo = há (algo terminou): <b>vor</b> zwei Tagen (há dois dias), <b>vor</b> einer Woche.<br><b>seit</b> + dativo = desde/há (algo continua até agora), com verbo no <b>presente</b>: Ich wohne <b>seit</b> drei Jahren hier.<br>Dativo plural ganha -n: Jahren, Tagen.',
    compare: 'Português usa “há” para os dois. Em alemão: terminou → vor; continua → seit + presente (não Perfekt!).',
    examples: [['Ich bin vor einer Woche angekommen.', 'Cheguei há uma semana.'], ['Ich lerne seit einem Monat Deutsch.', 'Estudo alemão há um mês.']],
    drills: [['Ich bin ___ zwei Tagen angekommen. (há)', ['vor']], ['Ich wohne ___ drei Jahren hier. (desde/há)', ['seit']], ['Der Zug ist ___ zehn Minuten abgefahren.', ['vor']], ['Ich lerne ___ einem Monat Deutsch.', ['seit']], ['Wir waren ___ einem Jahr in Wien.', ['vor']], ['Sie arbeitet ___ Januar bei der Firma.', ['seit']]]
  });

  /* ======================= A2-U3 Beim Arzt ======================= */
  unit('A2-U3', {
    title: 'Beim Arzt', subtitle: 'Sintomas, consulta e conselhos',
    goals: ['Descrever sintomas com mais detalhe', 'Usar verbos reflexivos (sich fühlen, sich erkälten)', 'Relatar o que alguém disse com dass'],
    dialog: [['A', 'Wie fühlen Sie sich heute?'], ['B', 'Nicht gut. Ich glaube, dass ich mich erkältet habe.'], ['A', 'Haben Sie Fieber?'], ['B', 'Ja, seit gestern. Und ich huste viel.'], ['A', 'Ich schreibe Sie drei Tage krank. Ruhen Sie sich gut aus.'], ['B', 'Danke. Brauche ich ein Rezept?']],
    dialogPt: 'Consulta: sintomas, atestado e descanso.',
    listening: ['Ich fühle mich nicht gut.', 'Ich habe mich erkältet.', 'Der Arzt sagt, dass ich im Bett bleiben soll.', 'Haben Sie eine Allergie?', 'Ruh dich gut aus!'],
    writing: 'Escreva a um colega: você está doente, o que tem, o que o médico disse (dass) e quando volta.',
    speaking: { scene: 'Consulta com uma clínica geral em Frankfurt.', persona: 'Dr. Schulz, médica, formal (Sie)', goals: ['descrever os sintomas', 'dizer desde quando', 'responder sobre alergias', 'perguntar sobre remédio e atestado'] },
    criteria: 'Critérios padrão; pronomes reflexivos ≥ 80%.'
  });
  N([
    ['krankheit', 'die', 'Krankheit', 'Krankheiten', 'a doença', 'ˈkʁaŋkhaɪ̯t', 'Die Krankheit ist nicht gefährlich.', 'A doença não é perigosa.'],
    ['erkaeltung', 'die', 'Erkältung', 'Erkältungen', 'o resfriado', 'ɛɐ̯ˈkɛltʊŋ', 'Ich habe eine Erkältung.', 'Estou resfriado.'],
    ['husten', 'der', 'Husten', '', 'a tosse', 'ˈhuːstn̩', 'Der Husten ist schlimm.', 'A tosse está forte.'],
    ['schnupfen', 'der', 'Schnupfen', '', 'a coriza', 'ˈʃnʊpfn̩', 'Ich habe Schnupfen.', 'Estou com coriza.'],
    ['grippe', 'die', 'Grippe', '', 'a gripe', 'ˈɡʁɪpə', 'Er hat die Grippe.', 'Ele está com gripe.'],
    ['schmerz', 'der', 'Schmerz', 'Schmerzen', 'a dor', 'ʃmɛʁts', 'Die Schmerzen sind stark.', 'As dores estão fortes.', 'Mais usado no plural.'],
    ['medikament', 'das', 'Medikament', 'Medikamente', 'o medicamento', 'medikaˈmɛnt', 'Nehmen Sie das Medikament nach dem Essen.', 'Tome o remédio depois de comer.'],
    ['rezept', 'das', 'Rezept', 'Rezepte', 'a receita (médica ou culinária)', 'ʁeˈtsɛpt', 'Für das Medikament brauchen Sie ein Rezept.', 'Para o remédio o senhor precisa de receita.'],
    ['krankenhaus', 'das', 'Krankenhaus', 'Krankenhäuser', 'o hospital', 'ˈkʁaŋkn̩ˌhaʊ̯s', 'Sie liegt im Krankenhaus.', 'Ela está internada no hospital.'],
    ['notfall', 'der', 'Notfall', 'Notfälle', 'a emergência', 'ˈnoːtˌfal', 'Im Notfall rufen Sie die 112.', 'Em emergência, ligue 112.', '112 = emergência na Europa.'],
    ['allergie', 'die', 'Allergie', 'Allergien', 'a alergia', 'alɛʁˈɡiː', 'Ich habe eine Allergie gegen Nüsse.', 'Tenho alergia a nozes.'],
    ['untersuchung', 'die', 'Untersuchung', 'Untersuchungen', 'o exame médico', 'ʊntɐˈzuːxʊŋ', 'Die Untersuchung dauert nicht lange.', 'O exame não demora.'],
    ['versicherung', 'die', 'Versicherung', 'Versicherungen', 'o seguro', 'fɛɐ̯ˈzɪçəʁʊŋ', 'Die Versicherung bezahlt das.', 'O seguro paga isso.', 'Seguro-saúde: die Krankenversicherung.'],
  ]);
  V([
    ['sichfuehlen', 'sich fühlen', 'sentir-se', 'zɪç ˈfyːlən', 'fühle mich|fühlst dich|fühlt sich|fühlen uns|fühlt euch|fühlen sich', 'Ich fühle mich heute besser.', 'Hoje me sinto melhor.', 'Reflexivo.'],
    ['sichausruhen', 'sich ausruhen', 'descansar', 'zɪç ˈaʊ̯sˌʁuːən', 'ruhe mich aus|ruhst dich aus|ruht sich aus|ruhen uns aus|ruht euch aus|ruhen sich aus', 'Am Wochenende ruhe ich mich aus.', 'No fim de semana eu descanso.', 'Reflexivo e separável.'],
    ['sicherkaelten', 'sich erkälten', 'resfriar-se', 'zɪç ɛɐ̯ˈkɛltn̩', 'erkälte mich|erkältest dich|erkältet sich|erkälten uns|erkältet euch|erkälten sich', 'Ich habe mich erkältet.', 'Eu me resfriei.'],
    ['sichbeeilen', 'sich beeilen', 'apressar-se', 'zɪç bəˈʔaɪ̯lən', 'beeile mich|beeilst dich|beeilt sich|beeilen uns|beeilt euch|beeilen sich', 'Beeil dich, der Bus kommt!', 'Apresse-se, o ônibus está vindo!'],
    ['untersuchen', 'untersuchen', 'examinar', 'ʊntɐˈzuːxn̩', 'untersuche|untersuchst|untersucht|untersuchen|untersucht|untersuchen', 'Die Ärztin untersucht den Patienten.', 'A médica examina o paciente.'],
    ['hustenv', 'husten', 'tossir', 'ˈhuːstn̩', 'huste|hustest|hustet|husten|hustet|husten', 'Das Kind hustet die ganze Nacht.', 'A criança tosse a noite toda.'],
  ]);
  P([
    ['schlimm', 'schlimm', 'grave, ruim', '', 'word', 'ʃlɪm'],
    ['wichtig', 'wichtig', 'importante', '', 'word', 'ˈvɪçtɪç'],
    ['besser', 'besser', 'melhor', 'Comparativo de gut.', 'word', 'ˈbɛsɐ'],
    ['wiefuehlen', 'Wie fühlen Sie sich?', 'Como o senhor se sente?', ''],
    ['fuehlemichnicht', 'Ich fühle mich nicht gut.', 'Não me sinto bem.', ''],
    ['erkaeltetp', 'Ich habe mich erkältet.', 'Eu me resfriei.', ''],
    ['krankschreibung', 'Ich brauche eine Krankschreibung.', 'Preciso de um atestado médico.', 'O atestado para o trabalho.'],
    ['gutebesserungdir', 'Ruh dich gut aus!', 'Descanse bem!', ''],
  ]);
  G('g_a2_reflexiv', {
    title: 'Verbos reflexivos', explain: 'Alguns verbos vêm com pronome reflexivo (“se”): <b>sich</b> fühlen.<br>ich fühle <b>mich</b> · du fühlst <b>dich</b> · er/sie fühlt <b>sich</b> · wir fühlen <b>uns</b> · ihr fühlt <b>euch</b> · sie/Sie fühlen <b>sich</b>.<br>No Perfekt, usam <b>haben</b>: Ich habe <b>mich</b> erkältet.',
    compare: 'Parecido com “eu me sinto, você se sente”. Mas nem sempre coincide: “sich ausruhen” = “descansar” (sem “se” em português).',
    examples: [['Wie fühlst du dich?', 'Como você se sente?'], ['Wir haben uns beeilt.', 'Nós nos apressamos.']],
    drills: [['Ich fühle ___ nicht gut.', ['mich']], ['Wie fühlst du ___?', ['dich']], ['Er hat ___ erkältet.', ['sich']], ['Wir ruhen ___ aus.', ['uns']], ['Ihr müsst ___ beeilen.', ['euch']], ['Wie fühlen Sie ___?', ['sich']]]
  });
  G('g_a2_dass', {
    title: 'dass: “que” com verbo no fim', explain: 'Depois de <b>dass</b>, o verbo conjugado vai para o <b>fim</b>: Ich glaube, dass ich Fieber <b>habe</b>.<br>Comum depois de: glauben, denken, wissen, hoffen, sagen, es ist gut/wichtig.<br>Monte as frases.',
    compare: 'Igual ao “que” do português (“acho que…”), mas com o verbo no final.',
    examples: [['Der Arzt sagt, dass ich viel trinken soll.', 'O médico diz que devo beber muito.']],
    order: [['Ich glaube, dass ich Fieber habe.', 'Acho que estou com febre.'], ['Der Arzt sagt, dass ich im Bett bleiben soll.', 'O médico diz que devo ficar de cama.'], ['Ich weiß, dass Sport wichtig ist.', 'Sei que esporte é importante.'], ['Es ist gut, dass du zum Arzt gehst.', 'É bom que você vá ao médico.'], ['Sie hofft, dass es ihr bald besser geht.', 'Ela espera melhorar logo.']]
  });

  /* ======================= A2-U4 Feste feiern ======================= */
  unit('A2-U4', {
    title: 'Feste feiern', subtitle: 'Festas, datas e presentes',
    goals: ['Dizer datas e aniversários', 'Convidar, parabenizar e agradecer', 'Dizer para quem é o presente (dativo)'],
    dialog: [['A', 'Wann hast du Geburtstag?'], ['B', 'Am dritten Mai. Ich mache eine kleine Party.'], ['A', 'Schön! Was wünschst du dir?'], ['B', 'Nichts Besonderes. Wenn du kommst, freue ich mich.'], ['A', 'Natürlich komme ich! Danke für die Einladung.'], ['B', 'Gern. Bring einfach gute Laune mit!']],
    dialogPt: 'Convite para uma festa de aniversário.',
    listening: ['Ich habe am ersten Juni Geburtstag.', 'Herzlichen Glückwunsch!', 'Ich schenke meiner Mutter Blumen.', 'Wenn ich Zeit habe, komme ich.', 'Danke für die Einladung!'],
    writing: 'Escreva um convite para sua festa: motivo, data (por extenso), hora, lugar, e peça resposta.',
    speaking: { scene: 'Uma amiga alemã convida você para o casamento dela.', persona: 'Lena, amiga, informal (du), animada', goals: ['parabenizar', 'perguntar data e lugar', 'perguntar o que dar de presente', 'confirmar presença com wenn'] },
    criteria: 'Critérios padrão; ordinais/datas e dativo ≥ 80%.'
  });
  N([
    ['fest', 'das', 'Fest', 'Feste', 'a festa (tradicional)', 'fɛst', 'Das Fest beginnt am Nachmittag.', 'A festa começa à tarde.'],
    ['feier', 'die', 'Feier', 'Feiern', 'a comemoração', 'ˈfaɪ̯ɐ', 'Die Feier war sehr schön.', 'A comemoração foi muito bonita.'],
    ['geburtstag', 'der', 'Geburtstag', 'Geburtstage', 'o aniversário', 'ɡəˈbuːɐ̯tsˌtaːk', 'Heute ist mein Geburtstag.', 'Hoje é meu aniversário.'],
    ['geschenk', 'das', 'Geschenk', 'Geschenke', 'o presente', 'ɡəˈʃɛŋk', 'Das Geschenk ist für dich.', 'O presente é para você.'],
    ['einladung', 'die', 'Einladung', 'Einladungen', 'o convite', 'ˈaɪ̯nˌlaːdʊŋ', 'Danke für die Einladung!', 'Obrigado pelo convite!'],
    ['gast', 'der', 'Gast', 'Gäste', 'o convidado, o hóspede', 'ɡast', 'Wir haben zwanzig Gäste.', 'Temos vinte convidados.'],
    ['hochzeit', 'die', 'Hochzeit', 'Hochzeiten', 'o casamento (festa)', 'ˈhɔxˌtsaɪ̯t', 'Die Hochzeit ist im August.', 'O casamento é em agosto.'],
    ['kerze', 'die', 'Kerze', 'Kerzen', 'a vela', 'ˈkɛʁtsə', 'Auf dem Kuchen sind dreißig Kerzen.', 'No bolo há trinta velas.'],
    ['blume', 'die', 'Blume', 'Blumen', 'a flor', 'ˈbluːmə', 'Ich bringe Blumen mit.', 'Eu levo flores.'],
    ['datum', 'das', 'Datum', 'Daten', 'a data', 'ˈdaːtʊm', 'Welches Datum ist heute?', 'Que data é hoje?'],
    ['monat', 'der', 'Monat', 'Monate', 'o mês', 'ˈmoːnat', 'Der Mai ist mein Lieblingsmonat.', 'Maio é meu mês favorito.', 'Meses (todos der): Januar, Februar, März, April, Mai, Juni, Juli, August, September, Oktober, November, Dezember.'],
    ['feiertag', 'der', 'Feiertag', 'Feiertage', 'o feriado', 'ˈfaɪ̯ɐˌtaːk', 'Morgen ist ein Feiertag.', 'Amanhã é feriado.'],
    ['laune', 'die', 'Laune', 'Launen', 'o humor (estado de espírito)', 'ˈlaʊ̯nə', 'Sie hat heute gute Laune.', 'Ela está de bom humor hoje.'],
  ]);
  V([
    ['feiern', 'feiern', 'comemorar', 'ˈfaɪ̯ɐn', 'feiere|feierst|feiert|feiern|feiert|feiern', 'Wir feiern am Samstag.', 'Comemoramos no sábado.', 'ich feiere (com -e-).'],
    ['schenken', 'schenken', 'dar de presente', 'ˈʃɛŋkn̩', 'schenke|schenkst|schenkt|schenken|schenkt|schenken', 'Was schenkst du deinem Vater?', 'O que você vai dar ao seu pai?', 'Pessoa no dativo, coisa no acusativo.'],
    ['einladen', 'einladen', 'convidar', 'ˈaɪ̯nˌlaːdn̩', 'lade ein|lädst ein|lädt ein|laden ein|ladet ein|laden ein', 'Ich lade dich zu meiner Party ein.', 'Eu te convido para a minha festa.', 'a→ä; separável.'],
    ['gratulieren', 'gratulieren', 'parabenizar', 'ɡʁatuˈliːʁən', 'gratuliere|gratulierst|gratuliert|gratulieren|gratuliert|gratulieren', 'Ich gratuliere dir zum Geburtstag.', 'Parabéns pelo seu aniversário.', 'Pessoa no dativo: dir, ihm.'],
    ['geben', 'geben', 'dar', 'ˈɡeːbn̩', 'gebe|gibst|gibt|geben|gebt|geben', 'Sie gibt mir ein Geschenk.', 'Ela me dá um presente.', 'e→i.'],
    ['sichfreuen', 'sich freuen', 'alegrar-se', 'zɪç ˈfʁɔɪ̯ən', 'freue mich|freust dich|freut sich|freuen uns|freut euch|freuen sich', 'Ich freue mich auf die Party.', 'Estou ansioso pela festa.', 'auf + futuro; über + presente/passado.'],
  ]);
  P([
    ['herzlichen', 'Herzlichen Glückwunsch zum Geburtstag!', 'Feliz aniversário!', ''],
    ['wanngeburtstag', 'Wann hast du Geburtstag?', 'Quando é seu aniversário?', ''],
    ['amdritten', 'Ich habe am dritten Mai Geburtstag.', 'Faço aniversário em 3 de maio.', 'am + ordinal com -en.'],
    ['frohe', 'Frohe Weihnachten!', 'Feliz Natal!', ''],
    ['neuesjahr', 'Frohes neues Jahr!', 'Feliz Ano Novo!', ''],
    ['dankeeinladung', 'Danke für die Einladung!', 'Obrigado pelo convite!', ''],
    ['wenn', 'wenn', 'quando, se (condição)', 'Verbo no fim: wenn ich Zeit habe.', 'word', 'vɛn'],
  ]);
  G('g_a2_datum', {
    title: 'Números ordinais e datas', explain: 'Ordinais: 1º <b>erste</b>, 2º <b>zweite</b>, 3º <b>dritte</b>, 4º vierte, 5º fünfte, 6º sechste, 7º <b>siebte</b>, 8º <b>achte</b>… até 19: número + <b>-te</b>. De 20 em diante: + <b>-ste</b> (zwanzigste, einunddreißigste).<br>“Hoje é dia 3”: Heute ist <b>der dritte</b>. “No dia 3”: <b>am dritten</b> (am + -en). Escrito: 3.5. = der dritte Mai.',
    compare: 'Português usa número cardinal na data (“3 de maio”); alemão usa ordinal (“o terceiro de maio”).',
    examples: [['Heute ist der erste Mai.', 'Hoje é primeiro de maio.'], ['Am vierundzwanzigsten Dezember feiern wir.', 'No dia 24 de dezembro comemoramos.']],
    drills: [['Heute ist der ___ Mai. (1.)', ['erste']], ['Ich habe am ___ Juni Geburtstag. (3.)', ['dritten']], ['Wir feiern am ___ Juli. (7.)', ['siebten']], ['Der ___ Oktober ist ein Feiertag. (3.)', ['dritte']], ['Am ___ Januar ist Neujahr. (1.)', ['ersten']], ['Heute ist der ___ März. (20.)', ['zwanzigste']]]
  });
  G('g_a2_dativobj', {
    title: 'Dativo: para quem? (objeto indireto)', explain: 'Com <b>geben, schenken, zeigen, bringen, schreiben</b>: a <b>pessoa</b> vai no dativo e a <b>coisa</b> no acusativo: Ich schenke <b>meiner Mutter</b> (dat.) <b>Blumen</b> (acus.).<br>Dativo: dem/einem/meinem (m., n.), der/einer/meiner (f.), den/meinen + -n (pl.).<br>Pronomes no dativo: mir, dir, ihm, ihr, uns, euch, ihnen, Ihnen.<br>Também pedem dativo: helfen, danken, gratulieren, gefallen.',
    compare: 'É o “para/a alguém” do português: “dou flores para minha mãe” = Ich gebe meiner Mutter Blumen.',
    examples: [['Ich gebe dem Kind ein Buch.', 'Dou um livro à criança.'], ['Kannst du mir helfen?', 'Você pode me ajudar?']],
    drills: [['Ich schenke ___ Vater ein Buch. (meu)', ['meinem']], ['Er gibt ___ Mutter Blumen. (sua, dele)', ['seiner']], ['Wir schenken ___ Kindern Spiele. (os)', ['den']], ['Kannst du ___ helfen? (a mim)', ['mir']], ['Ich gratuliere ___ zum Geburtstag. (a ele)', ['ihm']], ['Sie dankt ___ für das Geschenk. (a nós)', ['uns']]]
  });
  G('g_a2_wenn', {
    title: 'wenn: condição e frequência', explain: '<b>wenn</b> = “quando/se” (condição ou repetição). Verbo no <b>fim</b> da oração com wenn. Se a frase começa com wenn, a oração principal começa com o <b>verbo</b>: <b>Wenn</b> ich Zeit habe, <b>komme</b> ich.<br>Monte as frases.',
    compare: '“Se eu tiver tempo, eu vou” — em alemão, depois da vírgula vem primeiro o verbo.',
    examples: [['Wenn es regnet, bleiben wir zu Hause.', 'Se chover, ficamos em casa.']],
    order: [['Wenn ich Zeit habe, komme ich zur Party.', 'Se eu tiver tempo, vou à festa.'], ['Wenn es regnet, feiern wir drinnen.', 'Se chover, comemoramos dentro.'], ['Ich backe einen Kuchen, wenn du Geburtstag hast.', 'Faço um bolo quando você faz aniversário.'], ['Wenn du willst, kannst du Freunde mitbringen.', 'Se quiser, pode trazer amigos.'], ['Wenn das Wetter gut ist, grillen wir.', 'Se o tempo estiver bom, fazemos churrasco.']]
  });

  GF.content_a2_part1 = true;
  GF.kitA2 = K;
})(globalThis.GF = globalThis.GF || {});
