/* Conteúdo fixo A2 — parte 2 (A2-U5 a A2-U8). */
(function (GF) {
  'use strict';
  const K = GF.kitA2;
  const { unit, N, V, P, G } = K;

  /* ======================= A2-U5 Medien und Technik ======================= */
  unit('A2-U5', {
    title: 'Medien und Technik', subtitle: 'Celular, internet e comparações',
    goals: ['Falar de aparelhos, apps e problemas técnicos', 'Comparar coisas (-er als)', 'Dizer o que é melhor/preferido (am -sten)'],
    dialog: [['A', 'Welches Handy soll ich kaufen?'], ['B', 'Das neue Modell ist schneller, aber auch teurer.'], ['A', 'Und welches hat den besten Akku?'], ['B', 'Das alte. Es ist am billigsten und der Akku hält länger.'], ['A', 'Dann nehme ich das alte. Ich telefoniere sowieso am meisten.'], ['B', 'Gute Entscheidung!']],
    dialogPt: 'Escolhendo um celular: comparação de modelos.',
    listening: ['Mein Akku ist leer.', 'Das neue Handy ist schneller als das alte.', 'Kannst du mir die Datei schicken?', 'Am liebsten lese ich Nachrichten online.', 'Ich habe das Passwort vergessen.'],
    writing: 'Compare dois aparelhos ou apps que você usa (preço, qualidade, velocidade) e diga qual prefere e por quê.',
    speaking: { scene: 'Seu notebook parou de funcionar e você pede ajuda numa loja de eletrônicos.', persona: 'Tim, vendedor jovem, informal mas educado (Sie)', goals: ['explicar o problema', 'perguntar por um aparelho novo', 'comparar dois modelos', 'decidir com am besten/am liebsten'] },
    criteria: 'Critérios padrão; comparativo e superlativo ≥ 80%.'
  });
  N([
    ['handy', 'das', 'Handy', 'Handys', 'o celular', 'ˈhɛndi', 'Mein Handy ist kaputt.', 'Meu celular quebrou.', 'Falso inglês: “Handy” = celular.'],
    ['computer', 'der', 'Computer', '=', 'o computador', 'kɔmˈpjuːtɐ', 'Der Computer ist zu langsam.', 'O computador está lento demais.'],
    ['laptop', 'der', 'Laptop', 'Laptops', 'o notebook', 'ˈlɛptɔp', 'Ich arbeite mit dem Laptop.', 'Trabalho com o notebook.'],
    ['internet', 'das', 'Internet', '', 'a internet', 'ˈɪntɐnɛt', 'Das Internet ist heute langsam.', 'A internet está lenta hoje.'],
    ['nachricht', 'die', 'Nachricht', 'Nachrichten', 'a mensagem; (pl.) o noticiário', 'ˈnaːxˌʁɪçt', 'Ich schreibe dir eine Nachricht.', 'Te mando uma mensagem.'],
    ['passwort', 'das', 'Passwort', 'Passwörter', 'a senha', 'ˈpasˌvɔʁt', 'Das Passwort ist zu kurz.', 'A senha é curta demais.'],
    ['bildschirm', 'der', 'Bildschirm', 'Bildschirme', 'a tela', 'ˈbɪltˌʃɪʁm', 'Der Bildschirm ist sehr groß.', 'A tela é muito grande.'],
    ['app', 'die', 'App', 'Apps', 'o aplicativo', 'ɛp', 'Die App ist kostenlos.', 'O aplicativo é gratuito.'],
    ['zeitung', 'die', 'Zeitung', 'Zeitungen', 'o jornal', 'ˈtsaɪ̯tʊŋ', 'Ich lese die Zeitung online.', 'Leio o jornal online.'],
    ['sendung', 'die', 'Sendung', 'Sendungen', 'o programa (TV/rádio)', 'ˈzɛndʊŋ', 'Die Sendung beginnt um acht.', 'O programa começa às oito.'],
    ['akku', 'der', 'Akku', 'Akkus', 'a bateria', 'ˈaku', 'Der Akku hält zwei Tage.', 'A bateria dura dois dias.'],
    ['ladegeraet', 'das', 'Ladegerät', 'Ladegeräte', 'o carregador', 'ˈlaːdəɡəˌʁɛːt', 'Hast du ein Ladegerät für mich?', 'Você tem um carregador para mim?'],
    ['datei', 'die', 'Datei', 'Dateien', 'o arquivo (digital)', 'daˈtaɪ̯', 'Die Datei ist zu groß.', 'O arquivo é grande demais.'],
  ]);
  V([
    ['herunterladen', 'herunterladen', 'baixar (download)', 'hɛˈʁʊntɐˌlaːdn̩', 'lade herunter|lädst herunter|lädt herunter|laden herunter|ladet herunter|laden herunter', 'Ich lade die App herunter.', 'Eu baixo o aplicativo.', 'Separável; a→ä. Perfekt: hat heruntergeladen.'],
    ['speichern', 'speichern', 'salvar (arquivo)', 'ˈʃpaɪ̯çɐn', 'speichere|speicherst|speichert|speichern|speichert|speichern', 'Hast du die Datei gespeichert?', 'Você salvou o arquivo?'],
    ['schicken', 'schicken', 'enviar', 'ˈʃɪkn̩', 'schicke|schickst|schickt|schicken|schickt|schicken', 'Schick mir bitte das Foto.', 'Me manda a foto, por favor.'],
    ['benutzen', 'benutzen', 'usar', 'bəˈnʊtsn̩', 'benutze|benutzt|benutzt|benutzen|benutzt|benutzen', 'Ich benutze das Handy jeden Tag.', 'Uso o celular todos os dias.'],
    ['vergleichen', 'vergleichen', 'comparar', 'fɛɐ̯ˈɡlaɪ̯çn̩', 'vergleiche|vergleichst|vergleicht|vergleichen|vergleicht|vergleichen', 'Wir vergleichen die Preise.', 'Comparamos os preços.'],
    ['vergessen', 'vergessen', 'esquecer', 'fɛɐ̯ˈɡɛsn̩', 'vergesse|vergisst|vergisst|vergessen|vergesst|vergessen', 'Ich habe das Passwort vergessen.', 'Esqueci a senha.', 'e→i; Perfekt: hat vergessen.'],
  ]);
  P([
    ['schnell', 'schnell', 'rápido', '', 'word', 'ʃnɛl'],
    ['langsam', 'langsam', 'lento, devagar', '', 'word', 'ˈlaŋzaːm'],
    ['praktisch', 'praktisch', 'prático', '', 'word', 'ˈpʁaktɪʃ'],
    ['kostenlos', 'kostenlos', 'gratuito', '', 'word', 'ˈkɔstn̩loːs'],
    ['akkuleer', 'Mein Akku ist leer.', 'Minha bateria acabou.', ''],
    ['dateischicken', 'Kannst du mir die Datei schicken?', 'Você pode me mandar o arquivo?', ''],
    ['funktioniertnicht', 'Das funktioniert nicht.', 'Isso não funciona.', ''],
    ['amliebsten', 'Am liebsten lese ich Nachrichten online.', 'Prefiro ler notícias online.', ''],
  ]);
  G('g_a2_komparativ', {
    title: 'Comparativo: -er als', explain: 'Adjetivo + <b>-er</b> + <b>als</b>: schnell → schnell<b>er als</b>.<br>Muitos adjetivos curtos ganham trema: alt → <b>ä</b>lter, groß → gr<b>ö</b>ßer, jung → j<b>ü</b>nger, kurz → k<b>ü</b>rzer.<br>Irregulares: gut → <b>besser</b>, viel → <b>mehr</b>, gern → <b>lieber</b>.<br>Igualdade: <b>so</b> … <b>wie</b> (so schnell wie).',
    compare: 'Português usa “mais … que”; alemão muda o próprio adjetivo: “mais rápido” = schneller.',
    examples: [['Der Laptop ist teurer als das Handy.', 'O notebook é mais caro que o celular.'], ['Ich trinke lieber Tee als Kaffee.', 'Prefiro chá a café.']],
    drills: [['Das Handy ist ___ als der Laptop. (klein)', ['kleiner']], ['Mein Bruder ist ___ als ich. (alt)', ['älter', 'aelter']], ['Der neue Computer ist ___. (gut)', ['besser']], ['Ich lese ___ als früher. (viel)', ['mehr']], ['Ich trinke ___ Tee als Kaffee. (gern)', ['lieber']], ['Berlin ist größer ___ München.', ['als']], ['Das Tablet ist so teuer ___ das Handy.', ['wie']]]
  });
  G('g_a2_superlativ', {
    title: 'Superlativo: am -sten / der, die, das -ste', explain: 'Depois do verbo: <b>am</b> + adjetivo + <b>-sten</b>: am schnellsten.<br>Antes do substantivo: <b>der/die/das</b> + adjetivo + <b>-ste</b>: das schnellste Handy.<br>Terminação em -d, -t, -s, -ß, -z: + <b>-esten</b> (am ältesten, am kürzesten).<br>Irregulares: am <b>besten</b>, am <b>meisten</b>, am <b>liebsten</b>.',
    compare: '“O mais rápido” = am schnellsten / der schnellste. “Prefiro acima de tudo” = am liebsten.',
    examples: [['Dieses Handy ist am billigsten.', 'Este celular é o mais barato.'], ['Das ist die beste App.', 'Este é o melhor aplicativo.']],
    drills: [['Dieses Handy ist am ___. (billig)', ['billigsten']], ['Am ___ höre ich Podcasts. (gern)', ['liebsten']], ['Wer spielt am ___? (gut)', ['besten']], ['Das ist die ___ App. (gut)', ['beste']], ['Der Laptop ist am ___. (teuer)', ['teuersten']], ['Mein Opa ist am ___. (alt)', ['ältesten', 'aeltesten']]]
  });

  /* ======================= A2-U6 Wohnen ======================= */
  unit('A2-U6', {
    title: 'Wohnen', subtitle: 'Mudança, aluguel e móveis',
    goals: ['Procurar apartamento e falar de aluguel', 'Dizer onde colocar e onde estão as coisas (stellen/stehen…)', 'Descrever com adjetivos antes do substantivo'],
    dialog: [['A', 'Wann ziehst du um?'], ['B', 'Nächsten Samstag. Die neue Wohnung hat einen großen Balkon.'], ['A', 'Toll! Brauchst du Hilfe?'], ['B', 'Ja, gern! Wir müssen das Sofa ins Wohnzimmer stellen.'], ['A', 'Und wo soll das große Regal stehen?'], ['B', 'Das Regal stellen wir an die Wand neben dem Fenster.']],
    dialogPt: 'Amigos combinam a mudança e onde colocar os móveis.',
    listening: ['Die Wohnung kostet achthundert Euro warm.', 'Ich ziehe nächsten Monat um.', 'Das Bild hängt an der Wand.', 'Stell den Stuhl in die Ecke!', 'Wir haben einen kleinen Balkon.'],
    writing: 'Descreva sua casa ideal (5–7 frases) usando pelo menos 4 adjetivos antes de substantivos (ein großer…, eine helle…).',
    speaking: { scene: 'Você visita um apartamento para alugar em Düsseldorf.', persona: 'Herr Krüger, proprietário, formal (Sie)', goals: ['perguntar o preço do aluguel', 'perguntar sobre aquecimento e vizinhos', 'descrever o que procura com adjetivos', 'combinar quando pode se mudar'] },
    criteria: 'Critérios padrão; stellen/stehen e adjetivos ≥ 80%.'
  });
  N([
    ['umzug', 'der', 'Umzug', 'Umzüge', 'a mudança', 'ˈʊmˌtsuːk', 'Der Umzug war anstrengend.', 'A mudança foi cansativa.'],
    ['miete', 'die', 'Miete', 'Mieten', 'o aluguel', 'ˈmiːtə', 'Die Miete ist zu hoch.', 'O aluguel é alto demais.', '“warm” = com aquecimento e taxas; “kalt” = sem.'],
    ['vermieter', 'der', 'Vermieter', '=', 'o proprietário (que aluga)', 'fɛɐ̯ˈmiːtɐ', 'Der Vermieter ist sehr freundlich.', 'O proprietário é muito simpático.'],
    ['nachbar', 'der', 'Nachbar', 'Nachbarn', 'o vizinho', 'ˈnaxbaːɐ̯', 'Unser Nachbar ist laut.', 'Nosso vizinho é barulhento.'],
    ['nachbarin', 'die', 'Nachbarin', 'Nachbarinnen', 'a vizinha', 'ˈnaxbaːʁɪn', 'Die Nachbarin hilft uns.', 'A vizinha nos ajuda.'],
    ['regal', 'das', 'Regal', 'Regale', 'a estante', 'ʁeˈɡaːl', 'Das Regal steht an der Wand.', 'A estante fica junto à parede.'],
    ['teppich', 'der', 'Teppich', 'Teppiche', 'o tapete', 'ˈtɛpɪç', 'Der Teppich liegt im Wohnzimmer.', 'O tapete fica na sala.'],
    ['bild', 'das', 'Bild', 'Bilder', 'o quadro, a imagem', 'bɪlt', 'Das Bild hängt über dem Sofa.', 'O quadro está pendurado acima do sofá.'],
    ['wand', 'die', 'Wand', 'Wände', 'a parede', 'vant', 'Die Wände sind weiß.', 'As paredes são brancas.'],
    ['boden', 'der', 'Boden', 'Böden', 'o chão', 'ˈboːdn̩', 'Die Schuhe liegen auf dem Boden.', 'Os sapatos estão no chão.'],
    ['ecke', 'die', 'Ecke', 'Ecken', 'o canto; a esquina', 'ˈɛkə', 'Die Lampe steht in der Ecke.', 'A luminária fica no canto.'],
    ['balkon', 'der', 'Balkon', 'Balkone', 'a varanda', 'balˈkoːn', 'Wir frühstücken auf dem Balkon.', 'Tomamos café na varanda.'],
    ['keller', 'der', 'Keller', '=', 'o porão', 'ˈkɛlɐ', 'Das Fahrrad steht im Keller.', 'A bicicleta fica no porão.'],
    ['heizung', 'die', 'Heizung', 'Heizungen', 'o aquecimento', 'ˈhaɪ̯tsʊŋ', 'Die Heizung funktioniert nicht.', 'O aquecimento não funciona.'],
    ['wohnzimmer', 'das', 'Wohnzimmer', '=', 'a sala de estar', 'ˈvoːnˌtsɪmɐ', 'Das Wohnzimmer ist hell.', 'A sala é clara.'],
    ['muell', 'der', 'Müll', '', 'o lixo', 'mʏl', 'Bring bitte den Müll raus.', 'Leve o lixo para fora, por favor.', 'Na Alemanha o lixo é separado.'],
  ]);
  V([
    ['umziehen', 'umziehen', 'mudar-se (de casa)', 'ˈʊmˌtsiːən', 'ziehe um|ziehst um|zieht um|ziehen um|zieht um|ziehen um', 'Wir ziehen nach Köln um.', 'Vamos nos mudar para Colônia.', 'Perfekt: ist umgezogen.'],
    ['stellen', 'stellen', 'colocar (em pé)', 'ˈʃtɛlən', 'stelle|stellst|stellt|stellen|stellt|stellen', 'Ich stelle die Flasche auf den Tisch.', 'Coloco a garrafa na mesa.', 'Movimento → acusativo.'],
    ['stehen', 'stehen', 'estar (em pé)', 'ˈʃteːən', 'stehe|stehst|steht|stehen|steht|stehen', 'Die Flasche steht auf dem Tisch.', 'A garrafa está na mesa.', 'Posição → dativo.'],
    ['legen', 'legen', 'colocar (deitado)', 'ˈleːɡn̩', 'lege|legst|legt|legen|legt|legen', 'Ich lege das Buch auf das Regal.', 'Coloco o livro na estante.', 'Posição deitado: liegen.'],
    ['haengen', 'hängen', 'pendurar; estar pendurado', 'ˈhɛŋən', 'hänge|hängst|hängt|hängen|hängt|hängen', 'Ich hänge das Bild an die Wand.', 'Penduro o quadro na parede.', 'Mesma forma no presente para as duas ideias.'],
    ['mieten', 'mieten', 'alugar (como inquilino)', 'ˈmiːtn̩', 'miete|mietest|mietet|mieten|mietet|mieten', 'Wir mieten eine Wohnung.', 'Alugamos um apartamento.'],
    ['aufraeumen', 'aufräumen', 'arrumar', 'ˈaʊ̯fˌʁɔɪ̯mən', 'räume auf|räumst auf|räumt auf|räumen auf|räumt auf|räumen auf', 'Am Sonntag räume ich auf.', 'No domingo eu arrumo a casa.'],
  ]);
  P([
    ['gemuetlich', 'gemütlich', 'aconchegante', '', 'word', 'ɡəˈmyːtlɪç'],
    ['ruhig', 'ruhig', 'tranquilo, silencioso', '', 'word', 'ˈʁuːɪç'],
    ['laut', 'laut', 'barulhento; alto (som)', '', 'word', 'laʊ̯t'],
    ['warmmiete', 'Die Wohnung kostet 800 Euro warm.', 'O apartamento custa 800 euros com taxas.', ''],
    ['besichtigen', 'Wann kann ich die Wohnung besichtigen?', 'Quando posso visitar o apartamento?', ''],
    ['ziehenaechsten', 'Ich ziehe nächsten Monat um.', 'Vou me mudar no mês que vem.', ''],
    ['hilfeumzug', 'Kannst du mir beim Umzug helfen?', 'Você pode me ajudar na mudança?', ''],
  ]);
  G('g_a2_stellen', {
    title: 'stellen/stehen, legen/liegen, hängen', explain: '<b>Movimento</b> (alguém coloca) → verbo regular + <b>acusativo</b> (Wohin?): Ich <b>stelle</b> die Lampe auf <b>den</b> Tisch. Ich <b>lege</b> das Buch auf <b>das</b> Regal.<br><b>Posição</b> (onde está) → outro verbo + <b>dativo</b> (Wo?): Die Lampe <b>steht</b> auf <b>dem</b> Tisch. Das Buch <b>liegt</b> auf <b>dem</b> Regal.<br>stellen/stehen = em pé · legen/liegen = deitado · hängen = pendurado (mesma forma).',
    compare: 'Português usa “pôr/estar” para tudo; o alemão distingue a posição (em pé, deitado, pendurado).',
    examples: [['Die Flasche steht im Kühlschrank.', 'A garrafa está na geladeira (em pé).'], ['Ich lege den Teppich ins Wohnzimmer.', 'Coloco o tapete na sala.']],
    drills: [['Ich ___ die Lampe auf den Tisch. (colocar em pé)', ['stelle']], ['Die Lampe ___ auf dem Tisch. (está em pé)', ['steht']], ['Ich ___ das Buch auf das Regal. (colocar deitado)', ['lege']], ['Das Buch ___ auf dem Regal. (está deitado)', ['liegt']], ['Er hängt das Bild an ___ Wand.', ['die']], ['Das Bild hängt an ___ Wand.', ['der']], ['Wir stellen das Sofa in ___ Ecke.', ['die']]]
  });
  G('g_a2_adjdekl', {
    title: 'Adjetivo antes do substantivo (com ein/kein/mein)', explain: 'Depois de <b>ein/kein/mein</b>, o adjetivo mostra o gênero quando o artigo não mostra:<br>Nominativo: ein groß<b>er</b> Tisch · eine groß<b>e</b> Lampe · ein groß<b>es</b> Bett · (pl.) meine groß<b>en</b> Zimmer<br>Acusativo: muda só o masculino: einen groß<b>en</b> Tisch.<br>Depois de <b>der/die/das</b> (nominativo singular): sempre <b>-e</b>: der neu<b>e</b> Nachbar, das hell<b>e</b> Zimmer.',
    compare: 'Português concorda o adjetivo só em gênero/número; o alemão também por caso e pelo artigo.',
    examples: [['Wir haben eine kleine Küche.', 'Temos uma cozinha pequena.'], ['Ich suche einen ruhigen Nachbarn.', 'Procuro um vizinho tranquilo.']],
    drills: [['Das ist ein ___ Balkon. (groß)', ['großer', 'grosser']], ['Wir haben eine ___ Küche. (klein)', ['kleine']], ['Das ist ein ___ Zimmer. (hell)', ['helles']], ['Ich suche einen ___ Teppich. (rot)', ['roten']], ['Der ___ Nachbar ist nett. (neu)', ['neue']], ['Die Wohnung hat einen ___ Keller. (groß)', ['großen', 'grossen']]]
  });

  /* ======================= A2-U7 Freunde und Familie ======================= */
  unit('A2-U7', {
    title: 'Freunde und Familie', subtitle: 'Relações, lembranças e o passado',
    goals: ['Contar como conheceu alguém', 'Usar o Perfekt de verbos irregulares', 'Usar possessivos no dativo (meinem, meiner)'],
    dialog: [['A', 'Wie habt ihr euch kennengelernt?'], ['B', 'Im Urlaub in Portugal. Wir haben am Strand Volleyball gespielt.'], ['A', 'Wie romantisch! Und wann habt ihr geheiratet?'], ['B', 'Vor zwei Jahren. Wir haben mit unseren Freunden und meiner Familie gefeiert.'], ['A', 'Habt ihr euch nie gestritten?'], ['B', 'Doch, natürlich! Aber wir verstehen uns sehr gut.']],
    dialogPt: 'Uma pessoa conta como conheceu o parceiro.',
    listening: ['Wir haben uns im Urlaub kennengelernt.', 'Ich habe meinem Bruder geholfen.', 'Hast du das gewusst?', 'Er hat seiner Freundin Blumen gebracht.', 'Ich habe dich nicht verstanden.'],
    writing: 'Conte (6–8 frases, no Perfekt) como você conheceu um amigo ou parceiro: onde, quando, o que fizeram.',
    speaking: { scene: 'Num jantar, uma pessoa nova do grupo pergunta sobre sua família e amigos.', persona: 'Sophie, 32, amiga de amigos, informal (du)', goals: ['falar de alguém da família', 'contar como conheceu um amigo (Perfekt)', 'usar um possessivo no dativo', 'perguntar sobre a família dela'] },
    criteria: 'Critérios padrão; Perfekt irregular e possessivos no dativo ≥ 80%.'
  });
  N([
    ['beziehung', 'die', 'Beziehung', 'Beziehungen', 'o relacionamento', 'bəˈtsiːʊŋ', 'Sie haben eine gute Beziehung.', 'Eles têm um bom relacionamento.'],
    ['partner', 'der', 'Partner', '=', 'o parceiro, o companheiro', 'ˈpaʁtnɐ', 'Mein Partner kocht gern.', 'Meu companheiro gosta de cozinhar.'],
    ['partnerin', 'die', 'Partnerin', 'Partnerinnen', 'a parceira, a companheira', 'ˈpaʁtnəʁɪn', 'Seine Partnerin kommt aus Wien.', 'A companheira dele é de Viena.'],
    ['grosseltern', 'die', 'Großeltern', '—', 'os avós', 'ˈɡʁoːsˌʔɛltɐn', 'Meine Großeltern wohnen auf dem Land.', 'Meus avós moram no interior.', 'Só plural.'],
    ['opa', 'der', 'Opa', 'Opas', 'o vovô', 'ˈoːpa', 'Mein Opa ist achtzig.', 'Meu avô tem oitenta anos.', 'Formal: der Großvater.'],
    ['oma', 'die', 'Oma', 'Omas', 'a vovó', 'ˈoːma', 'Die Oma backt Kuchen.', 'A vovó faz bolo.', 'Formal: die Großmutter.'],
    ['onkel', 'der', 'Onkel', '=', 'o tio', 'ˈɔŋkl̩', 'Mein Onkel lebt in Kanada.', 'Meu tio mora no Canadá.'],
    ['tante', 'die', 'Tante', 'Tanten', 'a tia', 'ˈtantə', 'Meine Tante hat drei Kinder.', 'Minha tia tem três filhos.'],
    ['cousin', 'der', 'Cousin', 'Cousins', 'o primo', 'kuˈzɛ̃ː', 'Mein Cousin studiert in Graz.', 'Meu primo estuda em Graz.'],
    ['cousine', 'die', 'Cousine', 'Cousinen', 'a prima', 'kuˈziːnə', 'Meine Cousine heiratet bald.', 'Minha prima vai se casar em breve.'],
    ['freundschaft', 'die', 'Freundschaft', 'Freundschaften', 'a amizade', 'ˈfʁɔɪ̯ntʃaft', 'Unsere Freundschaft ist sehr alt.', 'Nossa amizade é muito antiga.'],
    ['erinnerung', 'die', 'Erinnerung', 'Erinnerungen', 'a lembrança', 'ɛɐ̯ˈʔɪnəʁʊŋ', 'Das ist eine schöne Erinnerung.', 'É uma bela lembrança.'],
    ['streit', 'der', 'Streit', '', 'a briga, a discussão', 'ʃtʁaɪ̯t', 'Sie hatten einen Streit.', 'Eles tiveram uma briga.'],
  ]);
  V([
    ['kennenlernen', 'kennenlernen', 'conhecer (pela primeira vez)', 'ˈkɛnənˌlɛʁnən', 'lerne kennen|lernst kennen|lernt kennen|lernen kennen|lernt kennen|lernen kennen', 'Wo hast du sie kennengelernt?', 'Onde você a conheceu?', 'Perfekt: hat kennengelernt.'],
    ['sichstreiten', 'sich streiten', 'brigar, discutir', 'zɪç ˈʃtʁaɪ̯tn̩', 'streite mich|streitest dich|streitet sich|streiten uns|streitet euch|streiten sich', 'Die Kinder streiten sich oft.', 'As crianças brigam muitas vezes.', 'Perfekt: hat sich gestritten.'],
    ['verstehen', 'verstehen', 'entender', 'fɛɐ̯ˈʃteːən', 'verstehe|verstehst|versteht|verstehen|versteht|verstehen', 'Wir verstehen uns gut.', 'Nós nos damos bem.', 'Perfekt: hat verstanden.'],
    ['bringen', 'bringen', 'trazer, levar', 'ˈbʁɪŋən', 'bringe|bringst|bringt|bringen|bringt|bringen', 'Er hat Wein mitgebracht.', 'Ele trouxe vinho.', 'Perfekt: hat gebracht.'],
    ['denken', 'denken', 'pensar', 'ˈdɛŋkn̩', 'denke|denkst|denkt|denken|denkt|denken', 'Ich denke oft an dich.', 'Penso muito em você.', 'Perfekt: hat gedacht.'],
    ['wissen', 'wissen', 'saber (um fato)', 'ˈvɪsn̩', 'weiß|weißt|weiß|wissen|wisst|wissen', 'Weißt du, wo er wohnt?', 'Você sabe onde ele mora?', 'Irregular; Perfekt: hat gewusst.'],
    ['heiraten', 'heiraten', 'casar-se', 'ˈhaɪ̯ʁaːtn̩', 'heirate|heiratest|heiratet|heiraten|heiratet|heiraten', 'Sie haben letztes Jahr geheiratet.', 'Eles se casaram no ano passado.'],
    ['vermissen', 'vermissen', 'sentir falta de', 'fɛɐ̯ˈmɪsn̩', 'vermisse|vermisst|vermisst|vermissen|vermisst|vermissen', 'Ich vermisse meine Familie.', 'Sinto falta da minha família.'],
  ]);
  P([
    ['nett', 'nett', 'simpático, gentil', '', 'word', 'nɛt'],
    ['ehrlich', 'ehrlich', 'sincero, honesto', '', 'word', 'ˈeːɐ̯lɪç'],
    ['geschieden', 'geschieden', 'divorciado', '', 'word', 'ɡəˈʃiːdn̩'],
    ['wiekennengelernt', 'Wie habt ihr euch kennengelernt?', 'Como vocês se conheceram?', ''],
    ['seitzusammen', 'Wir sind seit fünf Jahren zusammen.', 'Estamos juntos há cinco anos.', ''],
    ['vermissedich', 'Ich vermisse dich.', 'Sinto sua falta.', ''],
    ['gruess', 'Grüß deine Eltern von mir!', 'Mande lembranças aos seus pais!', ''],
    ['doch', 'Doch!', 'Sim! (contrariando uma pergunta negativa)', '“Hast du keine Zeit?” – “Doch!”', 'word', 'dɔx'],
  ]);
  G('g_a2_perfekt_irr', {
    title: 'Perfekt dos verbos irregulares', explain: 'Irregulares terminam em <b>-en</b> e muitas vezes mudam a vogal: sprechen → ge<b>sprochen</b>, finden → ge<b>funden</b>, trinken → ge<b>trunken</b>, helfen → ge<b>holfen</b>, nehmen → ge<b>nommen</b>, verstehen → <b>verstanden</b>.<br>Mistos (forma -t, mas com mudança): bringen → ge<b>bracht</b>, denken → ge<b>dacht</b>, wissen → ge<b>wusst</b>, kennen → ge<b>kannt</b>.<br>Com <b>sein</b>: gehen → ist <b>gegangen</b>, kommen → ist <b>gekommen</b>, bleiben → ist geblieben.',
    compare: 'Como “fazer → feito”, “dizer → dito” em português: precisam ser memorizados. Aprenda sempre infinitivo + particípio juntos.',
    examples: [['Wir haben lange gesprochen.', 'Conversamos muito tempo.'], ['Er ist nach Hause gegangen.', 'Ele foi para casa.']],
    drills: [['Wir haben viel ___. (sprechen)', ['gesprochen']], ['Er ist spät ___. (kommen)', ['gekommen']], ['Ich habe dir ein Geschenk ___. (bringen)', ['gebracht']], ['Hast du das ___? (wissen)', ['gewusst']], ['Sie hat den Schlüssel ___. (finden)', ['gefunden']], ['Wir haben Kaffee ___. (trinken)', ['getrunken']], ['Ich habe dich nicht ___. (verstehen)', ['verstanden']]]
  });
  G('g_a2_possdat', {
    title: 'Possessivos no dativo', explain: 'No dativo, os possessivos levam as terminações do artigo: <b>meinem</b> (der/das), <b>meiner</b> (die), <b>meinen</b> + -n (plural).<br>Vale para todos: dein-, sein-, ihr-, unser-, euer-, Ihr-.<br>Depois de mit, bei, zu, von, aus, nach, seit e com helfen, danken, gefallen, schenken (pessoa).',
    compare: '“Ajudo meu irmão” = Ich helfe meinem Bruder (helfen pede dativo).',
    examples: [['Ich wohne bei meiner Tante.', 'Moro com minha tia.'], ['Sie spricht mit ihren Eltern.', 'Ela fala com os pais dela.']],
    drills: [['Ich helfe ___ Bruder. (meu)', ['meinem']], ['Er spricht mit ___ Schwester. (sua, dele)', ['seiner']], ['Wir fahren zu ___ Großeltern. (nossos)', ['unseren']], ['Ich wohne bei ___ Tante. (minha)', ['meiner']], ['Sie schenkt ___ Kind ein Buch. (seu, dela)', ['ihrem']], ['Gefällt ___ Freundin das Geschenk? (tua)', ['deiner']]]
  });

  /* ======================= A2-U8 Pläne ======================= */
  unit('A2-U8', {
    title: 'Pläne', subtitle: 'Planos, sonhos e futuro',
    goals: ['Falar de planos e sonhos', 'Usar o futuro com werden', 'Usar zu + infinitivo (Ich habe vor, … zu …)'],
    dialog: [['A', 'Was hast du nächstes Jahr vor?'], ['B', 'Ich habe vor, die B1-Prüfung zu machen.'], ['A', 'Und danach?'], ['B', 'Vielleicht werde ich ein Jahr in Deutschland arbeiten.'], ['A', 'Das klingt super! Hast du keine Angst?'], ['B', 'Ein bisschen. Aber ich versuche, jeden Tag zu üben.']],
    dialogPt: 'Planos para o próximo ano: exame e trabalho no exterior.',
    listening: ['Nächstes Jahr werde ich in Berlin wohnen.', 'Ich habe vor, einen Kurs zu machen.', 'Hast du Lust, mitzukommen?', 'Ich hoffe, die Prüfung zu bestehen.', 'Vielleicht fahre ich im Sommer nach Österreich.'],
    writing: 'Escreva sobre seus planos para os próximos 2 anos (6–8 frases), usando werden e pelo menos 2 construções com zu.',
    speaking: { scene: 'Conversa com um orientador de uma escola de idiomas sobre seus objetivos.', persona: 'Herr Neumann, orientador pedagógico, formal (Sie)', goals: ['dizer o seu objetivo com o alemão', 'falar de um plano com vorhaben … zu', 'falar do futuro com werden', 'perguntar sobre cursos e exames'] },
    criteria: 'Critérios padrão; werden e zu + infinitivo ≥ 80%. Conclui o A2 — próximo passo: simulado Goethe-Zertifikat A2.'
  });
  N([
    ['zukunft', 'die', 'Zukunft', '', 'o futuro', 'ˈtsuːˌkʊnft', 'Die Zukunft ist offen.', 'O futuro está em aberto.'],
    ['plan', 'der', 'Plan', 'Pläne', 'o plano', 'plaːn', 'Hast du schon Pläne für den Sommer?', 'Você já tem planos para o verão?'],
    ['traum', 'der', 'Traum', 'Träume', 'o sonho', 'tʁaʊ̯m', 'Mein Traum ist ein Haus am Meer.', 'Meu sonho é uma casa na praia.'],
    ['ziel', 'das', 'Ziel', 'Ziele', 'o objetivo, a meta', 'tsiːl', 'Mein Ziel ist das C1-Zertifikat.', 'Minha meta é o certificado C1.'],
    ['pruefung', 'die', 'Prüfung', 'Prüfungen', 'a prova, o exame', 'ˈpʁyːfʊŋ', 'Die Prüfung ist im Juni.', 'A prova é em junho.'],
    ['kurs', 'der', 'Kurs', 'Kurse', 'o curso', 'kʊʁs', 'Der Kurs dauert drei Monate.', 'O curso dura três meses.'],
    ['zertifikat', 'das', 'Zertifikat', 'Zertifikate', 'o certificado', 'tsɛʁtifiˈkaːt', 'Für die Stelle brauche ich ein Zertifikat.', 'Para a vaga preciso de um certificado.'],
    ['ausland', 'das', 'Ausland', '', 'o exterior', 'ˈaʊ̯sˌlant', 'Sie möchte im Ausland studieren.', 'Ela quer estudar no exterior.'],
    ['moeglichkeit', 'die', 'Möglichkeit', 'Möglichkeiten', 'a possibilidade', 'ˈmøːklɪçkaɪ̯t', 'Es gibt viele Möglichkeiten.', 'Há muitas possibilidades.'],
    ['wunsch', 'der', 'Wunsch', 'Wünsche', 'o desejo', 'vʊnʃ', 'Hast du einen Wunsch?', 'Você tem algum desejo?'],
    ['entscheidung', 'die', 'Entscheidung', 'Entscheidungen', 'a decisão', 'ɛntˈʃaɪ̯dʊŋ', 'Das ist eine schwere Entscheidung.', 'É uma decisão difícil.'],
    ['angst', 'die', 'Angst', 'Ängste', 'o medo', 'aŋst', 'Ich habe keine Angst.', 'Não tenho medo.'],
    ['lust', 'die', 'Lust', '', 'a vontade', 'lʊst', 'Ich habe keine Lust.', 'Não estou com vontade.', 'Lust haben = estar a fim.'],
  ]);
  V([
    ['werden', 'werden', 'tornar-se; (futuro) ir + verbo', 'ˈveːɐ̯dn̩', 'werde|wirst|wird|werden|werdet|werden', 'Ich werde Lehrerin.', 'Vou me tornar professora.', 'Irregular: du wirst, er wird.'],
    ['vorhaben', 'vorhaben', 'planejar, pretender', 'ˈfoːɐ̯ˌhaːbn̩', 'habe vor|hast vor|hat vor|haben vor|habt vor|haben vor', 'Was hast du am Wochenende vor?', 'O que você vai fazer no fim de semana?', 'Separável.'],
    ['hoffen', 'hoffen', 'esperar (ter esperança)', 'ˈhɔfn̩', 'hoffe|hoffst|hofft|hoffen|hofft|hoffen', 'Ich hoffe, dass du kommst.', 'Espero que você venha.'],
    ['versuchen', 'versuchen', 'tentar', 'fɛɐ̯ˈzuːxn̩', 'versuche|versuchst|versucht|versuchen|versucht|versuchen', 'Ich versuche, mehr Deutsch zu sprechen.', 'Tento falar mais alemão.'],
    ['bestehen', 'bestehen', 'passar (num exame)', 'bəˈʃteːən', 'bestehe|bestehst|besteht|bestehen|besteht|bestehen', 'Sie hat die Prüfung bestanden.', 'Ela passou na prova.', 'Perfekt: hat bestanden.'],
    ['ueben', 'üben', 'praticar, treinar', 'ˈyːbn̩', 'übe|übst|übt|üben|übt|üben', 'Wir üben jeden Tag.', 'Praticamos todos os dias.'],
    ['traeumen', 'träumen', 'sonhar', 'ˈtʁɔɪ̯mən', 'träume|träumst|träumt|träumen|träumt|träumen', 'Ich träume von einer Weltreise.', 'Sonho com uma volta ao mundo.', 'träumen von + dativo.'],
  ]);
  P([
    ['bald', 'bald', 'em breve', '', 'word', 'balt'],
    ['vielleicht', 'vielleicht', 'talvez', '', 'word', 'fiˈlaɪ̯çt'],
    ['spaeter', 'später', 'mais tarde, depois', '', 'word', 'ˈʃpɛːtɐ'],
    ['naechstesjahr', 'nächstes Jahr', 'no ano que vem', 'Sem preposição: Nächstes Jahr fahre ich…'],
    ['washastduvor', 'Was hast du vor?', 'O que você planeja fazer?', ''],
    ['habevorzu', 'Ich habe vor, die B1-Prüfung zu machen.', 'Pretendo fazer a prova B1.', ''],
    ['lustmitzukommen', 'Hast du Lust, mitzukommen?', 'Está a fim de vir junto?', 'Separável: mit-zu-kommen.'],
    ['klingtgut', 'Das klingt gut!', 'Parece bom!', ''],
  ]);
  G('g_a2_futur', {
    title: 'Futuro com werden', explain: '<b>werden</b> (2ª posição) + <b>infinitivo no fim</b>: Ich <b>werde</b> in Berlin <b>wohnen</b>.<br>werden: ich werde, du wirst, er wird, wir werden, ihr werdet, sie werden.<br>Para planos com data, o alemão usa muito o <b>presente</b>: Nächstes Jahr <b>fahre</b> ich nach Wien. O Futur I é comum para previsões, promessas e suposições.',
    compare: 'Equivale ao “vou + verbo”: “Vou morar em Berlim” = Ich werde in Berlin wohnen.',
    examples: [['Es wird morgen regnen.', 'Vai chover amanhã.'], ['Du wirst die Prüfung bestehen!', 'Você vai passar na prova!']],
    drills: [['Ich ___ nächstes Jahr in Berlin wohnen.', ['werde']], ['Du ___ die Prüfung bestehen!', ['wirst']], ['Es ___ morgen regnen.', ['wird']], ['Wir ___ im Sommer heiraten.', ['werden']], ['Ihr ___ viel Spaß haben.', ['werdet']], ['Was ___ du später machen?', ['wirst']]]
  });
  G('g_a2_zuinf', {
    title: 'zu + infinitivo', explain: 'Depois de verbos como <b>vorhaben, versuchen, hoffen, vergessen, anfangen</b> e de expressões como <b>Lust haben, Zeit haben, es ist wichtig</b>, o segundo verbo vai no fim com <b>zu</b>: Ich versuche, mehr <b>zu</b> lernen.<br>Verbos separáveis: o <b>zu</b> entra no meio: an<b>zu</b>fangen, mit<b>zu</b>kommen, an<b>zu</b>rufen.<br>Com modais NÃO se usa zu: Ich kann kommen.',
    compare: 'Parecido com “tento estudar mais” — mas em alemão o infinitivo vem com “zu” e no fim.',
    examples: [['Es ist wichtig, jeden Tag zu üben.', 'É importante praticar todo dia.'], ['Vergiss nicht, mich anzurufen!', 'Não se esqueça de me ligar!']],
    drills: [['Ich versuche, jeden Tag Deutsch ___ lernen.', ['zu']], ['Hast du Lust, ins Kino ___ gehen?', ['zu']], ['Ich habe vor, nächstes Jahr ___. (anfangen)', ['anzufangen']], ['Vergiss nicht, mich ___. (anrufen)', ['anzurufen']], ['Es ist wichtig, viel ___ üben.', ['zu']], ['Ich hoffe, dich bald ___ sehen.', ['zu']]]
  });

  K.finish('2026.11.20-4');
})(globalThis.GF = globalThis.GF || {});
