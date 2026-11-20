/* Conteúdo fixo B1 — parte 2 (B1-U5 a B1-U8). */
(function (GF) {
  'use strict';
  const K = GF.kitB1;
  const { unit, N, V, P, G } = K;

  /* ======================= B1-U5 Sport und Gesundheit ======================= */
  unit('B1-U5', {
    title: 'Sport und Gesundheit', subtitle: 'Treino, alimentação e hábitos',
    goals: ['Falar de esporte, alimentação e hábitos saudáveis', 'Usar o genitivo (des/der)', 'Explicar causas e contrastes com wegen, trotz, während'],
    dialog: [['A', 'Kommst du heute zum Training?'], ['B', 'Leider nicht. Wegen meiner Verletzung darf ich zwei Wochen keinen Sport machen.'], ['A', 'Oh, was ist passiert?'], ['B', 'Während des letzten Spiels bin ich gestürzt.'], ['A', 'Gute Besserung! Achtest du jetzt mehr auf deine Ernährung?'], ['B', 'Ja, trotz der Pause will ich fit bleiben. Ich esse mehr Obst und Gemüse.']],
    dialogPt: 'Dois colegas de time falam de uma lesão e de alimentação.',
    listening: ['Wegen des Regens fällt das Training aus.', 'Trotz der Verletzung hat er gespielt.', 'Ich gehe dreimal pro Woche ins Fitnessstudio.', 'Während des Spiels war es sehr laut.', 'Du solltest dich gesünder ernähren.'],
    writing: 'Descreva seus hábitos de saúde (sono, esporte, alimentação) e o que quer mudar. Use wegen, trotz e während pelo menos uma vez cada.',
    speaking: { scene: 'Você conversa com um treinador numa academia sobre um plano de treino.', persona: 'Mehmet, personal trainer, informal (du), motivador', goals: ['explicar seus objetivos', 'falar de um problema de saúde (wegen…)', 'perguntar sobre alimentação', 'combinar um plano semanal'] },
    criteria: 'Critérios padrão; genitivo e preposições com genitivo ≥ 80%.'
  });
  N([
    ['ernaehrung', 'die', 'Ernährung', '', 'a alimentação', 'ɛɐ̯ˈnɛːʁʊŋ', 'Eine gesunde Ernährung ist wichtig.', 'Uma alimentação saudável é importante.'],
    ['training', 'das', 'Training', 'Trainings', 'o treino', 'ˈtʁɛːnɪŋ', 'Das Training beginnt um sieben.', 'O treino começa às sete.'],
    ['verein', 'der', 'Verein', 'Vereine', 'o clube, a associação', 'fɛɐ̯ˈʔaɪ̯n', 'Ich spiele in einem Fußballverein.', 'Jogo num clube de futebol.', 'Muito típico da Alemanha: Sportverein.'],
    ['mannschaft', 'die', 'Mannschaft', 'Mannschaften', 'o time, a equipe', 'ˈmanʃaft', 'Unsere Mannschaft hat gewonnen.', 'Nosso time ganhou.'],
    ['spiel', 'das', 'Spiel', 'Spiele', 'o jogo, a partida', 'ʃpiːl', 'Das Spiel endet unentschieden.', 'O jogo termina empatado.'],
    ['bewegung', 'die', 'Bewegung', 'Bewegungen', 'o movimento, a atividade física', 'bəˈveːɡʊŋ', 'Bewegung ist gut gegen Stress.', 'Atividade física é boa contra o estresse.'],
    ['gewicht', 'das', 'Gewicht', 'Gewichte', 'o peso', 'ɡəˈvɪçt', 'Er achtet auf sein Gewicht.', 'Ele presta atenção ao peso.'],
    ['muskel', 'der', 'Muskel', 'Muskeln', 'o músculo', 'ˈmʊskl̩', 'Nach dem Training tun mir die Muskeln weh.', 'Depois do treino meus músculos doem.'],
    ['verletzung', 'die', 'Verletzung', 'Verletzungen', 'a lesão, o ferimento', 'fɛɐ̯ˈlɛtsʊŋ', 'Die Verletzung ist nicht schlimm.', 'A lesão não é grave.'],
    ['fitnessstudio', 'das', 'Fitnessstudio', 'Fitnessstudios', 'a academia', 'ˈfɪtnəsˌʃtuːdi̯o', 'Das Fitnessstudio ist rund um die Uhr offen.', 'A academia fica aberta 24 horas.'],
    ['schlaf', 'der', 'Schlaf', '', 'o sono', 'ʃlaːf', 'Guter Schlaf ist sehr wichtig.', 'Um bom sono é muito importante.'],
    ['gewohnheit', 'die', 'Gewohnheit', 'Gewohnheiten', 'o hábito', 'ɡəˈvoːnhaɪ̯t', 'Rauchen ist eine schlechte Gewohnheit.', 'Fumar é um mau hábito.'],
    ['stress', 'der', 'Stress', '', 'o estresse', 'ʃtʁɛs', 'Ich habe im Moment viel Stress.', 'No momento estou muito estressado.'],
    ['gemuese', 'das', 'Gemüse', '', 'as verduras, os legumes', 'ɡəˈmyːzə', 'Ich esse jeden Tag Gemüse.', 'Como verduras todos os dias.', 'Singular em alemão.'],
    ['obst', 'das', 'Obst', '', 'as frutas', 'oːpst', 'Obst ist ein guter Snack.', 'Fruta é um bom lanche.', 'Coletivo singular.'],
  ]);
  V([
    ['trainieren', 'trainieren', 'treinar', 'tʁɛˈniːʁən', 'trainiere|trainierst|trainiert|trainieren|trainiert|trainieren', 'Wir trainieren zweimal pro Woche.', 'Treinamos duas vezes por semana.'],
    ['joggen', 'joggen', 'correr (jogging)', 'ˈdʒɔɡn̩', 'jogge|joggst|joggt|joggen|joggt|joggen', 'Sie joggt jeden Morgen im Park.', 'Ela corre toda manhã no parque.'],
    ['sichverletzen', 'sich verletzen', 'machucar-se', 'zɪç fɛɐ̯ˈlɛtsn̩', 'verletze mich|verletzt dich|verletzt sich|verletzen uns|verletzt euch|verletzen sich', 'Er hat sich beim Fußball verletzt.', 'Ele se machucou no futebol.'],
    ['abnehmen', 'abnehmen', 'emagrecer; atender (telefone)', 'ˈapˌneːmən', 'nehme ab|nimmst ab|nimmt ab|nehmen ab|nehmt ab|nehmen ab', 'Ich habe drei Kilo abgenommen.', 'Perdi três quilos.', 'Oposto: zunehmen.'],
    ['sichernaehren', 'sich ernähren', 'alimentar-se', 'zɪç ɛɐ̯ˈnɛːʁən', 'ernähre mich|ernährst dich|ernährt sich|ernähren uns|ernährt euch|ernähren sich', 'Sie ernährt sich vegetarisch.', 'Ela se alimenta de forma vegetariana.'],
    ['achten', 'achten', 'prestar atenção, cuidar', 'ˈaxtn̩', 'achte|achtest|achtet|achten|achtet|achten', 'Achte auf deine Gesundheit!', 'Cuide da sua saúde!', 'achten auf + acusativo.'],
  ]);
  P([
    ['regelmaessig', 'regelmäßig', 'regularmente', '', 'word', 'ˈʁeːɡl̩ˌmɛːsɪç'],
    ['anstrengend', 'anstrengend', 'cansativo, puxado', '', 'word', 'ˈanʃtʁɛŋənt'],
    ['wegen', 'wegen', 'por causa de', '+ genitivo (na fala, às vezes dativo).', 'word', 'ˈveːɡn̩'],
    ['trotz', 'trotz', 'apesar de', '+ genitivo.', 'word', 'tʁɔts'],
    ['waehrend', 'während', 'durante', '+ genitivo.', 'word', 'ˈvɛːʁənt'],
    ['dreimalprowoche', 'Ich gehe dreimal pro Woche ins Fitnessstudio.', 'Vou à academia três vezes por semana.', ''],
    ['faelltaus', 'Das Training fällt aus.', 'O treino foi cancelado.', 'ausfallen = ser cancelado.'],
  ]);
  G('g_b1_genitiv', {
    title: 'O genitivo (de quem? Wessen?)', explain: 'O genitivo indica posse ou relação (“de”):<br>Masculino/neutro: <b>des</b>/eines + substantivo com <b>-s</b> ou <b>-es</b>: das Auto <b>des</b> Trainer<b>s</b>, das Ende <b>des</b> Spiel<b>s</b>.<br>Feminino e plural: <b>der</b>/einer, sem mudar o substantivo: die Meinung <b>der</b> Ärztin.<br>Nomes próprios: <b>Annas</b> Fahrrad (sem apóstrofo).<br>Na fala, muitas vezes se usa <b>von</b> + dativo: das Auto von meinem Bruder.',
    compare: '“O carro do treinador” = das Auto des Trainers. A ordem é igual à do português.',
    examples: [['Das ist das Trikot des Kapitäns.', 'Esta é a camisa do capitão.'], ['Die Farbe der Mannschaft ist Blau.', 'A cor do time é azul.']],
    drills: [['Das ist das Auto ___ Trainers. (o)', ['des']], ['Das Ende ___ Saison ist im Mai. (a, die Saison)', ['der']], ['Der Name ___ Vereins ist lang. (o)', ['des']], ['Die Meinung ___ Ärztin ist wichtig. (a)', ['der']], ['___ Fahrrad ist neu. (de Anna)', ['Annas']], ['Die Spieler ___ Mannschaft sind jung. (a)', ['der']]]
  });
  G('g_b1_wegen', {
    title: 'wegen, trotz, während (+ genitivo)', explain: '<b>wegen</b> = por causa de · <b>trotz</b> = apesar de · <b>während</b> = durante. As três pedem genitivo na escrita: <b>wegen des</b> Regens, <b>trotz der</b> Kälte, <b>während des</b> Spiels.<br>Compare com orações: <b>weil</b> (A2) e <b>obwohl</b> (B1-U7) levam verbo no fim; wegen/trotz levam só um substantivo.',
    compare: '“Por causa da chuva” = wegen des Regens; “porque chove” = weil es regnet.',
    examples: [['Wegen des Regens bleiben wir zu Hause.', 'Por causa da chuva ficamos em casa.'], ['Trotz der Kälte joggen wir.', 'Apesar do frio, corremos.']],
    drills: [['___ des Regens bleiben wir zu Hause. (por causa de)', ['Wegen']], ['___ der Verletzung spielt er. (apesar de)', ['Trotz']], ['___ des Trainings trinke ich Wasser. (durante)', ['Während']], ['Wegen ___ Stresses schläft sie schlecht.', ['des']], ['Trotz ___ Kälte joggen wir.', ['der']], ['Während ___ Spiels war es laut.', ['des']]]
  });

  /* ======================= B1-U6 Reiseerlebnisse ======================= */
  unit('B1-U6', {
    title: 'Reiseerlebnisse', subtitle: 'Contar experiências de viagem',
    goals: ['Narrar uma viagem com detalhes e na ordem certa', 'Usar o Plusquamperfekt', 'Ligar ações com nachdem e bevor'],
    dialog: [['A', 'Wie war eure Wanderung in den Alpen?'], ['B', 'Ein echtes Abenteuer! Nachdem wir zwei Stunden gewandert waren, fing es an zu regnen.'], ['A', 'Oh nein! Was habt ihr gemacht?'], ['B', 'Wir hatten zum Glück Regenjacken eingepackt. Aber dann haben wir uns verlaufen.'], ['A', 'Wie habt ihr den Weg gefunden?'], ['B', 'Ein Bauer aus dem Dorf hat uns geholfen. Bevor es dunkel wurde, waren wir im Hotel.']],
    dialogPt: 'Uma caminhada nos Alpes com chuva e um caminho perdido.',
    listening: ['Nachdem wir angekommen waren, gingen wir essen.', 'Bevor wir losfuhren, packten wir die Koffer.', 'Wir haben uns im Wald verlaufen.', 'Die Aussicht vom Berg war wunderschön.', 'Was ist passiert?'],
    writing: 'Conte uma viagem marcante (10 frases): o que aconteceu, em que ordem, e uma surpresa. Use nachdem + Plusquamperfekt e bevor.',
    speaking: { scene: 'Num encontro de intercâmbio, cada pessoa conta a viagem mais marcante da vida.', persona: 'Jana, estudante de Dresden, informal (du), curiosa', goals: ['dizer para onde viajou e quando', 'contar um problema que aconteceu', 'usar nachdem ou bevor', 'reagir à história dela'] },
    criteria: 'Critérios padrão; Plusquamperfekt e nachdem/bevor ≥ 80%.'
  });
  N([
    ['erlebnis', 'das', 'Erlebnis', 'Erlebnisse', 'a experiência vivida', 'ɛɐ̯ˈleːpnɪs', 'Die Reise war ein tolles Erlebnis.', 'A viagem foi uma experiência incrível.'],
    ['abenteuer', 'das', 'Abenteuer', '=', 'a aventura', 'ˈaːbn̩tɔɪ̯ɐ', 'Die Wanderung war ein Abenteuer.', 'A caminhada foi uma aventura.'],
    ['sehenswuerdigkeit', 'die', 'Sehenswürdigkeit', 'Sehenswürdigkeiten', 'o ponto turístico', 'ˈzeːənsˌvʏʁdɪçkaɪ̯t', 'Der Kölner Dom ist eine berühmte Sehenswürdigkeit.', 'A Catedral de Colônia é um ponto turístico famoso.'],
    ['reisefuehrer', 'der', 'Reiseführer', '=', 'o guia (livro ou pessoa)', 'ˈʁaɪ̯zəˌfyːʁɐ', 'Im Reiseführer steht viel über die Stadt.', 'O guia traz muita coisa sobre a cidade.'],
    ['landschaft', 'die', 'Landschaft', 'Landschaften', 'a paisagem', 'ˈlantʃaft', 'Die Landschaft in Bayern ist wunderschön.', 'A paisagem na Baviera é linda.'],
    ['berg', 'der', 'Berg', 'Berge', 'a montanha', 'bɛʁk', 'Wir sind auf den Berg gestiegen.', 'Subimos a montanha.'],
    ['wald', 'der', 'Wald', 'Wälder', 'a floresta', 'valt', 'Im Wald ist es ruhig.', 'Na floresta é tranquilo.'],
    ['insel', 'die', 'Insel', 'Inseln', 'a ilha', 'ˈɪnzl̩', 'Rügen ist die größte Insel Deutschlands.', 'Rügen é a maior ilha da Alemanha.'],
    ['kueste', 'die', 'Küste', 'Küsten', 'o litoral, a costa', 'ˈkʏstə', 'Wir sind an der Küste entlanggefahren.', 'Fomos pelo litoral.'],
    ['dorf', 'das', 'Dorf', 'Dörfer', 'a aldeia, o vilarejo', 'dɔʁf', 'Das Dorf hat nur 300 Einwohner.', 'O vilarejo tem só 300 habitantes.'],
    ['panne', 'die', 'Panne', 'Pannen', 'a pane (do carro)', 'ˈpanə', 'Mitten auf der Autobahn hatten wir eine Panne.', 'No meio da autoestrada o carro quebrou.'],
    ['aussicht', 'die', 'Aussicht', 'Aussichten', 'a vista (panorâmica)', 'ˈaʊ̯szɪçt', 'Von hier hat man eine tolle Aussicht.', 'Daqui se tem uma vista incrível.'],
    ['wanderung', 'die', 'Wanderung', 'Wanderungen', 'a caminhada, a trilha', 'ˈvandəʁʊŋ', 'Die Wanderung dauerte sechs Stunden.', 'A caminhada durou seis horas.'],
    ['souvenir', 'das', 'Souvenir', 'Souvenirs', 'a lembrancinha', 'zuvəˈniːɐ̯', 'Ich habe ein Souvenir für dich gekauft.', 'Comprei uma lembrancinha para você.'],
  ]);
  V([
    ['erleben', 'erleben', 'vivenciar, viver (uma experiência)', 'ɛɐ̯ˈleːbn̩', 'erlebe|erlebst|erlebt|erleben|erlebt|erleben', 'Wir haben viel erlebt.', 'Vivemos muita coisa.'],
    ['besichtigen', 'besichtigen', 'visitar (um lugar), conhecer', 'bəˈzɪçtɪɡn̩', 'besichtige|besichtigst|besichtigt|besichtigen|besichtigt|besichtigen', 'Wir besichtigten das Schloss.', 'Visitamos o castelo.'],
    ['wandern', 'wandern', 'fazer caminhada/trilha', 'ˈvandɐn', 'wandere|wanderst|wandert|wandern|wandert|wandern', 'Am Wochenende wandern wir gern.', 'No fim de semana gostamos de fazer trilha.', 'Perfekt: ist gewandert.'],
    ['sichverlaufen', 'sich verlaufen', 'perder-se (a pé)', 'zɪç fɛɐ̯ˈlaʊ̯fn̩', 'verlaufe mich|verläufst dich|verläuft sich|verlaufen uns|verlauft euch|verlaufen sich', 'Wir haben uns in der Altstadt verlaufen.', 'Nós nos perdemos no centro histórico.', 'De carro: sich verfahren.'],
    ['erzaehlen', 'erzählen', 'contar (história)', 'ɛɐ̯ˈtsɛːlən', 'erzähle|erzählst|erzählt|erzählen|erzählt|erzählen', 'Erzähl mir von deiner Reise!', 'Me conta da sua viagem!'],
    ['passieren', 'passieren', 'acontecer', 'paˈsiːʁən', 'passiere|passierst|passiert|passieren|passiert|passieren', 'Was ist passiert?', 'O que aconteceu?', 'Quase sempre na 3ª pessoa; Perfekt com sein.'],
  ]);
  P([
    ['ploetzlich', 'plötzlich', 'de repente', '', 'word', 'ˈplœtslɪç'],
    ['beeindruckend', 'beeindruckend', 'impressionante', '', 'word', 'bəˈʔaɪ̯ndʁʊkn̩t'],
    ['nachdem', 'nachdem', 'depois que', 'Verbo no fim; tempo anterior (Plusquamperfekt).', 'word', 'naːxˈdeːm'],
    ['bevor', 'bevor', 'antes que, antes de', 'Verbo no fim.', 'word', 'bəˈfoːɐ̯'],
    ['wasistpassiert', 'Was ist passiert?', 'O que aconteceu?', ''],
    ['echtesabenteuer', 'Das war ein echtes Abenteuer!', 'Foi uma verdadeira aventura!', ''],
    ['zumglueck', 'zum Glück', 'por sorte, felizmente', 'Oposto: leider.'],
  ]);
  G('g_b1_plusquam', {
    title: 'Plusquamperfekt: o passado do passado', explain: 'Para uma ação que aconteceu <b>antes</b> de outra no passado: <b>hatte/war</b> (Präteritum) + <b>particípio II</b>.<br>Als ich ankam, <b>war</b> der Zug schon <b>abgefahren</b>. · Wir <b>hatten</b> vorher ein Hotel <b>gebucht</b>.<br>Escolha hatte ou war como no Perfekt (sein para movimento/mudança e bleiben).',
    compare: 'É o “mais-que-perfeito”: “o trem já tinha partido”.',
    examples: [['Sie hatte den Weg vergessen.', 'Ela tinha esquecido o caminho.'], ['Wir waren noch nie so hoch gewandert.', 'Nunca tínhamos caminhado tão alto.']],
    drills: [['Als ich ankam, ___ der Zug schon abgefahren.', ['war']], ['Wir ___ vorher ein Hotel gebucht.', ['hatten']], ['Sie ___ den Weg vergessen.', ['hatte']], ['Ich ___ noch nie so hoch gewandert.', ['war']], ['Nachdem er gegessen ___, ging er schlafen.', ['hatte']], ['Ihr ___ schon alles gepackt.', ['hattet']]]
  });
  G('g_b1_nachdem', {
    title: 'nachdem e bevor', explain: '<b>nachdem</b> (depois que) e <b>bevor</b> (antes que) mandam o verbo para o <b>fim</b>.<br>Com <b>nachdem</b>, a ação da oração subordinada é anterior: Plusquamperfekt + Präteritum (ou Perfekt + presente): Nachdem wir gefrühstückt <b>hatten</b>, <b>gingen</b> wir los.<br>Se a frase começa com a subordinada, a principal começa com o verbo.',
    compare: '“Depois que tínhamos tomado café, saímos.” Em português dizemos mais “depois de tomar café”.',
    examples: [['Bevor wir losfuhren, packten wir.', 'Antes de partir, fizemos as malas.']],
    order: [['Nachdem wir gefrühstückt hatten, gingen wir wandern.', 'Depois de tomar café, fomos fazer trilha.'], ['Bevor wir losfuhren, packten wir die Koffer.', 'Antes de partir, fizemos as malas.'], ['Wir besichtigten die Stadt, nachdem wir angekommen waren.', 'Visitamos a cidade depois que chegamos.'], ['Bevor du fährst, musst du den Pass suchen.', 'Antes de ir, você precisa procurar o passaporte.'], ['Nachdem sie das Museum besichtigt hatte, kaufte sie Souvenirs.', 'Depois de visitar o museu, ela comprou lembrancinhas.']]
  });

  /* ======================= B1-U7 Arbeitswelt ======================= */
  unit('B1-U7', {
    title: 'Arbeitswelt', subtitle: 'Contrato, equipe e negociação',
    goals: ['Falar de condições de trabalho e contratos', 'Contrastar ideias com obwohl e trotzdem', 'Expressar consequência com deshalb'],
    dialog: [['A', 'Du siehst müde aus. Machst du wieder Überstunden?'], ['B', 'Ja, wir haben ein großes Projekt, deshalb arbeite ich bis acht.'], ['A', 'Obwohl dein Vertrag nur 40 Stunden vorsieht?'], ['B', 'Leider. Trotzdem gefällt mir die Arbeit im Team.'], ['A', 'Du solltest mit deiner Chefin über eine Gehaltserhöhung sprechen.'], ['B', 'Das mache ich nächste Woche. Ich habe gute Argumente.']],
    dialogPt: 'Uma colega com muitas horas extras pensa em pedir aumento.',
    listening: ['Obwohl ich müde bin, arbeite ich weiter.', 'Das Projekt ist wichtig, deshalb machen wir Überstunden.', 'Der Vertrag ist leider befristet.', 'Trotzdem gefällt mir die Arbeit.', 'Ich arbeite zweimal pro Woche im Homeoffice.'],
    writing: 'Escreva um e-mail formal à sua chefe pedindo uma conversa sobre aumento ou home office. Use obwohl, deshalb e trotzdem.',
    speaking: { scene: 'Reunião com a sua chefe para negociar um aumento de salário.', persona: 'Frau Roth, chefe de departamento, formal (Sie), justa mas firme', goals: ['explicar sua contribuição', 'usar deshalb para justificar', 'responder a uma objeção com trotzdem/obwohl', 'propor um acordo'] },
    criteria: 'Critérios padrão; obwohl/deshalb/trotzdem ≥ 80%.'
  });
  N([
    ['arbeitgeber', 'der', 'Arbeitgeber', '=', 'o empregador', 'ˈaʁbaɪ̯tˌɡeːbɐ', 'Mein Arbeitgeber zahlt die Weiterbildung.', 'Meu empregador paga o curso.'],
    ['arbeitnehmer', 'der', 'Arbeitnehmer', '=', 'o empregado, o trabalhador', 'ˈaʁbaɪ̯tˌneːmɐ', 'Arbeitnehmer haben 25 Tage Urlaub.', 'Os trabalhadores têm 25 dias de férias.'],
    ['vertrag', 'der', 'Vertrag', 'Verträge', 'o contrato', 'fɛɐ̯ˈtʁaːk', 'Ich habe den Vertrag unterschrieben.', 'Assinei o contrato.'],
    ['kuendigung', 'die', 'Kündigung', 'Kündigungen', 'a demissão, a rescisão', 'ˈkʏndɪɡʊŋ', 'Die Kündigung kam überraschend.', 'A demissão veio de surpresa.'],
    ['ueberstunde', 'die', 'Überstunde', 'Überstunden', 'a hora extra', 'ˈyːbɐˌʃtʊndə', 'Ich mache oft Überstunden.', 'Faço horas extras com frequência.'],
    ['arbeitszeit', 'die', 'Arbeitszeit', 'Arbeitszeiten', 'o horário de trabalho', 'ˈaʁbaɪ̯tsˌtsaɪ̯t', 'Die Arbeitszeit ist flexibel.', 'O horário de trabalho é flexível.'],
    ['team', 'das', 'Team', 'Teams', 'a equipe', 'tiːm', 'Unser Team ist international.', 'Nossa equipe é internacional.'],
    ['aufgabe', 'die', 'Aufgabe', 'Aufgaben', 'a tarefa', 'ˈaʊ̯fˌɡaːbə', 'Das ist eine schwierige Aufgabe.', 'É uma tarefa difícil.'],
    ['projekt', 'das', 'Projekt', 'Projekte', 'o projeto', 'pʁoˈjɛkt', 'Das Projekt ist fast fertig.', 'O projeto está quase pronto.'],
    ['gehaltserhoehung', 'die', 'Gehaltserhöhung', 'Gehaltserhöhungen', 'o aumento de salário', 'ɡəˈhaltsʔɛɐ̯ˌhøːʊŋ', 'Ich bitte um eine Gehaltserhöhung.', 'Peço um aumento de salário.'],
    ['abteilung', 'die', 'Abteilung', 'Abteilungen', 'o departamento', 'apˈtaɪ̯lʊŋ', 'Sie leitet die Abteilung Marketing.', 'Ela dirige o departamento de marketing.'],
    ['erfolg', 'der', 'Erfolg', 'Erfolge', 'o sucesso', 'ɛɐ̯ˈfɔlk', 'Viel Erfolg bei der Präsentation!', 'Muito sucesso na apresentação!'],
    ['homeoffice', 'das', 'Homeoffice', '', 'o home office', 'ˈhoːmˌʔɔfɪs', 'Freitags arbeite ich im Homeoffice.', 'Às sextas trabalho de casa.'],
    ['argument', 'das', 'Argument', 'Argumente', 'o argumento', 'aʁɡuˈmɛnt', 'Das ist ein gutes Argument.', 'É um bom argumento.'],
  ]);
  V([
    ['kuendigen', 'kündigen', 'pedir demissão; demitir', 'ˈkʏndɪɡn̩', 'kündige|kündigst|kündigt|kündigen|kündigt|kündigen', 'Er hat seine Stelle gekündigt.', 'Ele pediu demissão.'],
    ['leiten', 'leiten', 'dirigir, liderar', 'ˈlaɪ̯tn̩', 'leite|leitest|leitet|leiten|leitet|leiten', 'Sie leitet ein Team von zehn Leuten.', 'Ela lidera uma equipe de dez pessoas.'],
    ['verhandeln', 'verhandeln', 'negociar', 'fɛɐ̯ˈhandl̩n', 'verhandle|verhandelst|verhandelt|verhandeln|verhandelt|verhandeln', 'Wir verhandeln über den Preis.', 'Negociamos o preço.'],
    ['ueberzeugen', 'überzeugen', 'convencer', 'yːbɐˈtsɔɪ̯ɡn̩', 'überzeuge|überzeugst|überzeugt|überzeugen|überzeugt|überzeugen', 'Dein Argument überzeugt mich.', 'Seu argumento me convence.', 'Inseparável.'],
    ['praesentieren', 'präsentieren', 'apresentar', 'pʁɛzɛnˈtiːʁən', 'präsentiere|präsentierst|präsentiert|präsentieren|präsentiert|präsentieren', 'Morgen präsentiere ich das Projekt.', 'Amanhã apresento o projeto.'],
    ['zusammenarbeiten', 'zusammenarbeiten', 'trabalhar em conjunto', 'tsuˈzamənˌʔaʁbaɪ̯tn̩', 'arbeite zusammen|arbeitest zusammen|arbeitet zusammen|arbeiten zusammen|arbeitet zusammen|arbeiten zusammen', 'Wir arbeiten gut zusammen.', 'Trabalhamos bem juntos.', 'Separável.'],
  ]);
  P([
    ['obwohl', 'obwohl', 'embora, apesar de que', 'Verbo no fim.', 'word', 'ɔpˈvoːl'],
    ['deshalb', 'deshalb', 'por isso', 'Advérbio: depois dele vem o verbo.', 'word', 'ˈdɛshalp'],
    ['trotzdem', 'trotzdem', 'mesmo assim', 'Advérbio: depois dele vem o verbo.', 'word', 'ˈtʁɔtsdeːm'],
    ['befristet', 'befristet', 'temporário (contrato)', 'Oposto: unbefristet.', 'word', 'bəˈfʁɪstət'],
    ['flexibel', 'flexibel', 'flexível', '', 'word', 'flɛˈksiːbl̩'],
    ['ueberstundenp', 'Ich mache Überstunden.', 'Estou fazendo horas extras.', ''],
    ['gehaltsprechen', 'Ich möchte über mein Gehalt sprechen.', 'Gostaria de falar sobre meu salário.', ''],
    ['vielerfolg', 'Viel Erfolg!', 'Boa sorte! / Muito sucesso!', ''],
  ]);
  G('g_b1_obwohl', {
    title: 'obwohl × trotzdem × deshalb', explain: '<b>obwohl</b> (embora) inicia uma oração subordinada: verbo no <b>fim</b>. Es regnet. → <b>Obwohl</b> es regnet, gehen wir spazieren.<br><b>trotzdem</b> (mesmo assim) e <b>deshalb</b> (por isso) são advérbios: ocupam a 1ª posição e o verbo vem <b>logo depois</b>: Es regnet. <b>Trotzdem gehen</b> wir spazieren. · Ich bin krank. <b>Deshalb bleibe</b> ich zu Hause.',
    compare: 'O sentido é como em português; o que muda é a posição do verbo.',
    examples: [['Obwohl er wenig verdient, ist er zufrieden.', 'Embora ganhe pouco, ele está satisfeito.'], ['Der Bus kam nicht, deshalb bin ich gelaufen.', 'O ônibus não veio, por isso fui a pé.']],
    drills: [['___ es regnet, gehen wir spazieren. (embora)', ['Obwohl']], ['Es regnet. ___ gehen wir spazieren. (mesmo assim)', ['Trotzdem']], ['Ich bin krank. ___ bleibe ich zu Hause. (por isso)', ['Deshalb']], ['Er arbeitet viel, ___ er wenig verdient. (embora)', ['obwohl']], ['Sie hat wenig Zeit, ___ hilft sie mir. (mesmo assim)', ['trotzdem']], ['Der Vertrag ist befristet, ___ suche ich eine neue Stelle. (por isso)', ['deshalb']]]
  });
  G('g_b1_obwohl_order', {
    title: 'Montar frases com obwohl, deshalb e trotzdem', explain: 'Atenção à posição do verbo: no fim depois de obwohl; logo depois de deshalb/trotzdem.',
    compare: 'Treinar a ordem ajuda a falar sem pensar.',
    examples: [['Das Gehalt ist niedrig, trotzdem gefällt mir die Arbeit.', 'O salário é baixo, mesmo assim gosto do trabalho.']],
    order: [['Obwohl ich müde bin, arbeite ich weiter.', 'Embora esteja cansado, continuo trabalhando.'], ['Ich habe viel gearbeitet, deshalb bin ich müde.', 'Trabalhei muito, por isso estou cansado.'], ['Das Gehalt ist niedrig, trotzdem gefällt mir die Arbeit.', 'O salário é baixo, mesmo assim gosto do trabalho.'], ['Er kommt pünktlich, obwohl der Bus Verspätung hat.', 'Ele chega no horário, embora o ônibus esteja atrasado.'], ['Wir haben ein großes Projekt, deshalb machen wir Überstunden.', 'Temos um projeto grande, por isso fazemos horas extras.']]
  });

  /* ======================= B1-U8 Kultur und Medien ======================= */
  unit('B1-U8', {
    title: 'Kultur und Medien', subtitle: 'Arte, séries, livros e finalidade',
    goals: ['Falar de interesses culturais e recomendar algo', 'Expressar finalidade com um…zu e damit', 'Usar verbos com preposição fixa'],
    dialog: [['A', 'Interessierst du dich für Kunst?'], ['B', 'Ja, sehr. Am Samstag gehe ich in eine Ausstellung, um neue Künstler kennenzulernen.'], ['A', 'Ich schaue lieber Serien. Gerade sehe ich eine deutsche Krimiserie.'], ['B', 'Mit Untertiteln?'], ['A', 'Ja, mit deutschen Untertiteln, damit ich die Wörter auch lese.'], ['B', 'Gute Idee! Kannst du mir die Serie empfehlen?']],
    dialogPt: 'Dois amigos falam de arte, séries e como usá-las para aprender alemão.',
    listening: ['Ich schaue Serien mit Untertiteln, um Deutsch zu lernen.', 'Ich interessiere mich für Kunst.', 'Hast du die Ausstellung schon gesehen?', 'Ich spreche langsam, damit du mich verstehst.', 'Wir warten auf den Beginn des Konzerts.'],
    writing: 'Recomende um filme, série ou livro (8–10 frases): do que trata, por que você gostou e para que serve (um…zu / damit).',
    speaking: { scene: 'Você e uma amiga decidem o que fazer no sábado: teatro, exposição ou série em casa.', persona: 'Mila, amiga, informal (du), adora cinema alemão', goals: ['dizer pelo que você se interessa (sich interessieren für)', 'propor um programa com um…zu', 'recomendar algo', 'chegar a uma decisão'] },
    criteria: 'Critérios padrão; um…zu/damit e verbos com preposição ≥ 80%. Conclui o B1 — próximo passo: simulado Goethe-Zertifikat B1.'
  });
  N([
    ['kultur', 'die', 'Kultur', 'Kulturen', 'a cultura', 'kʊlˈtuːɐ̯', 'Ich interessiere mich für andere Kulturen.', 'Eu me interesso por outras culturas.'],
    ['theater', 'das', 'Theater', '=', 'o teatro', 'teˈaːtɐ', 'Heute Abend gehen wir ins Theater.', 'Hoje à noite vamos ao teatro.'],
    ['ausstellung', 'die', 'Ausstellung', 'Ausstellungen', 'a exposição', 'ˈaʊ̯sˌʃtɛlʊŋ', 'Die Ausstellung ist bis Juni geöffnet.', 'A exposição fica aberta até junho.'],
    ['kuenstler', 'der', 'Künstler', '=', 'o artista', 'ˈkʏnstlɐ', 'Der Künstler kommt aus Berlin.', 'O artista é de Berlim.'],
    ['kuenstlerin', 'die', 'Künstlerin', 'Künstlerinnen', 'a artista', 'ˈkʏnstləʁɪn', 'Die Künstlerin malt große Bilder.', 'A artista pinta quadros grandes.'],
    ['kunst', 'die', 'Kunst', 'Künste', 'a arte', 'kʊnst', 'Moderne Kunst verstehe ich nicht immer.', 'Nem sempre entendo arte moderna.'],
    ['roman', 'der', 'Roman', 'Romane', 'o romance (livro)', 'ʁoˈmaːn', 'Der Roman hat 500 Seiten.', 'O romance tem 500 páginas.'],
    ['autor', 'der', 'Autor', 'Autoren', 'o autor', 'ˈaʊ̯toːɐ̯', 'Der Autor liest heute aus seinem Buch.', 'O autor faz hoje uma leitura do seu livro.'],
    ['buehne', 'die', 'Bühne', 'Bühnen', 'o palco', 'ˈbyːnə', 'Die Band steht schon auf der Bühne.', 'A banda já está no palco.'],
    ['publikum', 'das', 'Publikum', '', 'o público, a plateia', 'ˈpuːblikʊm', 'Das Publikum hat lange geklatscht.', 'O público aplaudiu muito tempo.'],
    ['podcast', 'der', 'Podcast', 'Podcasts', 'o podcast', 'ˈpɔtkaːst', 'Ich höre einen Podcast auf Deutsch.', 'Ouço um podcast em alemão.'],
    ['serie', 'die', 'Serie', 'Serien', 'a série', 'ˈzeːʁi̯ə', 'Die Serie hat drei Staffeln.', 'A série tem três temporadas.'],
    ['untertitel', 'der', 'Untertitel', '=', 'a legenda', 'ˈʊntɐˌtiːtl̩', 'Ich schaue Filme mit Untertiteln.', 'Assisto filmes com legenda.'],
    ['kritik', 'die', 'Kritik', 'Kritiken', 'a crítica', 'kʁiˈtiːk', 'Der Film hat gute Kritiken bekommen.', 'O filme recebeu boas críticas.'],
  ]);
  V([
    ['sichinteressieren', 'sich interessieren', 'interessar-se', 'zɪç ɪntəʁɛˈsiːʁən', 'interessiere mich|interessierst dich|interessiert sich|interessieren uns|interessiert euch|interessieren sich', 'Er interessiert sich für Geschichte.', 'Ele se interessa por história.', 'sich interessieren für + acusativo.'],
    ['warten', 'warten', 'esperar', 'ˈvaʁtn̩', 'warte|wartest|wartet|warten|wartet|warten', 'Ich warte auf den Bus.', 'Espero o ônibus.', 'warten auf + acusativo.'],
    ['teilnehmen', 'teilnehmen', 'participar', 'ˈtaɪ̯lˌneːmən', 'nehme teil|nimmst teil|nimmt teil|nehmen teil|nehmt teil|nehmen teil', 'Ich nehme an einem Workshop teil.', 'Participo de um workshop.', 'teilnehmen an + dativo.'],
    ['zuhoeren', 'zuhören', 'escutar (com atenção)', 'ˈtsuːˌhøːʁən', 'höre zu|hörst zu|hört zu|hören zu|hört zu|hören zu', 'Hör mir bitte zu!', 'Me escuta, por favor!', 'Separável; pede dativo.'],
    ['sichunterhalten', 'sich unterhalten', 'conversar', 'zɪç ʊntɐˈhaltn̩', 'unterhalte mich|unterhältst dich|unterhält sich|unterhalten uns|unterhaltet euch|unterhalten sich', 'Wir haben uns über den Film unterhalten.', 'Conversamos sobre o filme.', 'a→ä; inseparável.'],
    ['veroeffentlichen', 'veröffentlichen', 'publicar', 'fɛɐ̯ˈʔœfn̩tlɪçn̩', 'veröffentliche|veröffentlichst|veröffentlicht|veröffentlichen|veröffentlicht|veröffentlichen', 'Sie hat ihren ersten Roman veröffentlicht.', 'Ela publicou seu primeiro romance.'],
  ]);
  P([
    ['spannend', 'spannend', 'emocionante, cheio de suspense', '', 'word', 'ˈʃpanənt'],
    ['beliebt', 'beliebt', 'popular, querido', '', 'word', 'bəˈliːpt'],
    ['damit', 'damit', 'para que', 'Verbo no fim; sujeitos diferentes.', 'word', 'daˈmɪt'],
    ['umzu', 'Ich schaue Serien mit Untertiteln, um Deutsch zu lernen.', 'Assisto séries com legenda para aprender alemão.', ''],
    ['interessieremich', 'Ich interessiere mich für Kunst.', 'Eu me interesso por arte.', ''],
    ['schongesehen', 'Hast du die Ausstellung schon gesehen?', 'Você já viu a exposição?', ''],
    ['empfehlenserie', 'Kannst du mir die Serie empfehlen?', 'Você recomenda a série?', ''],
  ]);
  G('g_b1_umzu', {
    title: 'Finalidade: um … zu × damit', explain: '<b>um … zu</b> + infinitivo no fim, quando o <b>sujeito é o mesmo</b>: Ich lerne Deutsch, <b>um</b> in Berlin <b>zu</b> arbeiten.<br><b>damit</b> + verbo conjugado no fim, quando os sujeitos são <b>diferentes</b> (ou também iguais): Ich spreche langsam, <b>damit du</b> mich <b>verstehst</b>.<br>Separáveis: um … an<b>zu</b>sehen.',
    compare: 'Os dois equivalem a “para (que)”: “para trabalhar” = um zu arbeiten; “para que você entenda” = damit du verstehst.',
    examples: [['Sie spart Geld, um ein Auto zu kaufen.', 'Ela economiza para comprar um carro.'], ['Ich schalte die Untertitel ein, damit mein Sohn alles versteht.', 'Ligo a legenda para que meu filho entenda tudo.']],
    drills: [['Ich lerne Deutsch, ___ in Berlin zu arbeiten.', ['um']], ['Ich spreche langsam, ___ du mich verstehst.', ['damit']], ['Sie spart Geld, um ein Auto ___ kaufen.', ['zu']], ['Ich schalte die Untertitel ein, ___ mein Sohn alles versteht.', ['damit']], ['Wir gehen früh los, ___ einen guten Platz zu bekommen.', ['um']], ['Er übt jeden Tag, um die Prüfung ___. (bestehen)', ['zu bestehen']]]
  });
  G('g_b1_praepverb', {
    title: 'Verbos com preposição fixa', explain: 'Muitos verbos pedem uma preposição fixa — aprenda os dois juntos:<br>sich interessieren <b>für</b> + acus. · warten <b>auf</b> + acus. · denken <b>an</b> + acus. · sprechen <b>über</b> + acus. · sich freuen <b>auf</b> (algo futuro) / <b>über</b> (algo que já aconteceu) · teilnehmen <b>an</b> + dat. · träumen <b>von</b> + dat.',
    compare: 'Português também tem (“pensar em”, “gostar de”), mas as preposições raramente coincidem: “esperar o ônibus” = warten <b>auf</b> den Bus.',
    examples: [['Ich denke oft an meine Familie.', 'Penso muito na minha família.'], ['Wir freuen uns auf das Konzert.', 'Estamos ansiosos pelo show.']],
    drills: [['Ich interessiere mich ___ Kunst.', ['für']], ['Wir warten ___ den Bus.', ['auf']], ['Ich denke oft ___ dich.', ['an']], ['Sie spricht gern ___ Politik.', ['über']], ['Er freut sich ___ den Urlaub. (que ainda vai acontecer)', ['auf']], ['Wir freuen uns ___ das Geschenk. (já recebido)', ['über']], ['Ich nehme ___ einem Kurs teil.', ['an']]]
  });

  K.finish('2026.11.20-5');
})(globalThis.GF = globalThis.GF || {});
