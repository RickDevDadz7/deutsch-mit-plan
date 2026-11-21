/* Conteúdo fixo B2 — parte 2 (B2-U4 a B2-U6). */
(function (GF) {
  'use strict';
  const K = GF.kitB2;
  const { unit, N, V, P, G } = K;

  /* ======================= B2-U4 Nachrichten ======================= */
  unit('B2-U4', {
    title: 'Nachrichten', subtitle: 'Notícias, fontes confiáveis e discurso indireto',
    goals: ['Entender os pontos principais de uma notícia de rádio ou TV', 'Contar o que outra pessoa disse sem se comprometer (discurso indireto)', 'Avaliar se uma informação é confiável e de onde ela vem'],
    dialog: [['A', 'Hast du die Meldung über den Brand im Hafen gesehen?'], ['B', 'Ja, in der Zeitung stand, das Feuer sei in einer Lagerhalle ausgebrochen.'], ['A', 'Laut Polizei gebe es keine Verletzten. Aber die Ursache sei noch unklar.'], ['B', 'In den sozialen Medien behaupten manche, es sei Brandstiftung gewesen.'], ['A', 'Das ist bisher nur ein Gerücht. Die Ermittlungen laufen noch.'], ['B', 'Stimmt. Ich warte lieber auf eine offizielle Stellungnahme, bevor ich etwas teile.'], ['A', 'Gute Idee. Falschmeldungen verbreiten sich leider schneller als die Wahrheit.']],
    dialogPt: 'Dois amigos comentam um incêndio no porto e separam fatos de boatos.',
    listening: ['Der Sprecher sagte, die Regierung habe die Pläne geändert.', 'Laut Polizei gebe es keine Verletzten.', 'Die Ursache des Brandes sei noch unklar.', 'Das Ministerium hat die Meldung bestätigt.', 'Die Zeugen berichteten, sie hätten einen lauten Knall gehört.'],
    writing: 'Resuma por escrito (≈ 120 palavras) uma notícia que você ouviu ou leu esta semana (tagesschau, DW…). Conte o que aconteceu e o que as pessoas envolvidas disseram, usando o discurso indireto (Konjunktiv I) pelo menos 4 vezes. Diga qual foi a fonte.',
    speaking: { scene: 'Na pausa do café, uma colega conta uma “notícia” que leu no celular. Você pergunta pela fonte e conta o que os jornais sérios disseram.', persona: 'Jana, colega, fala rápido e acredita em tudo (du)', goals: ['perguntar de onde vem a informação', 'contar o que a polícia ou o jornal disse (discurso indireto)', 'apontar uma diferença entre o boato e a notícia', 'sugerir onde verificar'] },
    criteria: 'Critérios padrão; Konjunktiv I ≥ 80%.',
    authentic: ['tagesschau in 100 Sekunden (app/YouTube): o resumo do dia em menos de 2 minutos', 'DW „Langsam gesprochene Nachrichten“: notícias de verdade lidas mais devagar, com texto', 'nachrichtenleicht.de: notícias da semana em linguagem simples, boas para checar se você entendeu'],
    reading: {
      title: 'Wie erkennt man Falschmeldungen?',
      text: ['Jeden Tag werden in sozialen Netzwerken Millionen Nachrichten geteilt. Viele davon sind korrekt, doch ein Teil ist irreführend oder komplett erfunden. Experten sagen, Falschmeldungen verbreiteten sich oft schneller als seriöse Berichte, weil sie starke Gefühle wie Wut oder Angst auslösen.', 'Wer eine Meldung prüfen will, sollte zuerst nach der Quelle fragen: Wer hat die Information veröffentlicht, und gibt es ein Impressum? Außerdem lohnt es sich, die Schlagzeile in eine Suchmaschine einzugeben. Wenn kein bekanntes Medium darüber berichtet, ist Vorsicht geboten.', 'Auch Fotos können täuschen. Ein Bild, das angeblich einen aktuellen Vorfall zeigt, stammt manchmal aus einem ganz anderen Jahr. Mit einer umgekehrten Bildersuche lässt sich das schnell herausfinden. Die wichtigste Regel lautet: erst prüfen, dann teilen.'],
      questions: [['Warum verbreiten sich Falschmeldungen laut Experten so schnell?', ['Weil sie starke Gefühle auslösen', 'Weil sie besser geschrieben sind', 'Weil Journalisten sie teilen'], 0], ['Was sollte man zuerst prüfen?', ['Die Quelle der Information', 'Die Länge des Textes', 'Die Zahl der Likes'], 0], ['Wofür ist die umgekehrte Bildersuche nützlich?', ['Um herauszufinden, woher ein Foto wirklich stammt', 'Um Fotos schöner zu machen', 'Um Fotos zu löschen'], 0]]
    }
  });
  N([
    ['meldung', 'die', 'Meldung', 'Meldungen', 'a notícia curta, o comunicado', 'ˈmɛldʊŋ', 'Die Meldung kam am Abend im Radio.', 'A notícia saiu à noite no rádio.'],
    ['schlagzeile', 'die', 'Schlagzeile', 'Schlagzeilen', 'a manchete', 'ˈʃlaːkˌtsaɪ̯lə', 'Der Skandal machte Schlagzeilen.', 'O escândalo virou manchete.'],
    ['quelle', 'die', 'Quelle', 'Quellen', 'a fonte', 'ˈkvɛlə', 'Aus welcher Quelle stammt die Information?', 'De que fonte vem a informação?', 'Também: fonte de água.'],
    ['geruecht', 'das', 'Gerücht', 'Gerüchte', 'o boato', 'ɡəˈʁʏçt', 'Das ist nur ein Gerücht.', 'Isso é só um boato.'],
    ['falschmeldung', 'die', 'Falschmeldung', 'Falschmeldungen', 'a notícia falsa (fake news)', 'ˈfalʃˌmɛldʊŋ', 'Die Falschmeldung wurde tausendfach geteilt.', 'A notícia falsa foi compartilhada milhares de vezes.'],
    ['stellungnahme', 'die', 'Stellungnahme', 'Stellungnahmen', 'o posicionamento oficial, a nota', 'ˈʃtɛlʊŋˌnaːmə', 'Die Firma hat noch keine Stellungnahme abgegeben.', 'A empresa ainda não se pronunciou.'],
    ['pressekonferenz', 'die', 'Pressekonferenz', 'Pressekonferenzen', 'a entrevista coletiva', 'ˈpʁɛsəkɔnfeˌʁɛnts', 'Auf der Pressekonferenz wurden viele Fragen gestellt.', 'Na coletiva foram feitas muitas perguntas.'],
    ['sprecher', 'der', 'Sprecher', '=', 'o porta-voz; o locutor', 'ˈʃpʁɛçɐ', 'Ein Sprecher der Polizei bestätigte den Unfall.', 'Um porta-voz da polícia confirmou o acidente.'],
    ['aussage', 'die', 'Aussage', 'Aussagen', 'a declaração; o depoimento', 'ˈaʊ̯sˌzaːɡə', 'Nach Aussage des Ministers bleibt alles wie bisher.', 'Segundo a declaração do ministro, tudo fica como está.'],
    ['augenzeuge', 'der', 'Augenzeuge', 'Augenzeugen', 'a testemunha ocular', 'ˈaʊ̯ɡn̩ˌtsɔɪ̯ɡə', 'Mehrere Augenzeugen haben den Unfall gesehen.', 'Várias testemunhas viram o acidente.', 'Declinação fraca: den/dem/des Augenzeugen.'],
    ['vorfall', 'der', 'Vorfall', 'Vorfälle', 'o incidente', 'ˈfoːɐ̯ˌfal', 'Die Polizei untersucht den Vorfall.', 'A polícia investiga o incidente.'],
    ['ermittlung', 'die', 'Ermittlung', 'Ermittlungen', 'a investigação (policial)', 'ɛɐ̯ˈmɪtlʊŋ', 'Die Ermittlungen laufen noch.', 'As investigações ainda estão em andamento.', 'Quase sempre no plural.'],
    ['ereignis', 'das', 'Ereignis', 'Ereignisse', 'o acontecimento', 'ɛɐ̯ˈʔaɪ̯ɡnɪs', 'Das war das wichtigste Ereignis des Jahres.', 'Esse foi o acontecimento mais importante do ano.'],
    ['ursache', 'die', 'Ursache', 'Ursachen', 'a causa', 'ˈuːɐ̯ˌzaxə', 'Die Ursache des Brandes ist noch unklar.', 'A causa do incêndio ainda não está clara.'],
    ['berichterstattung', 'die', 'Berichterstattung', '', 'a cobertura jornalística', 'bəˈʁɪçtʔɛɐ̯ˌʃtatʊŋ', 'Die Berichterstattung war sehr einseitig.', 'A cobertura foi muito parcial.'],
    ['korrespondent', 'der', 'Korrespondent', 'Korrespondenten', 'o correspondente', 'kɔʁɛspɔnˈdɛnt', 'Unser Korrespondent in Brasília berichtet.', 'Nosso correspondente em Brasília informa.', 'Declinação fraca: den Korrespondenten.'],
  ]);
  V([
    ['mitteilen', 'mitteilen', 'comunicar, informar', 'ˈmɪtˌtaɪ̯lən', 'teile mit|teilst mit|teilt mit|teilen mit|teilt mit|teilen mit', 'Die Firma teilte mit, sie werde Stellen abbauen.', 'A empresa informou que vai cortar vagas.'],
    ['bestaetigen', 'bestätigen', 'confirmar', 'bəˈʃtɛːtɪɡn̩', 'bestätige|bestätigst|bestätigt|bestätigen|bestätigt|bestätigen', 'Die Polizei hat die Meldung bestätigt.', 'A polícia confirmou a notícia.'],
    ['dementieren', 'dementieren', 'desmentir', 'demɛnˈtiːʁən', 'dementiere|dementierst|dementiert|dementieren|dementiert|dementieren', 'Der Minister dementierte die Gerüchte.', 'O ministro desmentiu os boatos.'],
    ['zitieren', 'zitieren', 'citar', 'tsiˈtiːʁən', 'zitiere|zitierst|zitiert|zitieren|zitiert|zitieren', 'Die Zeitung zitiert einen anonymen Mitarbeiter.', 'O jornal cita um funcionário anônimo.'],
    ['ermitteln', 'ermitteln', 'investigar (polícia, promotoria)', 'ɛɐ̯ˈmɪtl̩n', 'ermittle|ermittelst|ermittelt|ermitteln|ermittelt|ermitteln', 'Die Staatsanwaltschaft ermittelt gegen den Politiker.', 'A promotoria investiga o político.', 'ermitteln gegen + acusativo.'],
    ['betonen', 'betonen', 'ressaltar, enfatizar', 'bəˈtoːnən', 'betone|betonst|betont|betonen|betont|betonen', 'Sie betonte, dass niemand verletzt wurde.', 'Ela ressaltou que ninguém se feriu.'],
  ]);
  P([
    ['seriös', 'seriös', 'sério, confiável (fonte)', '', 'word', 'zeˈʁi̯øːs'],
    ['irrefuehrend', 'irreführend', 'enganoso', '', 'word', 'ˈɪʁəˌfyːʁənt'],
    ['lautpolizei', 'Laut Polizei gibt es keine Verletzten.', 'Segundo a polícia, não há feridos.', 'Na notícia aparece com Konjunktiv I: gebe es.'],
    ['nochunklar', 'Die Ursache ist noch unklar.', 'A causa ainda não está clara.', ''],
    ['erstpruefen', 'Erst prüfen, dann teilen.', 'Primeiro verificar, depois compartilhar.', ''],
    ['woher', 'Woher hast du das?', 'De onde você tirou isso?', ''],
    ['angaben', 'nach eigenen Angaben', 'segundo informações próprias (da pessoa/empresa)', 'Típico de notícias.'],
  ]);
  G('g_b2_konj1', {
    title: 'Konjunktiv I: o discurso indireto das notícias', explain: 'In Nachrichten wird mit dem <b>Konjunktiv I</b> wiedergegeben, was jemand gesagt hat — ohne zu sagen, ob es stimmt.<br>Forma: radical do infinitivo + <b>-e</b> (3ª pessoa é a mais usada): er komm<b>e</b>, er hab<b>e</b>, er könn<b>e</b>, er werd<b>e</b>.<br><b>sein</b> é irregular: ich sei, du seist, er <b>sei</b>, wir <b>seien</b>, sie <b>seien</b>.<br>Passado: <b>habe/sei</b> + Partizip II: Er sagte, er <b>habe</b> nichts gewusst.<br>Quando o Konjunktiv I é igual ao indicativo (ex.: sie haben), usa-se o <b>Konjunktiv II</b>: Sie sagten, sie <b>hätten</b> nichts gewusst.',
    compare: 'O português marca a distância com o tempo verbal (“disse que estava doente”). O alemão das notícias usa o Konjunktiv I: Er sagte, er <b>sei</b> krank.',
    examples: [['Der Minister sagte, er sei nicht informiert worden.', 'O ministro disse que não tinha sido informado.'], ['Die Zeugen berichteten, sie hätten einen Knall gehört.', 'As testemunhas contaram que ouviram um estrondo.']],
    drills: [['Der Minister sagte, er ___ krank. (sein)', ['sei']], ['Sie behauptet, sie ___ nichts gewusst. (haben)', ['habe']], ['Die Sprecher sagten, sie ___ keine Fehler gemacht. (haben, plural)', ['hätten']], ['Er erklärte, er ___ morgen nach Berlin. (fahren)', ['fahre']], ['Laut Polizei ___ der Täter geflohen. (sein)', ['sei']], ['Sie sagt, sie ___ das Problem lösen. (können)', ['könne']], ['Die Firma teilte mit, die Preise ___ steigen. (werden)', ['würden']]]
  });
  G('g_b2_konj1_order', {
    title: 'Montar frases em discurso indireto', explain: 'Monte as frases. Depois de “sagte”, a oração indireta pode vir sem dass (verbo na 2ª posição) ou com dass (verbo no fim).',
    compare: 'Er sagte, er sei krank = Er sagte, dass er krank sei. As duas estão certas.',
    examples: [['Sie sagte, sie habe keine Zeit.', 'Ela disse que não tinha tempo.']],
    order: [['Der Sprecher sagte, die Firma habe keine Fehler gemacht.', 'O porta-voz disse que a empresa não cometeu erros.'], ['Laut Polizei gebe es keine Verletzten.', 'Segundo a polícia, não há feridos.'], ['Sie betonte, dass niemand verletzt worden sei.', 'Ela ressaltou que ninguém tinha se ferido.'], ['Der Minister erklärte, er werde zurücktreten.', 'O ministro declarou que vai renunciar.'], ['Die Zeugen berichteten, sie hätten einen Knall gehört.', 'As testemunhas contaram que ouviram um estrondo.']]
  });

  /* ======================= B2-U5 Gesellschaft ======================= */
  unit('B2-U5', {
    title: 'Gesellschaft', subtitle: 'Sociedade, política e participação',
    goals: ['Entender e comentar temas sociais (desigualdade, integração, voluntariado)', 'Explicar como funciona a participação política na Alemanha', 'Usar preposições com genitivo típicas da linguagem formal'],
    dialog: [['A', 'Hast du schon gehört? Innerhalb der nächsten Monate soll das Jugendzentrum geschlossen werden.'], ['B', 'Aufgrund der Sparmaßnahmen der Stadt, oder? Das ist wirklich schade.'], ['A', 'Ein paar Nachbarn haben eine Bürgerinitiative gegründet. Sie sammeln Unterschriften.'], ['B', 'Gute Idee. Statt nur zu meckern, sollten wir uns auch engagieren.'], ['A', 'Nächste Woche gibt es eine Abstimmung im Stadtrat. Wir können zur Sitzung gehen.'], ['B', 'Angesichts der vielen Kinder im Viertel braucht man das Zentrum dringend.'], ['A', 'Genau. Ich trage mich gleich in die Liste ein.']],
    dialogPt: 'Dois vizinhos se mobilizam contra o fechamento do centro de jovens do bairro.',
    listening: ['Aufgrund der hohen Kosten wurde das Projekt gestoppt.', 'Innerhalb einer Woche wurden tausend Unterschriften gesammelt.', 'Viele Menschen engagieren sich ehrenamtlich.', 'Die Gleichberechtigung ist im Grundgesetz verankert.', 'Statt eines neuen Parkplatzes wünschen sich die Bürger einen Park.'],
    writing: 'Goethe B2, Schreiben Teil 2 (formal): escreva uma carta (≈ 150 palavras) à prefeitura sobre um problema do seu bairro. Descreva o problema, diga a quem ele afeta, faça duas propostas e peça uma resposta. Use pelo menos 3 preposições com genitivo (aufgrund, innerhalb, statt, angesichts…).',
    speaking: { scene: 'Reunião aberta da associação de bairro: você apresenta a ideia de uma horta comunitária e responde às dúvidas.', persona: 'Herr Wagner, presidente da associação, cético com os custos (Sie)', goals: ['apresentar a ideia e o motivo', 'dizer quem seria beneficiado', 'responder à dúvida sobre custos com uma proposta', 'convidar as pessoas a participar'] },
    criteria: 'Critérios padrão; preposições com genitivo ≥ 80%.',
    authentic: ['bpb.de (Bundeszentrale für politische Bildung): explicações sobre política e sociedade, inclusive em linguagem simples', 'logo! (ZDF): notícias para jovens, frases curtas e claras', 'Wahl-O-Mat (bpb): veja as perguntas antes de uma eleição; ótimo vocabulário político'],
    reading: {
      title: 'Ehrenamt in Deutschland',
      text: ['Rund jeder dritte Mensch in Deutschland engagiert sich ehrenamtlich, also ohne Bezahlung. Manche trainieren Kinder im Sportverein, andere helfen bei der Tafel, wo Lebensmittel an bedürftige Menschen verteilt werden. Auch die freiwillige Feuerwehr funktioniert in vielen Dörfern nur dank Ehrenamtlichen.', 'Für viele Zugewanderte ist ein Ehrenamt eine gute Möglichkeit, Kontakte zu knüpfen und die Sprache im Alltag zu üben. Gleichzeitig zeigt es, dass man Teil der Gesellschaft sein möchte.', 'Allerdings klagen viele Vereine über Nachwuchsprobleme. Aufgrund von Zeitmangel und flexiblen Arbeitszeiten wollen sich besonders junge Menschen nicht langfristig verpflichten. Deshalb bieten immer mehr Organisationen kurze Projekte an, bei denen man innerhalb weniger Wochen helfen kann.'],
      questions: [['Was bedeutet „ehrenamtlich“?', ['Ohne Bezahlung', 'Mit gutem Gehalt', 'Nur am Wochenende'], 0], ['Warum ist ein Ehrenamt laut Text gut für Zugewanderte?', ['Man knüpft Kontakte und übt die Sprache.', 'Man bekommt schneller ein Visum.', 'Man verdient zusätzliches Geld.'], 0], ['Wie reagieren viele Organisationen auf das Nachwuchsproblem?', ['Sie bieten kurze Projekte an.', 'Sie zahlen ein Gehalt.', 'Sie schließen ihre Vereine.'], 0]]
    }
  });
  N([
    ['gleichberechtigung', 'die', 'Gleichberechtigung', '', 'a igualdade de direitos', 'ˈɡlaɪ̯çbəˌʁɛçtɪɡʊŋ', 'Die Gleichberechtigung von Frauen und Männern steht im Grundgesetz.', 'A igualdade entre mulheres e homens está na Constituição.'],
    ['grundgesetz', 'das', 'Grundgesetz', '', 'a Constituição alemã', 'ˈɡʁʊntɡəˌzɛts', 'Das Grundgesetz trat 1949 in Kraft.', 'A Constituição entrou em vigor em 1949.'],
    ['demokratie', 'die', 'Demokratie', 'Demokratien', 'a democracia', 'demokʁaˈtiː', 'In einer Demokratie entscheidet das Volk.', 'Numa democracia, o povo decide.'],
    ['buergerinitiative', 'die', 'Bürgerinitiative', 'Bürgerinitiativen', 'a iniciativa de cidadãos, o movimento local', 'ˈbʏʁɡɐʔinitsi̯aˌtiːvə', 'Die Bürgerinitiative kämpft gegen den Lärm.', 'O movimento dos moradores luta contra o barulho.'],
    ['abstimmung', 'die', 'Abstimmung', 'Abstimmungen', 'a votação', 'ˈapˌʃtɪmʊŋ', 'Die Abstimmung findet am Montag statt.', 'A votação acontece na segunda.'],
    ['ehrenamt', 'das', 'Ehrenamt', 'Ehrenämter', 'o trabalho voluntário', 'ˈeːʁənˌʔamt', 'Sie hat ein Ehrenamt im Sportverein.', 'Ela faz trabalho voluntário no clube.'],
    ['armut', 'die', 'Armut', '', 'a pobreza', 'ˈaʁmuːt', 'Die Armut im Land ist gestiegen.', 'A pobreza no país aumentou.'],
    ['ungleichheit', 'die', 'Ungleichheit', 'Ungleichheiten', 'a desigualdade', 'ˈʊnɡlaɪ̯çhaɪ̯t', 'Die soziale Ungleichheit ist ein großes Thema.', 'A desigualdade social é um grande tema.'],
    ['minderheit', 'die', 'Minderheit', 'Minderheiten', 'a minoria', 'ˈmɪndɐhaɪ̯t', 'Die Rechte von Minderheiten müssen geschützt werden.', 'Os direitos das minorias precisam ser protegidos.'],
    ['vielfalt', 'die', 'Vielfalt', '', 'a diversidade', 'ˈfiːlˌfalt', 'Die kulturelle Vielfalt macht die Stadt interessant.', 'A diversidade cultural deixa a cidade interessante.'],
    ['wohlstand', 'der', 'Wohlstand', '', 'a prosperidade, o bem-estar econômico', 'ˈvoːlˌʃtant', 'Der Wohlstand ist ungleich verteilt.', 'A prosperidade está distribuída de forma desigual.'],
    ['partei', 'die', 'Partei', 'Parteien', 'o partido (político)', 'paʁˈtaɪ̯', 'Welche Partei hat die Wahl gewonnen?', 'Que partido venceu a eleição?'],
    ['stadtrat', 'der', 'Stadtrat', 'Stadträte', 'a câmara municipal; o vereador', 'ˈʃtatˌʁaːt', 'Der Stadtrat hat das Projekt beschlossen.', 'A câmara municipal aprovou o projeto.'],
    ['unterschrift', 'die', 'Unterschrift', 'Unterschriften', 'a assinatura', 'ˈʊntɐˌʃʁɪft', 'Wir haben über tausend Unterschriften gesammelt.', 'Juntamos mais de mil assinaturas.'],
    ['massnahme', 'die', 'Maßnahme', 'Maßnahmen', 'a medida (providência)', 'ˈmaːsˌnaːmə', 'Die Regierung plant neue Maßnahmen gegen die Armut.', 'O governo planeja novas medidas contra a pobreza.'],
    ['teilhabe', 'die', 'Teilhabe', '', 'a participação, a inclusão', 'ˈtaɪ̯lˌhaːbə', 'Bildung ermöglicht gesellschaftliche Teilhabe.', 'A educação possibilita a participação na sociedade.'],
  ]);
  V([
    ['abstimmen', 'abstimmen', 'votar (sobre algo)', 'ˈapˌʃtɪmən', 'stimme ab|stimmst ab|stimmt ab|stimmen ab|stimmt ab|stimmen ab', 'Morgen stimmt der Rat über den Plan ab.', 'Amanhã o conselho vota o plano.', 'abstimmen über + acusativo.'],
    ['sichengagieren', 'sich engagieren', 'engajar-se', 'zɪç ãɡaˈʒiːʁən', 'engagiere mich|engagierst dich|engagiert sich|engagieren uns|engagiert euch|engagieren sich', 'Er engagiert sich für den Umweltschutz.', 'Ele se engaja pela proteção ambiental.', 'sich engagieren für + acusativo.'],
    ['fordern', 'fordern', 'exigir, reivindicar', 'ˈfɔʁdɐn', 'fordere|forderst|fordert|fordern|fordert|fordern', 'Die Gewerkschaft fordert höhere Löhne.', 'O sindicato reivindica salários maiores.'],
    ['beschliessen', 'beschließen', 'decidir, aprovar (formalmente)', 'bəˈʃliːsn̩', 'beschließe|beschließt|beschließt|beschließen|beschließt|beschließen', 'Das Parlament hat ein neues Gesetz beschlossen.', 'O parlamento aprovou uma nova lei.', 'Perfekt: hat beschlossen.'],
    ['demonstrieren', 'demonstrieren', 'protestar, manifestar-se', 'demɔnˈstʁiːʁən', 'demonstriere|demonstrierst|demonstriert|demonstrieren|demonstriert|demonstrieren', 'Tausende demonstrierten für mehr Klimaschutz.', 'Milhares protestaram por mais proteção ao clima.'],
    ['benachteiligen', 'benachteiligen', 'prejudicar, discriminar', 'bəˈnaːxˌtaɪ̯lɪɡn̩', 'benachteilige|benachteiligst|benachteiligt|benachteiligen|benachteiligt|benachteiligen', 'Niemand darf wegen seiner Herkunft benachteiligt werden.', 'Ninguém pode ser prejudicado por causa da origem.'],
  ]);
  P([
    ['ehrenamtlich', 'ehrenamtlich', 'voluntário (sem pagamento)', '', 'word', 'ˈeːʁənˌʔamtlɪç'],
    ['beduerftig', 'bedürftig', 'necessitado, carente', '', 'word', 'bəˈdʏʁftɪç'],
    ['gesellschaftlich', 'gesellschaftlich', 'social (da sociedade)', '', 'word', 'ɡəˈzɛlʃaftlɪç'],
    ['eintragen', 'Ich trage mich in die Liste ein.', 'Vou colocar meu nome na lista.', 'sich eintragen (separável).'],
    ['meckern', 'Statt zu meckern, sollten wir etwas tun.', 'Em vez de reclamar, deveríamos fazer algo.', 'meckern = reclamar (coloquial).'],
    ['inkraft', 'in Kraft treten', 'entrar em vigor', ''],
    ['kontakte', 'Kontakte knüpfen', 'fazer contatos', ''],
  ]);
  G('g_b2_genitivpraep', {
    title: 'Preposições com genitivo (linguagem formal)', explain: 'Diese Präpositionen stehen mit dem <b>Genitiv</b> und sind typisch für Nachrichten, Briefe und Prüfungen:<br>• <b>aufgrund</b> (por causa de, devido a) · <b>infolge</b> (em consequência de)<br>• <b>innerhalb</b> (dentro de, em até) · <b>außerhalb</b> (fora de)<br>• <b>statt / anstatt</b> (em vez de)<br>• <b>trotz</b> (apesar de) · <b>während</b> (durante) · <b>wegen</b> (por causa de)<br>• <b>angesichts</b> (diante de, considerando)<br>Genitivo: des/eines (masc./neutro, + -s/-es no substantivo), der/einer (fem. e plural).',
    compare: 'Na fala do dia a dia muitos alemães usam dativo com wegen/trotz (wegen dem Wetter). Na escrita e na prova, use genitivo: wegen <b>des</b> Wetter<b>s</b>.',
    examples: [['Aufgrund des Streiks fallen alle Züge aus.', 'Devido à greve, todos os trens são cancelados.'], ['Bitte antworten Sie innerhalb einer Woche.', 'Por favor, responda em até uma semana.']],
    drills: [['___ des schlechten Wetters wurde das Fest abgesagt. (devido a)', ['aufgrund', 'wegen', 'infolge']], ['Bitte antworten Sie ___ einer Woche. (em até)', ['innerhalb']], ['___ eines Autos kaufte er ein Fahrrad. (em vez de)', ['statt', 'anstatt']], ['___ der Stadt gibt es viele Felder. (fora de)', ['außerhalb']], ['Innerhalb ___ Woche müssen Sie zahlen. (uma)', ['einer']], ['Aufgrund ___ Streiks fahren keine Busse. (o)', ['des']], ['Trotz ___ Regens gingen wir spazieren. (a chuva)', ['des']]]
  });
  G('g_b2_genitivpraep_order', {
    title: 'Montar frases formais com genitivo', explain: 'Monte as frases. A preposição com genitivo costuma abrir a frase; aí o verbo vem logo depois.',
    compare: 'Aufgrund der Kosten <b>wurde</b> das Projekt gestoppt: o verbo continua na 2ª posição.',
    examples: [['Aufgrund der hohen Kosten wurde das Projekt gestoppt.', 'Devido aos custos altos, o projeto foi interrompido.']],
    order: [['Aufgrund der hohen Kosten wurde das Projekt gestoppt.', 'Devido aos custos altos, o projeto foi interrompido.'], ['Innerhalb einer Woche wurden tausend Unterschriften gesammelt.', 'Em uma semana foram coletadas mil assinaturas.'], ['Statt eines Parkplatzes wünschen sich die Bürger einen Park.', 'Em vez de um estacionamento, os moradores querem um parque.'], ['Angesichts der vielen Kinder braucht man das Zentrum.', 'Considerando as muitas crianças, o centro é necessário.'], ['Außerhalb der Stadt ist die Miete günstiger.', 'Fora da cidade o aluguel é mais barato.']]
  });

  /* ======================= B2-U6 Kunst und Kultur ======================= */
  unit('B2-U6', {
    title: 'Kunst und Kultur', subtitle: 'Teatro, museus, música e crítica cultural',
    goals: ['Descrever e avaliar uma obra, uma peça ou um show', 'Ler e escrever uma crítica curta', 'Usar verbos com preposição e as palavras da-/wo- (darauf, worüber…)'],
    dialog: [['A', 'Wie fandest du die Inszenierung gestern im Theater?'], ['B', 'Ehrlich gesagt hatte ich mich mehr darauf gefreut. Die Bühne war beeindruckend, aber das Stück war zu lang.'], ['A', 'Worüber hast du dich am meisten geärgert?'], ['B', 'Darüber, dass man die Schauspieler hinten kaum verstehen konnte.'], ['A', 'Ich habe mich eher für die Musik begeistert. Der Komponist ist ja noch sehr jung.'], ['B', 'Stimmt, darüber stand gestern auch eine Kritik im Feuilleton.'], ['A', 'Nächsten Monat gibt es eine Ausstellung über die Epoche des Stücks. Hast du Lust?'], ['B', 'Daran hätte ich wirklich Interesse. Lass uns zusammen hingehen!']],
    dialogPt: 'Dois amigos comentam uma peça de teatro e combinam de ir a uma exposição.',
    listening: ['Worauf wartest du noch?', 'Ich interessiere mich sehr für moderne Kunst.', 'Die Kritik im Feuilleton war ziemlich negativ.', 'Das Publikum hat lange applaudiert.', 'Daran habe ich gar nicht gedacht.'],
    writing: 'Escreva uma crítica (≈ 150 palavras) de um filme, série, show ou exposição que você viu. Descreva a obra, diga o que achou da atuação/música/imagens, o que o incomodou e para quem você recomenda. Use pelo menos 4 palavras da-/wo- ou verbos com preposição.',
    speaking: { scene: 'Vocês querem escolher um programa cultural para o fim de semana em Berlim. Cada um defende uma opção.', persona: 'Lukas, amigo, prefere shows e acha museu chato (du)', goals: ['propor um programa e dizer por que você se interessa por ele', 'perguntar pelo que ele se interessa (wofür, worauf)', 'reagir a uma objeção dele', 'chegar a uma decisão juntos'] },
    criteria: 'Critérios padrão; da-/wo-Wörter ≥ 80%.',
    authentic: ['ARD Mediathek „ttt – titel, thesen, temperamente“: magazine cultural com reportagens curtas', 'Deutschlandfunk Kultur „Fazit“: críticas de teatro, livros e música', 'Museumsinsel Berlin e Städel (Frankfurt): sites e áudio-guias em alemão'],
    reading: {
      title: 'Kritik: „Der Besuch der alten Dame“ am Stadttheater',
      text: ['Mit großer Spannung hatte das Publikum auf die neue Inszenierung von Friedrich Dürrenmatts Klassiker gewartet. Und die junge Regisseurin enttäuscht nicht: Sie verlegt die Handlung in eine heutige Kleinstadt, in der alle von einer reichen Investorin abhängig sind.', 'Besonders beeindruckend ist das Bühnenbild. Eine riesige, sich langsam drehende Leinwand zeigt Videos aus den sozialen Medien, die das Geschehen kommentieren. Auch die Hauptdarstellerin überzeugt: Sie spielt die alte Dame kühl, fast ohne Gefühle, und gerade dadurch wirkt sie bedrohlich.', 'Schwächen hat der Abend dennoch. Die Musik ist an manchen Stellen so laut, dass man die Dialoge kaum versteht, und nach der Pause verliert das Stück an Tempo. Trotzdem lohnt sich der Besuch für alle, die sich für modernes Theater interessieren. Das Publikum dankte mit langem Applaus.'],
      questions: [['Wo spielt die neue Inszenierung?', ['In einer heutigen Kleinstadt', 'Im 19. Jahrhundert', 'In einer Großstadt in Amerika'], 0], ['Was lobt die Kritik besonders?', ['Das Bühnenbild mit der drehenden Leinwand', 'Die kurze Dauer des Stücks', 'Die leise Musik'], 0], ['Was ist eine Schwäche des Abends?', ['Wegen der lauten Musik versteht man die Dialoge schlecht.', 'Die Hauptdarstellerin ist schwach.', 'Das Publikum ist früh gegangen.'], 0]]
    }
  });
  N([
    ['gemaelde', 'das', 'Gemälde', '=', 'a pintura, o quadro', 'ɡəˈmɛːldə', 'Das Gemälde hängt im Städel Museum.', 'O quadro está no Museu Städel.'],
    ['skulptur', 'die', 'Skulptur', 'Skulpturen', 'a escultura', 'skʊlpˈtuːɐ̯', 'Im Park stehen moderne Skulpturen.', 'No parque há esculturas modernas.'],
    ['vorhang', 'der', 'Vorhang', 'Vorhänge', 'a cortina', 'ˈfoːɐ̯ˌhaŋ', 'Der Vorhang fällt, und alle applaudieren.', 'A cortina desce, e todos aplaudem.'],
    ['auffuehrung', 'die', 'Aufführung', 'Aufführungen', 'a apresentação (de uma peça, concerto)', 'ˈaʊ̯fˌfyːʁʊŋ', 'Die Aufführung beginnt um 19:30 Uhr.', 'A apresentação começa às 19h30.'],
    ['inszenierung', 'die', 'Inszenierung', 'Inszenierungen', 'a encenação, a montagem', 'ɪnstseˈniːʁʊŋ', 'Die neue Inszenierung ist sehr modern.', 'A nova montagem é muito moderna.'],
    ['applaus', 'der', 'Applaus', '', 'o aplauso', 'aˈplaʊ̯s', 'Am Ende gab es langen Applaus.', 'No fim houve um longo aplauso.'],
    ['kritiker', 'der', 'Kritiker', '=', 'o crítico', 'ˈkʁiːtikɐ', 'Die Kritiker loben das neue Album.', 'Os críticos elogiam o novo álbum.', 'Feminino: die Kritikerin.'],
    ['feuilleton', 'das', 'Feuilleton', 'Feuilletons', 'o caderno de cultura (do jornal)', 'fœjəˈtɔ̃ː', 'Im Feuilleton stand eine lange Kritik.', 'No caderno de cultura saiu uma crítica longa.', 'Palavra francesa: “fêi-e-tõ”.'],
    ['werk', 'das', 'Werk', 'Werke', 'a obra; a fábrica', 'vɛʁk', 'Das ist das bekannteste Werk von Brecht.', 'Essa é a obra mais conhecida de Brecht.'],
    ['komponist', 'der', 'Komponist', 'Komponisten', 'o compositor', 'kɔmpoˈnɪst', 'Beethoven ist der berühmteste Komponist aus Bonn.', 'Beethoven é o compositor mais famoso de Bonn.', 'Declinação fraca: den Komponisten.'],
    ['epoche', 'die', 'Epoche', 'Epochen', 'a época, o período', 'eˈpɔxə', 'Die Romantik war eine wichtige Epoche.', 'O Romantismo foi um período importante.'],
    ['denkmal', 'das', 'Denkmal', 'Denkmäler', 'o monumento', 'ˈdɛŋkˌmaːl', 'Das Denkmal erinnert an die Opfer des Krieges.', 'O monumento lembra as vítimas da guerra.'],
    ['buehnenbild', 'das', 'Bühnenbild', 'Bühnenbilder', 'o cenário (de teatro)', 'ˈbyːnənˌbɪlt', 'Das Bühnenbild war sehr kreativ.', 'O cenário foi muito criativo.'],
    ['leinwand', 'die', 'Leinwand', 'Leinwände', 'a tela (de pintura ou cinema)', 'ˈlaɪ̯nˌvant', 'Der Film läuft auf einer riesigen Leinwand.', 'O filme passa numa tela enorme.'],
    ['darsteller', 'der', 'Darsteller', '=', 'o ator, o intérprete', 'ˈdaːɐ̯ˌʃtɛlɐ', 'Der Hauptdarsteller hat einen Preis gewonnen.', 'O ator principal ganhou um prêmio.', 'Feminino: die Darstellerin.'],
    ['stipendium', 'das', 'Stipendium', 'Stipendien', 'a bolsa (de estudos)', 'ʃtiˈpɛndi̯ʊm', 'Sie hat ein Stipendium für Berlin bekommen.', 'Ela ganhou uma bolsa para Berlim.'],
  ]);
  V([
    ['sichbegeistern', 'sich begeistern', 'entusiasmar-se', 'zɪç bəˈɡaɪ̯stɐn', 'begeistere mich|begeisterst dich|begeistert sich|begeistern uns|begeistert euch|begeistern sich', 'Er begeistert sich für Jazz.', 'Ele é apaixonado por jazz.', 'sich begeistern für + acusativo.'],
    ['inszenieren', 'inszenieren', 'encenar, montar (peça)', 'ɪnstseˈniːʁən', 'inszeniere|inszenierst|inszeniert|inszenieren|inszeniert|inszenieren', 'Sie hat das Stück völlig neu inszeniert.', 'Ela montou a peça de um jeito totalmente novo.'],
    ['ausstellen', 'ausstellen', 'expor; emitir (documento)', 'ˈaʊ̯sˌʃtɛlən', 'stelle aus|stellst aus|stellt aus|stellen aus|stellt aus|stellen aus', 'Das Museum stellt Werke von Kandinsky aus.', 'O museu expõe obras de Kandinsky.', 'Também: einen Pass ausstellen = emitir um passaporte.'],
    ['bewundern', 'bewundern', 'admirar', 'bəˈvʊndɐn', 'bewundere|bewunderst|bewundert|bewundern|bewundert|bewundern', 'Ich bewundere ihren Mut.', 'Admiro a coragem dela.'],
    ['darstellen', 'darstellen', 'representar, retratar', 'ˈdaːɐ̯ˌʃtɛlən', 'stelle dar|stellst dar|stellt dar|stellen dar|stellt dar|stellen dar', 'Das Bild stellt eine Szene aus Berlin dar.', 'O quadro retrata uma cena de Berlim.'],
    ['auseinandersetzen', 'sich auseinandersetzen', 'debruçar-se sobre, confrontar-se com', 'zɪç aʊ̯sʔaɪ̯ˈnandɐˌzɛtsn̩', 'setze mich auseinander|setzt dich auseinander|setzt sich auseinander|setzen uns auseinander|setzt euch auseinander|setzen sich auseinander', 'Der Film setzt sich mit der Vergangenheit auseinander.', 'O filme trata do passado.', 'sich auseinandersetzen mit + dativo.'],
  ]);
  P([
    ['ehrlichgesagt', 'ehrlich gesagt', 'para ser sincero', ''],
    ['enttaeuschend', 'enttäuschend', 'decepcionante', '', 'word', 'ɛntˈtɔɪ̯ʃn̩t'],
    ['sehenswert', 'sehenswert', 'que vale a pena ver', '', 'word', 'ˈzeːənsˌveːɐ̯t'],
    ['worauf', 'Worauf wartest du noch?', 'Está esperando o quê?', 'wo- + preposição para coisas.'],
    ['darangedacht', 'Daran habe ich gar nicht gedacht.', 'Nem pensei nisso.', 'denken an → daran.'],
    ['lohntsich', 'Der Besuch lohnt sich.', 'A visita vale a pena.', ''],
    ['gefuehl', 'Das Stück hat mich sehr berührt.', 'A peça me emocionou muito.', ''],
  ]);
  G('g_b2_dawo', {
    title: 'Palavras da- e wo- (darauf, worüber…)', explain: 'Bei Verben mit Präposition (sich freuen <b>auf</b>, denken <b>an</b>, sich ärgern <b>über</b>…):<br>• Für <b>Sachen</b> → <b>da</b> + Präposition: Ich freue mich <b>darauf</b>. Pergunta: <b>wo</b> + Präposition: <b>Worauf</b> freust du dich?<br>• Se a preposição começa com vogal, entra um <b>r</b>: da<b>r</b>an, da<b>r</b>über, wo<b>r</b>an, wo<b>r</b>über.<br>• Für <b>Personen</b> → Präposition + Pronomen: Ich denke <b>an dich</b>. Pergunta: <b>An wen</b> denkst du?<br>• da- também antecipa uma oração: Ich freue mich <b>darauf</b>, <b>dass</b> du kommst.',
    compare: 'Português: “Estou ansioso por isso” — alemão: Ich freue mich <b>darauf</b>. Nunca diga “auf es”.',
    examples: [['Woran denkst du? – An meinen Urlaub.', 'Em que você está pensando? – Nas minhas férias.'], ['Ich ärgere mich darüber, dass der Zug zu spät ist.', 'Fico irritado com o fato de o trem atrasar.']],
    drills: [['___ denkst du? – An meinen Urlaub.', ['woran']], ['Ich freue mich ___, dass du kommst. (auf)', ['darauf']], ['___ interessierst du dich? – Für Theater.', ['wofür']], ['Er ärgert sich ___, dass der Zug zu spät ist. (über)', ['darüber']], ['Hast du ___ gedacht, die Karten zu kaufen? (an)', ['daran']], ['___ sprecht ihr? – Über den Film.', ['worüber']], ['Auf ___ wartest du? – Auf meine Schwester. (pessoa)', ['wen']]]
  });
  G('g_b2_dawo_order', {
    title: 'Montar frases com da- e wo-', explain: 'Monte as frases. A pergunta com wo- abre a frase; o da- pode antecipar uma oração com dass ou zu.',
    compare: 'Worüber hast du dich geärgert? – <b>Darüber</b>, dass … : a resposta retoma a pergunta.',
    examples: [['Worüber hast du dich am meisten geärgert?', 'Com o que você ficou mais irritado?']],
    order: [['Worüber hast du dich am meisten geärgert?', 'Com o que você ficou mais irritado?'], ['Ich habe mich sehr darauf gefreut.', 'Eu estava muito ansioso por isso.'], ['Daran habe ich gar nicht gedacht.', 'Nem pensei nisso.'], ['Wofür interessierst du dich besonders?', 'Pelo que você se interessa especialmente?'], ['Er begeistert sich dafür, alte Filme zu sammeln.', 'Ele adora colecionar filmes antigos.']]
  });

  K.finish('2026.11.21-1');
})(globalThis.GF = globalThis.GF || {});
