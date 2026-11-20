/* Currículo e conteúdo. Versionado: o banco guarda só o PROGRESSO do aluno,
 * por id; o conteúdo pode ser corrigido/ampliado sem perder histórico.
 * Exemplos são frases didáticas escritas para o nível (não corpus autêntico).
 */
(function (GF) {
  'use strict';
  const items = {};
  // N: substantivo [id, artigo, palavra, plural ('' = sem plural usual; '=' = igual), pt, ipa, exemplo de, exemplo pt]
  function N(unit, list) {
    for (const [id, art, w, pl, pt, ipa, exde, expt, note] of list) {
      items[id] = { id, unit, type: 'noun', art, de: w, pl, pt, ipa, ex: exde ? [[exde, expt]] : [], note: note || '' };
    }
  }
  // V: verbo [id, infinitivo, pt, ipa, conj {ich,du,er,wir,ihr,sie}, exemplo]
  function V(unit, list) {
    for (const [id, w, pt, ipa, c, exde, expt, note] of list) {
      const [ich, du, er, wir, ihr, sie] = c.split('|');
      items[id] = { id, unit, type: 'verb', de: w, pt, ipa, conj: { ich, du, er, wir, ihr, sie }, ex: exde ? [[exde, expt]] : [], note: note || '' };
    }
  }
  // P: frase/bloco ou palavra [id, de, pt, nota, tipo]
  function P(unit, list) {
    for (const [id, de, pt, note, type, ipa] of list) {
      items[id] = { id, unit, type: type || 'phrase', de, pt, ipa: ipa || '', ex: [], note: note || '' };
    }
  }

  /* ---------------- A1-U1 Begrüßung & Vorstellung ---------------- */
  P('A1-U1', [
    ['p_hallo', 'Hallo!', 'Olá! / Oi!', 'Informal e neutro; serve para quase todos.', 'word'],
    ['p_morgen', 'Guten Morgen!', 'Bom dia! (de manhã)', 'Até ~10–11h.'],
    ['p_tag', 'Guten Tag!', 'Bom dia! / Boa tarde! (formal)', 'Durante o dia, em situações formais.'],
    ['p_abend', 'Guten Abend!', 'Boa noite! (ao chegar)', 'Cumprimento ao encontrar alguém à noite.'],
    ['p_nacht', 'Gute Nacht!', 'Boa noite! (ao dormir/despedir)', 'Só na despedida, antes de dormir.'],
    ['p_tschuess', 'Tschüss!', 'Tchau!', 'Informal.', 'word'],
    ['p_wiedersehen', 'Auf Wiedersehen!', 'Até logo! / Adeus! (formal)', ''],
    ['p_danke', 'Danke!', 'Obrigado(a)!', '“Danke schön” é um pouco mais enfático.', 'word'],
    ['p_bitte', 'Bitte!', 'Por favor! / De nada!', '“Bitte” tem as duas funções.', 'word'],
    ['p_entschuldigung', 'Entschuldigung!', 'Com licença! / Desculpe!', '', 'word'],
    ['p_ja', 'ja', 'sim', '', 'word'],
    ['p_nein', 'nein', 'não', '', 'word'],
    ['p_wieheissensie', 'Wie heißen Sie?', 'Como o(a) senhor(a) se chama?', 'Formal (Sie).'],
    ['p_wieheisstdu', 'Wie heißt du?', 'Como você se chama?', 'Informal (du).'],
    ['p_ichheisse', 'Ich heiße Rick.', 'Eu me chamo Rick.', 'Bloco: Ich heiße + nome.'],
    ['p_ichbin', 'Ich bin Rick.', 'Eu sou o Rick.', ''],
    ['p_woherkommensie', 'Woher kommen Sie?', 'De onde o(a) senhor(a) é?', ''],
    ['p_woherkommstdu', 'Woher kommst du?', 'De onde você é?', ''],
    ['p_brasilien', 'Ich komme aus Brasilien.', 'Eu sou do Brasil.', '“aus” = de (origem).'],
    ['p_wowohnstdu', 'Wo wohnst du?', 'Onde você mora?', ''],
    ['p_ichwohne', 'Ich wohne in São Paulo.', 'Eu moro em São Paulo.', '“in” + cidade.'],
    ['p_freutmich', 'Freut mich!', 'Prazer!', 'Ao ser apresentado.'],
    ['p_wiegehts', 'Wie geht’s?', 'Como vai? / Tudo bem?', 'Informal; forma longa: Wie geht es dir?'],
    ['p_gutdanke', 'Gut, danke. Und dir?', 'Bem, obrigado. E você?', 'Formal: Und Ihnen?'],
    ['p_wiegehtesihnen', 'Wie geht es Ihnen?', 'Como o(a) senhor(a) está?', 'Formal.'],
    ['p_sprechensieenglisch', 'Sprechen Sie Englisch?', 'O(a) senhor(a) fala inglês?', ''],
    ['p_ichsprechepor', 'Ich spreche Portugiesisch.', 'Eu falo português.', 'Nomes de línguas: maiúscula.'],
    ['p_einbisschen', 'Ich spreche ein bisschen Deutsch.', 'Eu falo um pouco de alemão.', ''],
    ['p_deutsch', 'Deutsch', 'alemão (a língua)', '', 'word'],
  ]);
  N('A1-U1', [
    ['n_name', 'der', 'Name', 'Namen', 'o nome', 'ˈnaːmə', 'Mein Name ist Rick.', 'Meu nome é Rick.'],
    ['n_land', 'das', 'Land', 'Länder', 'o país', 'lant', 'Brasilien ist ein großes Land.', 'O Brasil é um país grande.'],
    ['n_stadt', 'die', 'Stadt', 'Städte', 'a cidade', 'ʃtat', 'Berlin ist eine Stadt in Deutschland.', 'Berlim é uma cidade na Alemanha.'],
    ['n_sprache', 'die', 'Sprache', 'Sprachen', 'a língua, o idioma', 'ˈʃpʁaːxə', 'Deutsch ist eine schöne Sprache.', 'Alemão é uma língua bonita.'],
  ]);
  V('A1-U1', [
    ['v_sein', 'sein', 'ser / estar', 'zaɪ̯n', 'bin|bist|ist|sind|seid|sind', 'Ich bin aus Brasilien.', 'Eu sou do Brasil.', 'Irregular — memorize como bloco.'],
    ['v_heissen', 'heißen', 'chamar-se', 'ˈhaɪ̯sn̩', 'heiße|heißt|heißt|heißen|heißt|heißen', 'Wie heißt du?', 'Como você se chama?', 'du heißt (não “heißst”).'],
    ['v_kommen', 'kommen', 'vir', 'ˈkɔmən', 'komme|kommst|kommt|kommen|kommt|kommen', 'Ich komme aus São Paulo.', 'Eu venho de São Paulo.'],
    ['v_wohnen', 'wohnen', 'morar', 'ˈvoːnən', 'wohne|wohnst|wohnt|wohnen|wohnt|wohnen', 'Wir wohnen in Berlin.', 'Nós moramos em Berlim.'],
    ['v_sprechen', 'sprechen', 'falar', 'ˈʃpʁɛçn̩', 'spreche|sprichst|spricht|sprechen|sprecht|sprechen', 'Sprichst du Deutsch?', 'Você fala alemão?', 'Muda e→i em du/er.'],
    ['v_lernen', 'lernen', 'aprender, estudar', 'ˈlɛʁnən', 'lerne|lernst|lernt|lernen|lernt|lernen', 'Ich lerne Deutsch.', 'Eu estou aprendendo alemão.'],
  ]);

  /* ---------------- A1-U2 Zahlen & Kontakt ---------------- */
  const nums = [['null', 0], ['eins', 1], ['zwei', 2], ['drei', 3], ['vier', 4], ['fünf', 5], ['sechs', 6], ['sieben', 7], ['acht', 8], ['neun', 9], ['zehn', 10], ['elf', 11], ['zwölf', 12], ['dreizehn', 13], ['vierzehn', 14], ['fünfzehn', 15], ['sechzehn', 16], ['siebzehn', 17], ['achtzehn', 18], ['neunzehn', 19], ['zwanzig', 20], ['einundzwanzig', 21], ['dreißig', 30], ['vierzig', 40], ['fünfzig', 50], ['hundert', 100]];
  P('A1-U2', nums.map(([w, n]) => ['num_' + n, w, String(n), n === 16 ? 'sechzehn (sem o “s” de sechs)' : n === 17 ? 'siebzehn (sem o “en” de sieben)' : n === 21 ? 'Unidade antes da dezena: “um-e-vinte”.' : n === 30 ? 'dreißig com ß (exceção: não “dreizig”).' : '', 'number']));
  P('A1-U2', [
    ['p_wiealt', 'Wie alt bist du?', 'Quantos anos você tem?', 'Lit.: “Quão velho você é?”'],
    ['p_jahrealt', 'Ich bin dreißig Jahre alt.', 'Eu tenho trinta anos.', 'Em alemão você “é” X anos, não “tem”.'],
    ['p_telefonnummer', 'Wie ist deine Telefonnummer?', 'Qual é o seu número de telefone?', ''],
    ['p_buchstabieren', 'Können Sie das bitte buchstabieren?', 'O(a) senhor(a) pode soletrar, por favor?', ''],
    ['p_wiederholen', 'Noch einmal, bitte.', 'Mais uma vez, por favor.', 'Essencial para pedir repetição.'],
    ['p_langsam', 'Bitte langsam!', 'Devagar, por favor!', ''],
    ['p_verstehe', 'Ich verstehe das nicht.', 'Eu não entendo isso.', ''],
  ]);
  N('A1-U2', [
    ['n_zahl', 'die', 'Zahl', 'Zahlen', 'o número', 'tsaːl', 'Die Zahl ist zu lang.', 'O número é longo demais.'],
    ['n_telefonnummer', 'die', 'Telefonnummer', 'Telefonnummern', 'o número de telefone', 'teləˈfoːnˌnʊmɐ', 'Meine Telefonnummer ist neu.', 'Meu número de telefone é novo.'],
    ['n_adresse', 'die', 'Adresse', 'Adressen', 'o endereço', 'aˈdʁɛsə', 'Wie ist Ihre Adresse?', 'Qual é o seu endereço?'],
    ['n_email', 'die', 'E-Mail', 'E-Mails', 'o e-mail', 'ˈiːmeɪ̯l', 'Ich schreibe eine E-Mail.', 'Eu escrevo um e-mail.', 'Feminino na Alemanha (na Áustria/Suíça também “das E-Mail”).'],
    ['n_jahr', 'das', 'Jahr', 'Jahre', 'o ano', 'jaːɐ̯', 'Das Jahr hat zwölf Monate.', 'O ano tem doze meses.'],
  ]);

  /* ---------------- A1-U3 Familie ---------------- */
  N('A1-U3', [
    ['n_familie', 'die', 'Familie', 'Familien', 'a família', 'faˈmiːli̯ə', 'Meine Familie wohnt in Brasilien.', 'Minha família mora no Brasil.'],
    ['n_eltern', 'die', 'Eltern', '—', 'os pais', 'ˈɛltɐn', 'Meine Eltern sind in Rio.', 'Meus pais estão no Rio.', 'Só existe no plural (artigo die de plural).'],
    ['n_mutter', 'die', 'Mutter', 'Mütter', 'a mãe', 'ˈmʊtɐ', 'Das ist meine Mutter.', 'Esta é minha mãe.'],
    ['n_vater', 'der', 'Vater', 'Väter', 'o pai', 'ˈfaːtɐ', 'Mein Vater heißt Paulo.', 'Meu pai se chama Paulo.'],
    ['n_bruder', 'der', 'Bruder', 'Brüder', 'o irmão', 'ˈbʁuːdɐ', 'Ich habe einen Bruder.', 'Eu tenho um irmão.'],
    ['n_schwester', 'die', 'Schwester', 'Schwestern', 'a irmã', 'ˈʃvɛstɐ', 'Meine Schwester ist zwanzig.', 'Minha irmã tem vinte anos.'],
    ['n_geschwister', 'die', 'Geschwister', '—', 'os irmãos (irmãos e irmãs)', 'ɡəˈʃvɪstɐ', 'Hast du Geschwister?', 'Você tem irmãos?', 'Normalmente só no plural.'],
    ['n_kind', 'das', 'Kind', 'Kinder', 'a criança, o filho', 'kɪnt', 'Wir haben zwei Kinder.', 'Nós temos dois filhos.'],
    ['n_sohn', 'der', 'Sohn', 'Söhne', 'o filho', 'zoːn', 'Ihr Sohn ist fünf.', 'O filho dela tem cinco anos.'],
    ['n_tochter', 'die', 'Tochter', 'Töchter', 'a filha', 'ˈtɔxtɐ', 'Meine Tochter lernt Deutsch.', 'Minha filha está aprendendo alemão.'],
    ['n_mann', 'der', 'Mann', 'Männer', 'o homem; o marido', 'man', 'Das ist mein Mann.', 'Este é meu marido.'],
    ['n_frau', 'die', 'Frau', 'Frauen', 'a mulher; a esposa; Sra.', 'fʁaʊ̯', 'Frau Müller kommt aus Köln.', 'A Sra. Müller é de Colônia.'],
    ['n_freund', 'der', 'Freund', 'Freunde', 'o amigo; o namorado', 'fʁɔɪ̯nt', 'Mein Freund wohnt in Hamburg.', 'Meu amigo/namorado mora em Hamburgo.', '“mein Freund” muitas vezes = namorado; “ein Freund von mir” = um amigo.'],
    ['n_freundin', 'die', 'Freundin', 'Freundinnen', 'a amiga; a namorada', 'ˈfʁɔɪ̯ndɪn', 'Meine Freundin heißt Ana.', 'Minha amiga/namorada se chama Ana.'],
  ]);
  V('A1-U3', [
    ['v_haben', 'haben', 'ter', 'ˈhaːbn̩', 'habe|hast|hat|haben|habt|haben', 'Hast du Kinder?', 'Você tem filhos?', 'Irregular em du/er: hast, hat.'],
  ]);
  P('A1-U3', [
    ['p_verheiratet', 'Ich bin verheiratet.', 'Eu sou casado(a).', ''],
    ['p_ledig', 'Ich bin ledig.', 'Eu sou solteiro(a).', 'Formulários: ledig; na fala também “Single”.'],
    ['p_dasistmeine', 'Das ist meine Schwester.', 'Esta é minha irmã.', '“Das ist” apresenta pessoas e coisas.'],
    ['p_hastdugeschwister', 'Hast du Geschwister?', 'Você tem irmãos?', ''],
  ]);

  /* ---------------- A1-U4 Im Café ---------------- */
  N('A1-U4', [
    ['n_kaffee', 'der', 'Kaffee', 'Kaffees', 'o café', 'ˈkafe', 'Der Kaffee ist heiß.', 'O café está quente.', 'Na Alemanha, tônica na 1ª sílaba; na Áustria, Kaf-FEE.'],
    ['n_tee', 'der', 'Tee', 'Tees', 'o chá', 'teː', 'Ich trinke gern Tee.', 'Eu gosto de tomar chá.'],
    ['n_wasser', 'das', 'Wasser', '', 'a água', 'ˈvasɐ', 'Ein Wasser, bitte.', 'Uma água, por favor.', 'Plural raro.'],
    ['n_milch', 'die', 'Milch', '', 'o leite', 'mɪlç', 'Kaffee mit Milch, bitte.', 'Café com leite, por favor.'],
    ['n_saft', 'der', 'Saft', 'Säfte', 'o suco', 'zaft', 'Der Saft ist kalt.', 'O suco está gelado.'],
    ['n_bier', 'das', 'Bier', 'Biere', 'a cerveja', 'biːɐ̯', 'Zwei Bier, bitte.', 'Duas cervejas, por favor.', 'Ao pedir: “zwei Bier” (sem plural).'],
    ['n_wein', 'der', 'Wein', 'Weine', 'o vinho', 'vaɪ̯n', 'Ich möchte einen Wein.', 'Eu gostaria de um vinho.'],
    ['n_brot', 'das', 'Brot', 'Brote', 'o pão', 'bʁoːt', 'Das Brot ist frisch.', 'O pão está fresco.'],
    ['n_broetchen', 'das', 'Brötchen', '=', 'o pãozinho', 'ˈbʁøːtçən', 'Ich nehme zwei Brötchen.', 'Eu levo dois pãezinhos.', '-chen → sempre das; plural igual.'],
    ['n_kuchen', 'der', 'Kuchen', '=', 'o bolo', 'ˈkuːxn̩', 'Der Kuchen ist sehr gut.', 'O bolo está muito bom.'],
    ['n_apfel', 'der', 'Apfel', 'Äpfel', 'a maçã', 'ˈapfl̩', 'Ich esse einen Apfel.', 'Eu como uma maçã.'],
    ['n_tasse', 'die', 'Tasse', 'Tassen', 'a xícara', 'ˈtasə', 'Eine Tasse Kaffee, bitte.', 'Uma xícara de café, por favor.'],
    ['n_glas', 'das', 'Glas', 'Gläser', 'o copo; o vidro', 'ɡlaːs', 'Ein Glas Wasser, bitte.', 'Um copo d’água, por favor.'],
    ['n_rechnung', 'die', 'Rechnung', 'Rechnungen', 'a conta', 'ˈʁɛçnʊŋ', 'Die Rechnung, bitte.', 'A conta, por favor.', '-ung → sempre die.'],
    ['n_euro', 'der', 'Euro', 'Euro', 'o euro', 'ˈɔɪ̯ʁo', 'Das kostet drei Euro.', 'Isso custa três euros.', 'Com números, sem plural: drei Euro.'],
  ]);
  V('A1-U4', [
    ['v_trinken', 'trinken', 'beber', 'ˈtʁɪŋkn̩', 'trinke|trinkst|trinkt|trinken|trinkt|trinken', 'Was trinkst du?', 'O que você bebe?'],
    ['v_essen', 'essen', 'comer', 'ˈɛsn̩', 'esse|isst|isst|essen|esst|essen', 'Er isst ein Brötchen.', 'Ele come um pãozinho.', 'e→i em du/er: isst.'],
    ['v_moechten', 'möchten', 'gostaria (de) / querer (educado)', 'ˈmœçtn̩', 'möchte|möchtest|möchte|möchten|möchtet|möchten', 'Ich möchte einen Tee.', 'Eu gostaria de um chá.', 'er möchte (sem -t).'],
    ['v_kosten', 'kosten', 'custar', 'ˈkɔstn̩', 'koste|kostest|kostet|kosten|kostet|kosten', 'Was kostet der Kuchen?', 'Quanto custa o bolo?'],
    ['v_bezahlen', 'bezahlen', 'pagar', 'bəˈtsaːlən', 'bezahle|bezahlst|bezahlt|bezahlen|bezahlt|bezahlen', 'Ich bezahle mit Karte.', 'Eu pago com cartão.'],
  ]);
  P('A1-U4', [
    ['p_ichmoechte', 'Ich möchte einen Kaffee, bitte.', 'Eu gostaria de um café, por favor.', 'Masculino no acusativo: einen.'],
    ['p_haettegern', 'Ich hätte gern ein Wasser.', 'Eu queria uma água.', 'Bloco fixo e educado para pedir.'],
    ['p_waskostet', 'Was kostet das?', 'Quanto custa isso?', ''],
    ['p_zahlenbitte', 'Zahlen, bitte!', 'A conta, por favor! (Quero pagar!)', ''],
    ['p_zusammen', 'Zusammen oder getrennt?', 'Junto ou separado?', 'O garçom pergunta se a conta é dividida.'],
    ['p_stimmtso', 'Stimmt so.', 'Pode ficar com o troco.', 'Forma comum de dar gorjeta.'],
    ['p_mitkarte', 'Kann ich mit Karte zahlen?', 'Posso pagar com cartão?', ''],
  ]);

  /* ---------------- A1-U5 Wohnung ---------------- */
  N('A1-U5', [
    ['n_haus', 'das', 'Haus', 'Häuser', 'a casa', 'haʊ̯s', 'Das Haus ist alt.', 'A casa é velha.'],
    ['n_wohnung', 'die', 'Wohnung', 'Wohnungen', 'o apartamento', 'ˈvoːnʊŋ', 'Die Wohnung ist hell.', 'O apartamento é claro.'],
    ['n_zimmer', 'das', 'Zimmer', '=', 'o quarto, o cômodo', 'ˈtsɪmɐ', 'Die Wohnung hat drei Zimmer.', 'O apartamento tem três cômodos.'],
    ['n_kueche', 'die', 'Küche', 'Küchen', 'a cozinha', 'ˈkʏçə', 'Die Küche ist klein.', 'A cozinha é pequena.'],
    ['n_bad', 'das', 'Bad', 'Bäder', 'o banheiro', 'baːt', 'Das Bad ist neu.', 'O banheiro é novo.'],
    ['n_tisch', 'der', 'Tisch', 'Tische', 'a mesa', 'tɪʃ', 'Der Tisch ist groß.', 'A mesa é grande.'],
    ['n_stuhl', 'der', 'Stuhl', 'Stühle', 'a cadeira', 'ʃtuːl', 'Wir brauchen vier Stühle.', 'Precisamos de quatro cadeiras.'],
    ['n_lampe', 'die', 'Lampe', 'Lampen', 'a luminária, a lâmpada', 'ˈlampə', 'Die Lampe ist kaputt.', 'A luminária está quebrada.', 'A lâmpada (bulbo) em si: die Glühbirne.'],
    ['n_fenster', 'das', 'Fenster', '=', 'a janela', 'ˈfɛnstɐ', 'Das Fenster ist offen.', 'A janela está aberta.'],
    ['n_tuer', 'die', 'Tür', 'Türen', 'a porta', 'tyːɐ̯', 'Die Tür ist zu.', 'A porta está fechada.'],
    ['n_bett', 'das', 'Bett', 'Betten', 'a cama', 'bɛt', 'Das Bett ist bequem.', 'A cama é confortável.'],
    ['n_sofa', 'das', 'Sofa', 'Sofas', 'o sofá', 'ˈzoːfa', 'Das Sofa ist sehr schön.', 'O sofá é muito bonito.'],
    ['n_schrank', 'der', 'Schrank', 'Schränke', 'o armário', 'ʃʁaŋk', 'Der Schrank ist zu klein.', 'O armário é pequeno demais.'],
  ]);
  P('A1-U5', [
    ['a_gross', 'groß', 'grande; alto', '', 'word', 'ɡʁoːs'],
    ['a_klein', 'klein', 'pequeno; baixo', '', 'word', 'klaɪ̯n'],
    ['a_neu', 'neu', 'novo', '', 'word', 'nɔɪ̯'],
    ['a_alt', 'alt', 'velho; antigo', '', 'word', 'alt'],
    ['a_schoen', 'schön', 'bonito', '', 'word', 'ʃøːn'],
    ['a_teuer', 'teuer', 'caro', '', 'word', 'ˈtɔɪ̯ɐ'],
    ['a_billig', 'billig', 'barato', 'Também “günstig” (mais positivo).', 'word', 'ˈbɪlɪç'],
    ['a_hell', 'hell', 'claro, iluminado', '', 'word', 'hɛl'],
    ['p_keintisch', 'Das ist kein Tisch.', 'Isso não é uma mesa.', 'kein nega substantivos com ein/sem artigo.'],
    ['p_nichtteuer', 'Die Wohnung ist nicht teuer.', 'O apartamento não é caro.', 'nicht nega adjetivos e verbos.'],
    ['p_wieviele', 'Wie viele Zimmer hat die Wohnung?', 'Quantos cômodos tem o apartamento?', ''],
  ]);

  /* ---------------- Gramática ---------------- */
  const grammar = {
    g_sein: {
      title: 'O verbo sein (ser/estar)', level: 'A1', unit: 'A1-U1',
      explain: 'Em alemão, <b>sein</b> cobre “ser” e “estar”. É irregular — aprenda como blocos:<br><b>ich bin · du bist · er/sie/es ist · wir sind · ihr seid · sie/Sie sind</b>.',
      compare: 'Português distingue ser/estar; alemão não: “Ich bin müde” (estou cansado) e “Ich bin Lehrer” (sou professor) usam o mesmo verbo. Profissões vêm sem artigo: “Ich bin Lehrer”, não “ein Lehrer”.',
      examples: [['Ich bin aus Brasilien.', 'Sou do Brasil.'], ['Bist du müde?', 'Você está cansado?'], ['Wir sind in Berlin.', 'Estamos em Berlim.']],
      drills: [
        ['Ich ___ Rick.', ['bin'], 'eu → bin'], ['Du ___ aus Brasilien.', ['bist']], ['Er ___ Lehrer.', ['ist']],
        ['Wir ___ in München.', ['sind']], ['Ihr ___ sehr nett.', ['seid'], 'ihr = vocês (informal)'], ['___ Sie Frau Weber?', ['sind'], 'Sie formal = forma de “sie” plural'],
      ]
    },
    g_praesens: {
      title: 'Presente dos verbos regulares', level: 'A1', unit: 'A1-U1',
      explain: 'Radical + terminação: <b>wohn-en</b> → ich wohn<b>e</b>, du wohn<b>st</b>, er wohn<b>t</b>, wir wohn<b>en</b>, ihr wohn<b>t</b>, sie/Sie wohn<b>en</b>.<br>Radical terminado em -s/-ß/-z: du heiß<b>t</b> (não “heißst”). Radical em -t/-d: du arbeit<b>est</b>, er arbeit<b>et</b>.',
      compare: 'Como no português, a terminação muda por pessoa — mas o pronome é obrigatório: “Wohne in Rio” está errado; diga “Ich wohne in Rio”.',
      examples: [['Wo wohnst du?', 'Onde você mora?'], ['Sie kommt aus Spanien.', 'Ela é da Espanha.'], ['Wir lernen Deutsch.', 'Nós aprendemos alemão.']],
      drills: [
        ['Ich ___ (wohnen) in Rio.', ['wohne']], ['Du ___ (kommen) aus Brasilien.', ['kommst']], ['Er ___ (lernen) Deutsch.', ['lernt']],
        ['Wie ___ (heißen) du?', ['heißt', 'heisst'], 'radical em ß: só -t'], ['Wir ___ (wohnen) in Köln.', ['wohnen']], ['Ihr ___ (kommen) aus Italien.', ['kommt']],
        ['Du ___ (sprechen) gut Deutsch.', ['sprichst'], 'sprechen muda e→i'],
      ]
    },
    g_v2: {
      title: 'Posição do verbo: V2 e perguntas', level: 'A1', unit: 'A1-U1',
      explain: 'Em frases afirmativas, o verbo conjugado fica na <b>2ª posição</b>: “Ich <b>wohne</b> in Rio.” / “In Rio <b>wohne</b> ich.”<br>Perguntas com W- (wer, wie, wo, woher, was): W-palavra + verbo + sujeito: “Wo <b>wohnst</b> du?”<br>Perguntas sim/não: verbo na 1ª posição: “<b>Wohnst</b> du in Rio?”',
      compare: 'Em português podemos dizer “Em Rio eu moro”; em alemão, se algo vem antes, o sujeito passa para depois do verbo: “In Rio wohne ich.”',
      examples: [['Heute lerne ich Deutsch.', 'Hoje eu estudo alemão.'], ['Woher kommst du?', 'De onde você é?'], ['Sprechen Sie Deutsch?', 'O senhor fala alemão?']],
      order: [
        ['Wo wohnst du?', 'Onde você mora?'], ['Ich komme aus Brasilien.', 'Eu sou do Brasil.'], ['Heute lerne ich Deutsch.', 'Hoje eu estudo alemão.'],
        ['Sprichst du Englisch?', 'Você fala inglês?'], ['In Berlin wohnt meine Schwester.', 'Em Berlim mora minha irmã.'],
      ],
      drills: []
    },
    g_du_sie: {
      title: 'du ou Sie?', level: 'A1', unit: 'A1-U1',
      explain: '<b>du</b>: amigos, família, crianças, colegas que oferecem o “du”, internet. <b>Sie</b> (sempre maiúsculo): desconhecidos adultos, atendimento, trabalho formal. O verbo de “Sie” é igual ao de “sie” (eles).',
      compare: 'Parecido com “você” vs. “o senhor/a senhora”, mas o Sie é bem mais usado no dia a dia alemão do que “o senhor” no Brasil.',
      examples: [['Wie heißen Sie?', 'Como o senhor se chama?'], ['Wie heißt du?', 'Como você se chama?']],
      drills: [['(formal) Woher ___ Sie?', ['kommen']], ['(informal) Woher ___ du?', ['kommst']], ['(formal) Wie geht es ___?', ['Ihnen']], ['(informal) Wie geht es ___?', ['dir']]]
    },
    g_zahlen: {
      title: 'Números', level: 'A1', unit: 'A1-U2',
      explain: '13–19: unidade + <b>zehn</b> (dreizehn). Atenção: <b>sechzehn, siebzehn</b>. Dezenas em -<b>zig</b>, mas <b>dreißig</b>. De 21 a 99 a unidade vem primeiro: <b>einundzwanzig</b> (um-e-vinte), <b>fünfundvierzig</b>.',
      compare: 'É como dizer “um e vinte” em vez de “vinte e um”. Treine bastante a escuta: é uma dificuldade real ao ouvir telefones e preços.',
      examples: [['Ich bin einundzwanzig.', 'Tenho 21 anos.'], ['Das kostet fünfzehn Euro.', 'Custa 15 euros.']],
      drills: [['23 = ___', ['dreiundzwanzig']], ['16 = ___', ['sechzehn']], ['17 = ___', ['siebzehn']], ['30 = ___', ['dreißig', 'dreissig']], ['45 = ___', ['fünfundvierzig', 'fuenfundvierzig']], ['12 = ___', ['zwölf', 'zwoelf']]]
    },
    g_haben: {
      title: 'O verbo haben (ter)', level: 'A1', unit: 'A1-U3',
      explain: '<b>ich habe · du hast · er/sie/es hat · wir haben · ihr habt · sie/Sie haben</b>. Note: hast e hat perdem o “b”.',
      compare: 'Idade não usa “haben”: “Ich bin 30” (sou 30), não “Ich habe 30”.',
      examples: [['Ich habe eine Schwester.', 'Tenho uma irmã.'], ['Hat sie Kinder?', 'Ela tem filhos?']],
      drills: [['Ich ___ zwei Brüder.', ['habe']], ['Du ___ eine Schwester.', ['hast']], ['Sie (ela) ___ ein Kind.', ['hat']], ['Wir ___ keine Kinder.', ['haben']], ['Ihr ___ eine große Familie.', ['habt']]]
    },
    g_possessiv: {
      title: 'Possessivos: mein / meine, dein / deine', level: 'A1', unit: 'A1-U3',
      explain: 'O possessivo concorda com o <b>substantivo possuído</b>: der/das → <b>mein</b> (mein Vater, mein Kind); die/plural → <b>meine</b> (meine Mutter, meine Eltern). Igual: dein/deine, sein (dele)/seine, ihr (dela)/ihre, Ihr (do senhor)/Ihre.',
      compare: 'Como “meu/minha” em português, mas a concordância é com o gênero ALEMÃO da palavra: “mein Kind” (das), mesmo sendo filha.',
      examples: [['Das ist mein Bruder.', 'Este é meu irmão.'], ['Das sind meine Eltern.', 'Estes são meus pais.']],
      drills: [['Das ist ___ Vater. (meu)', ['mein']], ['Das ist ___ Mutter. (meu/minha)', ['meine']], ['Das ist ___ Kind. (meu)', ['mein']], ['Das sind ___ Geschwister. (meus)', ['meine']], ['Ist das ___ Schwester? (sua, du)', ['deine']]]
    },
    g_artikel: {
      title: 'Artigos definidos e indefinidos (nominativo)', level: 'A1', unit: 'A1-U4',
      explain: '<b>der</b> → <b>ein</b> · <b>das</b> → <b>ein</b> · <b>die</b> → <b>eine</b> · plural <b>die</b> → (sem artigo indefinido).<br>Aprenda sempre o substantivo COM o artigo: o gênero quase nunca é dedutível do português (die Milch, o leite; der Tisch, a mesa).',
      compare: 'Português tem 2 gêneros, alemão tem 3. Não traduza o gênero: “a mesa” → <b>der</b> Tisch.',
      examples: [['Das ist ein Apfel.', 'Isto é uma maçã.'], ['Das ist eine Tasse.', 'Isto é uma xícara.'], ['Das ist ein Glas.', 'Isto é um copo.']],
      drills: [['Das ist ___ Kuchen. (um)', ['ein']], ['Das ist ___ Rechnung. (uma)', ['eine']], ['Das ist ___ Brötchen. (um)', ['ein']], ['___ Kaffee ist heiß. (o)', ['der']], ['___ Milch ist kalt. (o)', ['die']], ['___ Wasser ist gut. (a)', ['das']]]
    },
    g_akk: {
      title: 'Acusativo (objeto direto) — introdução', level: 'A1', unit: 'A1-U4',
      explain: 'O objeto direto fica no acusativo. Só o <b>masculino</b> muda: der → <b>den</b>, ein → <b>einen</b>, kein → <b>keinen</b>. Feminino, neutro e plural ficam iguais.<br>“Ich möchte <b>einen</b> Kaffee / <b>eine</b> Cola / <b>ein</b> Wasser.”',
      compare: 'Português marca isso só em pronomes (eu → me). Em alemão, o artigo muda: “Der Kaffee ist gut” (sujeito) / “Ich trinke den Kaffee” (objeto).',
      examples: [['Ich esse einen Apfel.', 'Como uma maçã.'], ['Er trinkt den Saft.', 'Ele bebe o suco.']],
      drills: [['Ich möchte ___ Tee. (um, der Tee)', ['einen']], ['Ich möchte ___ Tasse Kaffee. (uma)', ['eine']], ['Ich nehme ___ Brötchen. (um)', ['ein']], ['Er isst ___ Kuchen. (o)', ['den']], ['Wir trinken ___ Wein. (um)', ['einen']], ['Sie bezahlt ___ Rechnung. (a)', ['die']]]
    },
    g_kein_nicht: {
      title: 'Negação: kein ou nicht?', level: 'A1', unit: 'A1-U5',
      explain: '<b>kein/keine</b> nega substantivos que teriam <i>ein</i> ou nenhum artigo: “Das ist <b>kein</b> Tisch.” “Ich habe <b>keine</b> Kinder.”<br><b>nicht</b> nega verbos, adjetivos e substantivos com artigo definido: “Die Wohnung ist <b>nicht</b> teuer.” “Ich wohne <b>nicht</b> in Berlin.”',
      compare: 'Português usa “não” para tudo. Pergunte-se: eu diria “um/uma” ou nada antes do substantivo? Então é kein.',
      examples: [['Ich habe kein Auto.', 'Não tenho carro.'], ['Das Bett ist nicht bequem.', 'A cama não é confortável.']],
      drills: [['Das ist ___ Stuhl. (não é uma cadeira)', ['kein']], ['Das ist ___ Lampe.', ['keine']], ['Die Küche ist ___ groß.', ['nicht']], ['Ich habe ___ Geschwister.', ['keine']], ['Wir wohnen ___ in Hamburg.', ['nicht']]]
    },
    g_genus: {
      title: 'Pistas de gênero (tendências, não regras absolutas)', level: 'A1', unit: 'A1-U5',
      explain: 'Confiáveis: <b>-ung, -heit, -keit, -ion, -schaft</b> → die (die Wohnung). <b>-chen, -lein</b> → das (das Brötchen). Pessoas masculinas → der; femininas → die (exceção: das Mädchen, por causa de -chen).<br>Tendência: muitas palavras em <b>-e</b> são femininas (die Lampe), mas não todas (der Name, das Auge).',
      compare: 'Não existe regra que cubra todas as palavras: por isso o app nunca ensina substantivo sem artigo.',
      examples: [['die Rechnung', 'a conta'], ['das Brötchen', 'o pãozinho'], ['die Küche', 'a cozinha']],
      drills: [['___ Wohnung', ['die']], ['___ Mädchen', ['das']], ['___ Zeitung (jornal)', ['die']], ['___ Häuschen (casinha)', ['das']], ['___ Freiheit (liberdade)', ['die']]]
    },
  };
  // normaliza drills
  for (const g of Object.values(grammar)) g.drills = g.drills.map(([q, a, hint]) => ({ q, a, hint: hint || '' }));

  /* ---------------- Unidades ---------------- */
  const units = {
    'A0-P': {
      id: 'A0-P', level: 'A0', title: 'Sons do alemão', subtitle: 'Alfabeto, vogais, Umlauts, ch, r',
      goals: ['Ler em voz alta palavras novas com regras de pronúncia previsíveis', 'Distinguir vogais longas/curtas e Umlauts ao ouvir', 'Reconhecer ich-Laut vs ach-Laut'],
      prereq: [], grammar: [], pron: ['pr1', 'pr2', 'pr3', 'pr4', 'pr5', 'pr6'],
      criteria: 'Discriminação auditiva ≥ 80% em pares mínimos e todas as 6 lições concluídas.'
    },
    'A1-U1': {
      id: 'A1-U1', level: 'A1', title: 'Hallo! Wer bist du?', subtitle: 'Cumprimentos e apresentação',
      goals: ['Cumprimentar e se despedir (formal/informal)', 'Dizer nome, origem, cidade e línguas', 'Perguntar essas informações a outra pessoa'],
      prereq: [], grammar: ['g_sein', 'g_praesens', 'g_v2', 'g_du_sie'],
      dialog: [['A', 'Hallo! Ich bin Lena. Wie heißt du?'], ['B', 'Hallo, Lena! Ich heiße Rick.'], ['A', 'Freut mich! Woher kommst du?'], ['B', 'Ich komme aus Brasilien. Und du?'], ['A', 'Ich komme aus Hamburg. Wo wohnst du?'], ['B', 'Ich wohne in São Paulo.']],
      dialogPt: 'Lena e Rick se apresentam: nome, origem e cidade.',
      listening: ['Ich heiße Lena.', 'Woher kommst du?', 'Ich wohne in Berlin.', 'Wie geht es Ihnen?', 'Ich spreche ein bisschen Deutsch.'],
      writing: 'Escreva 4–5 frases se apresentando: nome, de onde você é, onde mora, que línguas fala.',
      speaking: { scene: 'Uma festa de boas-vindas num curso de alemão em Hamburgo. Você conhece Lena, uma colega.', persona: 'Lena, 28, de Hamburgo, simpática, fala devagar', goals: ['cumprimentar', 'dizer nome', 'dizer origem e cidade', 'perguntar algo à Lena', 'despedir-se'] },
      criteria: '≥ 90% dos itens no nível “lembra”; gramática ≥ 80%; ditado ≥ 75%; 1 conversa concluída; texto aprovado; checkpoint ≥ 80% (≥ 70% em cada habilidade).'
    },
    'A1-U2': {
      id: 'A1-U2', level: 'A1', title: 'Zahlen und Kontakt', subtitle: 'Números, idade, telefone, pedir repetição',
      goals: ['Entender e dizer números 0–100', 'Dizer e perguntar idade, telefone e e-mail', 'Pedir para repetir, soletrar e falar devagar'],
      prereq: ['A1-U1'], grammar: ['g_zahlen'],
      dialog: [['A', 'Wie ist deine Telefonnummer?'], ['B', 'Null, eins, sieben, drei, vier, fünf, neun, zwei.'], ['A', 'Noch einmal, bitte. Langsam!'], ['B', 'Null – eins – sieben – drei – vier – fünf – neun – zwei.'], ['A', 'Danke! Und wie alt bist du?'], ['B', 'Ich bin dreißig.']],
      dialogPt: 'Troca de número de telefone e idade.',
      listening: ['Ich bin vierundzwanzig Jahre alt.', 'Das kostet siebzehn Euro.', 'Meine Nummer ist null, eins, sechs, acht.', 'Noch einmal, bitte.', 'Können Sie das buchstabieren?'],
      writing: 'Preencha em frases: sua idade, seu número fictício (por extenso, 4 dígitos) e seu e-mail. Inclua um pedido de repetição.',
      speaking: { scene: 'Você liga para uma escola de idiomas em Munique para se inscrever. A secretária pede seus dados.', persona: 'Herr Bauer, secretário formal (usa Sie), paciente', goals: ['dizer nome e soletrar', 'dizer idade', 'dizer telefone', 'pedir repetição pelo menos uma vez'] },
      criteria: 'Mesmos critérios da unidade + ditado de números ≥ 80%.'
    },
    'A1-U3': {
      id: 'A1-U3', level: 'A1', title: 'Meine Familie', subtitle: 'Família, haben, possessivos',
      goals: ['Apresentar membros da família', 'Dizer se tem irmãos/filhos e estado civil', 'Usar mein/meine corretamente'],
      prereq: ['A1-U2'], grammar: ['g_haben', 'g_possessiv'],
      dialog: [['A', 'Ist das deine Familie?'], ['B', 'Ja, das ist meine Mutter und das ist mein Vater.'], ['A', 'Hast du Geschwister?'], ['B', 'Ja, ich habe einen Bruder. Er wohnt in Lissabon.'], ['A', 'Und hast du Kinder?'], ['B', 'Nein, ich habe keine Kinder.']],
      dialogPt: 'Conversando sobre uma foto de família.',
      listening: ['Das ist meine Schwester.', 'Mein Vater heißt Carlos.', 'Hast du Geschwister?', 'Wir haben zwei Kinder.', 'Ich bin verheiratet.'],
      writing: 'Descreva sua família em 5 frases (quem é, como se chama, onde mora, idade).',
      speaking: { scene: 'Você mostra fotos da sua família para um vizinho alemão.', persona: 'Jonas, 35, vizinho curioso, informal (du)', goals: ['apresentar 3 pessoas', 'dizer idade de alguém', 'responder sobre irmãos', 'perguntar sobre a família dele'] },
      criteria: 'Mesmos critérios; possessivos ≥ 80%.'
    },
    'A1-U4': {
      id: 'A1-U4', level: 'A1', title: 'Im Café', subtitle: 'Pedir, perguntar preço, pagar',
      goals: ['Pedir comida e bebida educadamente', 'Perguntar e entender preços', 'Pagar e dar gorjeta'],
      prereq: ['A1-U3'], grammar: ['g_artikel', 'g_akk'],
      dialog: [['A', 'Guten Tag! Was möchten Sie?'], ['B', 'Ich hätte gern einen Kaffee und ein Stück Kuchen.'], ['A', 'Mit Milch?'], ['B', 'Ja, bitte. Was kostet das?'], ['A', 'Das macht sechs Euro achtzig.'], ['B', 'Sieben, bitte. Stimmt so.']],
      dialogPt: 'Pedido num café e pagamento com gorjeta.',
      listening: ['Ich möchte einen Tee, bitte.', 'Das macht neun Euro fünfzig.', 'Zusammen oder getrennt?', 'Kann ich mit Karte zahlen?', 'Ein Glas Wasser, bitte.'],
      writing: 'Escreva o diálogo de um pedido: cumprimentar, pedir 2 coisas, perguntar o preço, pagar.',
      speaking: { scene: 'Um café em Berlim. Você pede algo para beber e comer e paga.', persona: 'Garçonete Frau Kaya, formal (Sie), rápida mas gentil', goals: ['cumprimentar', 'pedir bebida com einen/eine/ein', 'pedir comida', 'perguntar o preço', 'pagar'] },
      criteria: 'Mesmos critérios; acusativo (einen) ≥ 80% e preços no ditado ≥ 75%.'
    },
    'A1-U5': {
      id: 'A1-U5', level: 'A1', title: 'Meine Wohnung', subtitle: 'Casa, móveis, adjetivos, negação',
      goals: ['Descrever onde mora e seus cômodos', 'Usar adjetivos simples', 'Negar com kein e nicht'],
      prereq: ['A1-U4'], grammar: ['g_kein_nicht', 'g_genus'],
      dialog: [['A', 'Wie ist deine Wohnung?'], ['B', 'Sie ist klein, aber sehr hell.'], ['A', 'Wie viele Zimmer hat sie?'], ['B', 'Zwei Zimmer, eine Küche und ein Bad.'], ['A', 'Ist sie teuer?'], ['B', 'Nein, sie ist nicht teuer.']],
      dialogPt: 'Descrevendo o apartamento.',
      listening: ['Die Wohnung hat drei Zimmer.', 'Das Sofa ist neu.', 'Die Küche ist nicht groß.', 'Das ist kein Schrank.', 'Das Fenster ist offen.'],
      writing: 'Descreva sua casa/apartamento em 5–6 frases com pelo menos 3 adjetivos e uma negação.',
      speaking: { scene: 'Você procura um quarto em Leipzig e liga para o anunciante para perguntar sobre o apartamento.', persona: 'Frau Schulz, dona do apartamento, formal (Sie)', goals: ['perguntar quantos cômodos', 'perguntar o preço', 'perguntar sobre a cozinha ou o banheiro', 'usar kein ou nicht'] },
      criteria: 'Mesmos critérios; kein/nicht ≥ 80%. Conclui o Módulo A1.1 — libera simulado parcial.'
    },
  };
  // amarra itens às unidades
  for (const u of Object.values(units)) u.items = Object.values(items).filter((i) => i.unit === u.id).map((i) => i.id);

  /* ---------------- Pronúncia (A0) ---------------- */
  const pron = {
    pr1: {
      title: 'Vogais longas e curtas', explain: 'A duração da vogal muda o significado. Longa: vogal + h (wohnen), vogal dupla (Beet), ie (Miete), ou vogal + 1 consoante. Curta: geralmente antes de 2 consoantes (Bett, Mitte).',
      words: [['Miete', 'ˈmiːtə', 'aluguel'], ['Mitte', 'ˈmɪtə', 'meio'], ['Beet', 'beːt', 'canteiro'], ['Bett', 'bɛt', 'cama'], ['Staat', 'ʃtaːt', 'Estado'], ['Stadt', 'ʃtat', 'cidade'], ['Ofen', 'ˈoːfn̩', 'forno'], ['offen', 'ˈɔfn̩', 'aberto']],
      pairs: [['Miete', 'Mitte'], ['Beet', 'Bett'], ['Staat', 'Stadt'], ['Ofen', 'offen']]
    },
    pr2: {
      title: 'Umlauts: ä, ö, ü', explain: 'ä ≈ “é” aberto (longo em Käse). ö: posição de língua de “ê”, lábios arredondados de “ô”. ü: língua em “i”, lábios em “u”. Não existem em português — exagere o arredondamento dos lábios.',
      words: [['schon', 'ʃoːn', 'já'], ['schön', 'ʃøːn', 'bonito'], ['Mutter', 'ˈmʊtɐ', 'mãe'], ['Mütter', 'ˈmʏtɐ', 'mães'], ['vier', 'fiːɐ̯', 'quatro'], ['für', 'fyːɐ̯', 'para'], ['lesen', 'ˈleːzn̩', 'ler'], ['lösen', 'ˈløːzn̩', 'resolver']],
      pairs: [['schon', 'schön'], ['Mutter', 'Mütter'], ['vier', 'für'], ['lesen', 'lösen']]
    },
    pr3: {
      title: 'Ditongos: ei, ie, eu/äu, au', explain: '<b>ei</b> = “ai” (mein). <b>ie</b> = “i” longo (Liebe). <b>eu/äu</b> = “ói” (neu, Häuser). <b>au</b> = “au” (Haus). Cuidado com a armadilha clássica: ei e ie parecem iguais, mas leider (“lai-der”) e Lieder (“lii-der”) são palavras diferentes.',
      words: [['leider', 'ˈlaɪ̯dɐ', 'infelizmente'], ['Lieder', 'ˈliːdɐ', 'canções'], ['neu', 'nɔɪ̯', 'novo'], ['Haus', 'haʊ̯s', 'casa'], ['Häuser', 'ˈhɔɪ̯zɐ', 'casas'], ['Wein', 'vaɪ̯n', 'vinho'], ['wie', 'viː', 'como']],
      pairs: [['leider', 'Lieder'], ['Wein', 'wie']]
    },
    pr4: {
      title: 'ch, sch, sp/st', explain: '<b>ich-Laut</b> [ç]: depois de e, i, ä, ö, ü, ei, eu e consoantes — som chiado suave (como “rr” sussurrado em “i”): ich, Milch. <b>ach-Laut</b> [x]: depois de a, o, u, au — som de “rr” carioca no fundo da garganta: Buch, Nacht. <b>sch</b> = “ch” de “chave”. <b>sp/st</b> no início = “chp/cht”: Sprache, Stuhl.',
      words: [['ich', 'ɪç', 'eu'], ['Milch', 'mɪlç', 'leite'], ['Buch', 'buːx', 'livro'], ['Bücher', 'ˈbyːçɐ', 'livros'], ['Kirche', 'ˈkɪʁçə', 'igreja'], ['Kirsche', 'ˈkɪʁʃə', 'cereja'], ['Sprache', 'ˈʃpʁaːxə', 'língua'], ['Stuhl', 'ʃtuːl', 'cadeira']],
      pairs: [['Kirche', 'Kirsche'], ['Buch', 'Bücher']]
    },
    pr5: {
      title: 'Consoantes traiçoeiras', explain: '<b>w</b> = “v” (Wasser). <b>v</b> = “f” na maioria (Vater). <b>z</b> = “ts” (Zimmer). <b>s</b> antes de vogal = “z” (Sofa). <b>j</b> = “i” semivogal (ja). <b>ß/ss</b> = “s”. <b>Ensurdecimento final</b>: b, d, g no fim viram p, t, k (Tag [taːk], Kind [kɪnt]). <b>r</b> no fim (-er) vira um “a” fraco [ɐ]: Vater [ˈfaːtɐ].',
      words: [['Wasser', 'ˈvasɐ', 'água'], ['Vater', 'ˈfaːtɐ', 'pai'], ['Zimmer', 'ˈtsɪmɐ', 'quarto'], ['Sofa', 'ˈzoːfa', 'sofá'], ['ja', 'jaː', 'sim'], ['Tag', 'taːk', 'dia'], ['Kind', 'kɪnt', 'criança'], ['Zoo', 'tsoː', 'zoológico'], ['so', 'zoː', 'assim']],
      pairs: [['Zoo', 'so'], ['Wein', 'Bein']]
    },
    pr6: {
      title: 'Acento e melodia', explain: 'Palavras nativas: acento na 1ª sílaba (ARbeit, WOHnung). Prefixos separáveis são tônicos (ANrufen); inseparáveis não (beZAHlen). Estrangeirismos variam (FamIlie → fa-MI-li-e). Perguntas W- descem no final; perguntas sim/não sobem.',
      words: [['Arbeit', 'ˈaʁbaɪ̯t', 'trabalho'], ['bezahlen', 'bəˈtsaːlən', 'pagar'], ['Familie', 'faˈmiːli̯ə', 'família'], ['Adresse', 'aˈdʁɛsə', 'endereço']],
      pairs: []
    },
  };

  /* ---------------- Mapa do currículo A0–C2 ----------------
   * Descritores parafraseados da escala global do CEFR (Conselho da Europa, 2020)
   * e horas de referência do Goethe-Institut (UE de 45 min). */
  const levels = [
    { id: 'A0', name: 'Fundamentos', hours: '≈ 10–15 h', canDo: ['Pronunciar e ler as palavras de forma previsível', 'Entender cumprimentos e números isolados'], modules: [{ title: 'Sons do alemão', units: ['A0-P'] }], exam: '—' },
    {
      id: 'A1', name: 'Comunicação básica', hours: 'Goethe: ≈ 60–150 h (80–200 UE)', exam: 'Goethe-Zertifikat A1: Start Deutsch 1',
      canDo: ['Entender e usar expressões cotidianas muito frequentes', 'Apresentar-se e fazer/responder perguntas pessoais simples', 'Interagir de forma simples se o outro falar devagar e ajudar'],
      matrix: { 'Hören': 'Anúncios e diálogos curtos, números, preços, horários', 'Lesen': 'Placas, formulários, mensagens curtas', 'Schreiben': 'Formulários, mensagens curtas (≈30 palavras)', 'Sprechen': 'Apresentar-se, pedir/dar informações simples', 'Grammatik': 'Presente, V2, artigos, acusativo, modais, verbos separáveis, Perfekt básico', 'Wortschatz': '≈ 650 palavras (lista Goethe A1 como referência)', 'Aussprache': 'Sistema vocálico, Umlauts, ch, r, acento', 'Landeskunde': 'Cumprimentos, du/Sie, cafés, compras, moradia' },
      modules: [
        { title: 'A1.1 — Primeiros contatos', units: ['A1-U1', 'A1-U2', 'A1-U3', 'A1-U4', 'A1-U5'] },
        { title: 'A1.2 — Rotina e cidade', units: [], planned: ['Horários e rotina (verbos separáveis)', 'Compras e roupas', 'Na cidade: direções (Dativ com preposições)', 'Tempo livre (modais können/wollen/müssen)', 'O que eu fiz (Perfekt básico)', 'Saúde e corpo', 'Simulado Start Deutsch 1'] },
      ]
    },
    {
      id: 'A2', name: 'Situações cotidianas', hours: 'Goethe: ≈ 150–260 h acumuladas', exam: 'Goethe-Zertifikat A2',
      canDo: ['Entender frases sobre áreas de relevância imediata', 'Comunicar-se em tarefas rotineiras de troca direta', 'Descrever passado, formação e ambiente com meios simples'],
      matrix: { 'Grammatik': 'Perfekt completo, Präteritum de sein/haben/modais, Dativ, preposições de duas vias, comparativo, weil/dass/wenn, reflexivos' },
      modules: [{ title: 'A2 — Vida prática', units: [], planned: ['Trabalho e profissões', 'Viagens e transporte', 'Médico e saúde', 'Festas e tradições', 'Mídia e tecnologia', 'Simulado A2'] }]
    },
    {
      id: 'B1', name: 'Independência comunicativa', hours: 'Goethe: ≈ 260–490 h acumuladas', exam: 'Goethe-Zertifikat B1',
      canDo: ['Entender os pontos principais de assuntos familiares em linguagem padrão', 'Lidar com a maioria das situações de viagem', 'Relatar experiências, planos e justificar opiniões brevemente'],
      matrix: { 'Grammatik': 'Präteritum, Plusquamperfekt, Passiv (presente), Konjunktiv II (würde/hätte/wäre), orações relativas, Genitiv, declinação do adjetivo completa' },
      modules: [{ title: 'B1 — Independência', units: [], planned: ['Moradia e vizinhança', 'Educação e carreira', 'Relações e sociedade', 'Consumo e meio ambiente', 'Simulado B1'] }]
    },
    {
      id: 'B2', name: 'Comunicação independente e complexa', hours: 'Goethe: ≈ 450–600 h acumuladas', exam: 'Goethe-Zertifikat B2',
      canDo: ['Entender ideias principais de textos complexos, inclusive técnicos na sua área', 'Interagir com fluência e espontaneidade com falantes nativos', 'Produzir textos claros e detalhados defendendo um ponto de vista'],
      matrix: { 'Grammatik': 'Passiv em todos os tempos, Konjunktiv I (discurso indireto), particípios como adjetivo, conectores avançados, nominalização' },
      modules: [{ title: 'B2 — Complexidade', units: [], planned: ['Argumentação e debate', 'Trabalho e economia', 'Ciência e tecnologia', 'Mídia e notícias autênticas', 'Simulado B2'] }]
    },
    {
      id: 'C1', name: 'Fluência avançada', hours: 'Goethe: ≈ 600–750 h acumuladas', exam: 'Goethe-Zertifikat C1',
      canDo: ['Entender textos longos e exigentes, inclusive sentidos implícitos', 'Expressar-se fluentemente sem procurar palavras de forma óbvia', 'Usar a língua de forma flexível em contextos sociais, acadêmicos e profissionais'],
      matrix: { 'Grammatik': 'Estilo nominal, Funktionsverbgefüge, Partizipialattribute longos, registro e coesão' },
      modules: [{ title: 'C1 — Precisão e registro', units: [], planned: ['Textos acadêmicos', 'Comunicação profissional', 'Literatura e cultura', 'Simulado C1'] }]
    },
    {
      id: 'C2', name: 'Domínio altamente sofisticado', hours: 'Goethe: ≈ 750+ h acumuladas', exam: 'Goethe-Zertifikat C2: Großes Deutsches Sprachdiplom',
      canDo: ['Entender praticamente tudo que lê ou ouve', 'Resumir e reconstruir argumentos de várias fontes', 'Expressar nuances finas de significado com precisão'],
      matrix: { 'Grammatik': 'Variação estilística, variedades regionais (Áustria/Suíça), idiomatismo' },
      modules: [{ title: 'C2 — Maestria', units: [], planned: ['Nuance e estilo', 'Variedades do alemão', 'Simulado GDS'] }]
    },
  ];

  const unitOrder = ['A0-P', 'A1-U1', 'A1-U2', 'A1-U3', 'A1-U4', 'A1-U5'];

  GF.content = { version: '2026.11.20-1', items, grammar, units, unitOrder, pron, levels };
})(globalThis.GF = globalThis.GF || {});
