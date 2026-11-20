/* German Fluency System — interface e professor. */
(function (GF) {
  'use strict';
  const C = GF.content, M = GF.model, G = GF.grading, F = GF.fsrs;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pct = (x) => x == null ? '—' : Math.round(x * 100) + '%';
  const now = () => Date.now();
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const LOG = [];
  function log(level, msg) { LOG.push({ t: now(), level, msg: String(msg).slice(0, 300) }); if (LOG.length > 100) LOG.shift(); if (level === 'error') console.error(msg); }
  window.addEventListener('error', (e) => log('error', e.message));
  window.addEventListener('unhandledrejection', (e) => log('error', (e.reason && (e.reason.message || e.reason.code)) || 'promessa rejeitada'));

  const S = { store: null, st: null, caps: {}, mode: 'loading', session: null, uid: null, installEvt: null };
  window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); S.installEvt = e; const c = document.getElementById('install-card'); if (c) c.outerHTML = installCardHtml(); bindInstall(); });
  window.addEventListener('appinstalled', () => { S.installEvt = null; const c = document.getElementById('install-card'); if (c) c.remove(); toast('App instalado! Procure o ícone “Deutsch” na tela inicial.'); });
  const isStandalone = () => { try { return window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true; } catch (e) { return false; } };
  function installCardHtml() {
    if (window.claude || (GF.local && GF.local.isElectron) || isStandalone() || !window.GF_PWA) return '';
    const ua = navigator.userAgent, ios = /iPhone|iPad/i.test(ua), inApp = /; wv\)|FBAN|FBAV|Instagram|Line\/|Claude/i.test(ua);
    let how;
    if (S.installEvt) how = '<button class="btn pri big" id="inst-go">📲 Instalar o app</button>';
    else if (ios) how = '<p class="small">No iPhone: abra este endereço no <b>Safari</b> → toque em <b>Compartilhar</b> (□↑) → <b>Adicionar à Tela de Início</b>.</p>';
    else how = `<p class="small">${inApp ? 'Você está num navegador interno (de outro app), que não instala apps. ' : ''}Abra este endereço no <b>Google Chrome</b>: toque em ⋮ (canto superior) → <b>Abrir no Chrome</b> e depois ⋮ → <b>Instalar app</b> (ou “Adicionar à tela inicial”).</p>
      <div class="row"><input type="text" readonly value="${esc(location.href.split('#')[0])}" id="inst-url" class="grow" style="flex:1;width:auto;font-size:14px"><button class="btn" id="inst-copy">Copiar</button></div>`;
    return `<div class="card" id="install-card"><div class="step-k">Instalar no aparelho</div>${how}</div>`;
  }
  function bindInstall() {
    const b = document.getElementById('inst-go'); if (b) b.onclick = async () => { const e = S.installEvt; if (!e) return; e.prompt(); try { await e.userChoice; } catch (er) { /* */ } S.installEvt = null; };
    const c = document.getElementById('inst-copy'); if (c) c.onclick = async () => { try { await navigator.clipboard.writeText(document.getElementById('inst-url').value); toast('Endereço copiado. Cole no Chrome.'); } catch (er) { document.getElementById('inst-url').select(); } };
  }
  const app = () => $('#app');

  function toast(msg, ms) { const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; document.body.appendChild(t); setTimeout(() => t.remove(), ms || 2600); }

  /* ---------------- Capacidades ---------------- */
  async function cap(name) {
    try {
      if (!window.claude || !window.claude.use) return null;
      return await Promise.race([window.claude.use(name), new Promise((r) => setTimeout(() => r(null), 10000))]);
    } catch (e) { log('warn', 'capacidade ' + name + ' indisponível'); return null; }
  }

  /* ---------------- Áudio (TTS) ---------------- */
  const Audio = {
    voice: null, voices: [], ready: false,
    init() {
      try {
        const ss = window.speechSynthesis; if (!ss) return;
        const pick = () => {
          const vs = ss.getVoices() || []; this.voices = vs.filter((v) => /^de/i.test(v.lang));
          let pref = null; try { pref = localStorage.getItem('gfs-voice'); } catch (e) { /* */ }
          this.voice = this.voices.find((v) => v.name === pref) || this.voices.find((v) => /^de(-|_)DE/i.test(v.lang) && /google|neural|natural|online/i.test(v.name)) || this.voices.find((v) => /^de(-|_)DE/i.test(v.lang)) || this.voices[0] || null;
          this.ready = true; const el = document.getElementById('voice-status'); if (el) el.innerHTML = voiceStatusHtml();
        };
        pick(); ss.onvoiceschanged = pick;
      } catch (e) { /* sem TTS do navegador */ }
    },
    available() { return !!this.voice || !!S.caps.tts; },
    async say(text, opt) {
      opt = opt || {};
      const rate = opt.rate || (S.st && S.st.profile.settings.ttsRate) || 0.85;
      if (this.voice && window.speechSynthesis) {
        return new Promise((res) => {
          try {
            window.speechSynthesis.cancel();
            const u = new SpeechSynthesisUtterance(text); u.voice = this.voice; u.lang = this.voice.lang; u.rate = rate; u.pitch = opt.pitch || 1;
            u.onend = res; u.onerror = res; window.speechSynthesis.speak(u);
            setTimeout(res, 15000);
          } catch (e) { res(); }
        });
      }
      if (S.caps.tts) {
        try { await S.caps.tts.speak(text, { language: 'de', rate: Math.max(0.7, Math.min(1.5, rate)), voice: opt.voice }); return; }
        catch (e) { if (e && e.code === 'not_granted') S.caps.tts = null; log('warn', 'tts: ' + (e && e.code)); }
      }
      if (opt.user || !this.warned) { this.warned = true; toast('Sem voz alemã disponível neste aparelho. Leia o texto e a transcrição IPA.'); }
    },
    async sayLines(lines) {
      const voices = ['buttery', 'airy'];
      for (let i = 0; i < lines.length; i++) await this.say(lines[i][1], { pitch: lines[i][0] === 'A' ? 1.08 : 0.92, voice: voices[i % 2] });
    }
  };
  /* Ajuda de voz/microfone conforme o aparelho */
  function platform() {
    const ua = navigator.userAgent;
    if (window.claude) return /Android|iPhone|iPad/i.test(ua) ? 'claude-mobile' : 'claude-desktop';
    if (GF.local && GF.local.isElectron) return 'windows-app';
    if (/iPhone|iPad/i.test(ua)) return 'ios';
    if (/Android/i.test(ua)) return 'android';
    return 'desktop-browser';
  }
  function voiceStatusHtml() {
    const v = Audio.voice ? '✅ Voz alemã: ' + esc(Audio.voice.name) : S.caps.tts ? '✅ Voz alemã do Claude' : '⚠️ Nenhuma voz alemã encontrada';
    const m = S.caps.dictation ? '✅ Microfone com reconhecimento em alemão' : platform() === 'windows-app' ? '🎤 Use o ditado do Windows: <b>Win + H</b> dentro da caixa de texto' : '⚠️ Reconhecimento de fala indisponível aqui';
    return v + '<br>' + m;
  }
  function voiceHelpHtml() {
    const P = {
      'claude-mobile': ['Dentro do app do Claude no celular a página não acessa a voz nem o microfone do aparelho.', ['Instale a versão celular (PWA) pelo <b>Chrome</b> (Android) ou <b>Safari</b> (iPhone): voz e microfone funcionam lá.', 'Enquanto isso, use o microfone do teclado com o idioma Deutsch ativado.']],
      'claude-desktop': ['No computador, abra este app no <b>Google Chrome</b>.', ['O Chrome tem a voz “Google Deutsch” embutida e reconhecimento de fala.']],
      'windows-app': ['No programa de Windows:', ['<b>Voz:</b> Configurações do Windows → Hora e idioma → Idioma e região → Adicionar um idioma → <b>Deutsch (Deutschland)</b> → marque <b>Conversão de texto em fala</b> e <b>Reconhecimento de fala</b>. Depois reinicie o programa e escolha a voz abaixo. Se ela não aparecer, use a alternativa do último item.', '<b>Microfone:</b> clique na caixa de resposta e aperte <b>Win + H</b>. No painel do ditado, troque o idioma para alemão (exige o pacote de idioma acima).', 'Alternativa sem configurar nada: instale a versão PWA pelo Google Chrome no PC (voz e microfone já vêm prontos, mas precisam de internet).']],
      'android': ['No Android (Chrome):', ['<b>Voz:</b> Configurações → Sistema → Idiomas → Saída de conversão de texto em voz → Mecanismo do Google → ⚙️ → Instalar dados de voz → <b>Alemão (Alemanha)</b>.', '<b>Microfone:</b> toque em 🎤 e permita o microfone. Se pedir, instale o “Google” app / Serviços de fala do Google.']],
      'ios': ['No iPhone (Safari):', ['<b>Voz:</b> Ajustes → Acessibilidade → Conteúdo Falado → Vozes → Alemão → baixe <b>Anna</b> (ou outra).', '<b>Microfone:</b> toque em 🎤 e permita; também funciona o ditado do teclado (adicione o teclado Alemão).']],
      'desktop-browser': ['No navegador do computador:', ['Use o <b>Google Chrome</b> ou o <b>Microsoft Edge</b>: os dois têm vozes alemãs e reconhecimento de fala.']]
    }[platform()];
    return `<p class="small">${P[0]}</p><ul class="list small">${P[1].map((x) => `<li>${x}</li>`).join('')}</ul>`;
  }
  function voiceCardHtml() {
    const opts = (Audio.voices || []).map((v) => `<option value="${esc(v.name)}" ${Audio.voice && Audio.voice.name === v.name ? 'selected' : ''}>${esc(v.name)} (${esc(v.lang)})</option>`).join('');
    return `<div class="card" id="voice-card"><h2>Voz e microfone</h2><p class="small" id="voice-status">${voiceStatusHtml()}</p>
      ${opts ? `<select id="v-sel" style="width:100%;padding:10px;border-radius:10px;border:1px solid var(--line);background:var(--card)">${opts}</select>` : ''}
      <div class="row" style="margin-top:8px"><button class="btn" id="v-test">🔊 Testar voz</button>${S.caps.dictation ? '<input type="text" id="v-mic-in" class="grow" style="flex:1;width:auto" placeholder="Teste o microfone: diga “Guten Tag”"><span id="v-mic"></span>' : ''}</div>
      <details style="margin-top:8px"><summary class="small">Como ativar neste aparelho</summary>${voiceHelpHtml()}</details></div>`;
  }
  function bindVoiceCard() {
    const sel = $('#v-sel'); if (sel) sel.onchange = () => { try { localStorage.setItem('gfs-voice', sel.value); } catch (e) { /* */ } Audio.voice = Audio.voices.find((v) => v.name === sel.value) || Audio.voice; $('#voice-status').innerHTML = voiceStatusHtml(); };
    const t = $('#v-test'); if (t) t.onclick = () => Audio.say('Guten Tag! Ich heiße Lena. Wie heißt du?', { user: true });
    const mi = $('#v-mic'); if (mi) mi.innerHTML = micControl($('#v-mic-in'));
  }
  function audioBtn(text, cls) { return `<button class="audio ${cls || ''}" data-say="${esc(text)}" aria-label="Ouvir">🔊</button>`; }
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-say]'); if (b) { e.preventDefault(); Audio.say(b.getAttribute('data-say'), { user: true }); return; }
    const tr = e.target.closest('[data-tr]'); if (tr && tr.previousElementSibling) tr.previousElementSibling.classList.toggle('hide');
  });

  /* ---------------- Fala (ditado) ---------------- */
  function micControl(input, onText) {
    const d = S.caps.dictation;
    if (!d) return '';
    const id = 'mic' + Math.random().toString(36).slice(2, 7);
    setTimeout(() => {
      const b = document.getElementById(id); if (!b) return;
      let base = '', on = false;
      try { d.onPartial(({ text }) => { if (on) input.value = (base + ' ' + text).trim(); }); d.onFinal(({ text }) => { if (on) { base = (base + ' ' + text).trim(); input.value = base; onText && onText(base); } }); d.onState(({ state }) => { on = state === 'listening'; b.classList.toggle('on', on); b.textContent = on ? '⏹' : '🎤'; }); } catch (e) { /* */ }
      b.onclick = () => {
        if (on) { d.stop().catch(() => {}); return; }
        base = input.value.trim();
        d.start().catch((e) => { if (e && e.code === 'not_granted') { S.caps.dictation = null; b.remove(); toast('Microfone recusado. Continue digitando.'); } });
      };
    }, 0);
    return `<button class="audio mic" id="${id}" aria-label="Falar">🎤</button>`;
  }
  const micTip = () => S.caps.dictation ? '' : GF.local && GF.local.isElectron ? '<p class="tiny mut">Para falar: clique na caixa e aperte <b>Win + H</b> (ditado do Windows em alemão).</p>' : '<p class="tiny mut">Dica no celular: toque no microfone do teclado (com o idioma <b>Deutsch</b> ativado) para falar em vez de digitar.</p>';

  /* ---------------- Persistência ---------------- */
  async function commit(touched) {
    const t = now();
    await S.store.persist(touched, t);
    renderSaveState();
  }
  function renderSaveState() {
    const el = $('#savestate'); if (!el) return;
    const n = S.store ? S.store.pendingN : 0;
    if (S.store && S.store.lastError) { el.className = 'pill bad'; el.textContent = 'erro ao salvar'; }
    else if (n > 0) { el.className = 'pill'; el.textContent = 'salvando…'; }
    else { const L = { db: ['pill ok', 'salvo na nuvem'], native: ['pill ok', 'salvo no PC'], device: ['pill ok', 'salvo no aparelho'], local: ['pill warn', 'modo local'] }[S.mode] || ['pill', '']; el.className = L[0]; el.textContent = L[1]; }
  }
  function today() { const k = M.dayKey(now()); const d = S.st.days[k] || (S.st.days[k] = { date: k, minutes: 0, reviews: 0, correct: 0, newItems: 0, sessions: 0, shortN: 0, shortOk: 0, longN: 0, longOk: 0 }); return d; }
  function addMinutes(ms) {
    const m = Math.min(ms, 5 * 60000) / 60000; // no máx. 5 min por etapa (evita contar tempo ocioso)
    today().minutes = +(today().minutes + m).toFixed(2); S.st.profile.minutes = +((S.st.profile.minutes || 0) + m).toFixed(2);
  }
  function unitState(uid) { return S.st.profile.unitState[uid] || (S.st.profile.unitState[uid] = {}); }

  /* ---------------- Boot ---------------- */
  async function boot() {
    Audio.init();
    app().innerHTML = '<div class="card center"><p class="mut">Abrindo seu professor…</p></div>';
    const [db, user, sample, dictation, tts, downloads] = await Promise.all(['db', 'user', 'sample', 'dictation', 'tts', 'downloads'].map(cap));
    Object.assign(S.caps, { db, user, sample, dictation, tts, downloads });
    let backend;
    if (db && user) {
      try { S.uid = await user.id(); } catch (e) { S.uid = null; }
    }
    if (db && S.uid) { backend = GF.store.DbBackend(db, S.uid); S.mode = 'db'; }
    else if (window.gfsNative && window.gfsNative.store) { backend = GF.local.NativeBackend(); S.mode = 'native'; }
    else {
      backend = GF.store.MemoryBackend('gfs-local-v1'); S.mode = window.claude ? 'local' : 'device';
      try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch (e) { /* */ }
      if (S.mode === 'local') log('warn', 'banco indisponível; usando armazenamento local');
    }
    if (!window.claude && GF.local) { // fora do Claude.ai: adaptadores do próprio aparelho
      S.caps.sample = S.caps.sample || GF.local.makeSample();
      S.caps.dictation = S.caps.dictation || GF.local.makeDictation();
      S.caps.downloads = S.caps.downloads || GF.local.makeDownloads();
    }
    S.store = new GF.store.Store(backend, log);
    S.store.onPending = renderSaveState;
    try { S.st = await S.store.load(now()); }
    catch (e) {
      log('error', 'falha ao carregar: ' + (e.code || e.message));
      app().innerHTML = `<div class="card"><h2>Não consegui carregar seus dados</h2><p class="mut">${esc(e.code || e.message)}. Nada foi apagado. Tente abrir de novo em instantes.</p></div>`;
      return;
    }
    if (S.st.integrity.dropped) log('warn', S.st.integrity.dropped + ' registros inválidos ignorados na carga');
    window.addEventListener('hashchange', route);
    if (!S.st.profile.diag) return renderOnboarding();
    // adaptação + backup automático ao abrir
    if (M.adapt(S.st, now())) commit({ profile: true });
    S.store.autoBackup(now()).then((r) => { if (r && r.saved) log('info', 'backup automático ' + r.saved); if (r && r.tooBig) log('warn', 'histórico grande demais para backup automático; exporte manualmente'); }).catch((e) => log('warn', 'backup automático falhou: ' + (e.code || e.message)));
    route();
    setTimeout(() => autoSync('abertura'), 1500);
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') autoSync('app em segundo plano'); else autoSync('app reaberto'); });
    setInterval(() => autoSync('periódica'), 10 * 60000);
  }

  /* ---------------- Sincronização ---------------- */
  const syncOn = () => !!(GF.sync && GF.sync.available() && GF.sync.cfg().token);
  function syncBadge() { if (!syncOn()) return ''; const c = GF.sync.cfg(); return c.lastError ? ' <span class="pill bad">erro</span>' : c.lastSync ? ' <span class="pill ok">' + new Date(c.lastSync).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) + '</span>' : ''; }
  let lastAuto = 0;
  async function autoSync(why) {
    if (!syncOn() || S.session || !S.store) return;
    if (why !== 'fim da sessão' && why !== 'app em segundo plano' && Date.now() - lastAuto < 60000) return;
    lastAuto = Date.now();
    try {
      await S.store.flush();
      const r = await GF.sync.run(S.store);
      log('info', 'sincronizado (' + why + '): ' + r.merged + ' mudanças recebidas');
      S.st = S.store.state;
      const h = (location.hash || '#hoje').slice(1);
      const idle = !$('#e-home') && !$('#o-go') && !(document.activeElement && /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName));
      if (r.merged && !S.session && document.visibilityState !== 'hidden' && S.st.profile.diag && idle && ['hoje', 'progresso', 'calendario', 'curriculo', 'vocabulario'].includes(h)) route();
    } catch (e) { log('warn', 'sincronização (' + why + '): ' + e.message); }
  }
  function renderSync() {
    const nav = $('nav.tabs'); const fresh = !S.st.profile.diag;
    if (!GF.sync || !GF.sync.available()) {
      shell('mais', `<div class="card"><h2>Sincronização</h2><p class="small">Esta é a versão dentro do Claude.ai, que já guarda seus dados na nuvem do Claude. Ela não conversa com a versão instalada (PC/celular).</p>
        <p class="small">Para levar o progresso daqui para o app instalado: <b>Mais → Dados → Exportar backup</b> aqui, e <b>Restaurar de arquivo</b> no app instalado. Depois disso, ative a sincronização lá.</p></div>`); return;
    }
    const c = GF.sync.cfg(); const on = !!c.token;
    const dev = /Android|iPhone|iPad/i.test(navigator.userAgent) ? 'Celular' : (GF.local && GF.local.isElectron ? 'PC (programa)' : 'PC');
    const html = on ? `<div class="card"><h2>Sincronização ativa ✅</h2>
        <p class="small">Este aparelho: <b>${esc(c.name)}</b>. Última sincronização: <b>${c.lastSync ? new Date(c.lastSync).toLocaleString('pt-BR') : 'ainda não'}</b>.</p>
        ${c.lastError ? `<div class="fb bad">${esc(c.lastError)}</div>` : ''}
        ${(c.devices || []).length ? `<h3>Aparelhos conectados</h3><table class="t">${c.devices.map((d) => `<tr><td>${d.me ? '📍 ' : ''}${esc(d.name)}</td><td class="small mut">${new Date(d.at).toLocaleString('pt-BR')}</td></tr>`).join('')}</table>` : ''}
        <p class="tiny mut">Sincroniza sozinho ao abrir o app, ao terminar uma sessão, ao sair do app e a cada 10 minutos (com internet).</p>
        <div class="row"><button class="btn pri" id="sy-now">Sincronizar agora</button><button class="btn" id="sy-off">Desativar neste aparelho</button></div></div>`
      : `<div class="card"><h2>Sincronizar PC e celular</h2>
        <p class="small">Seu progresso fica num <b>Gist secreto</b> da sua conta do GitHub, <b>criptografado</b> com uma senha que só você sabe. Cada aparelho envia o que fez e junta o que os outros fizeram — nada é apagado.</p>
        <h3>1. Crie um token (uma vez só)</h3>
        <p class="small">Abra <a href="https://github.com/settings/tokens/new?scopes=gist&description=Deutsch%20mit%20Plan%20sync" target="_blank" rel="noopener">este link do GitHub</a> → em <b>Expiration</b> escolha <b>No expiration</b> (ou 1 ano) → confira que <b>gist</b> está marcado → <b>Generate token</b> → copie o código (começa com <code>ghp_</code>). Use o mesmo token em todos os aparelhos.</p>
        <input type="text" id="sy-token" placeholder="ghp_..." autocomplete="off" spellcheck="false" autocapitalize="off">
        <h3>2. Senha de sincronização</h3><p class="small mut">Mínimo 8 caracteres. Use <b>a mesma</b> em todos os aparelhos. Se esquecer, os dados deste aparelho continuam aqui, mas não dá para ler os da nuvem.</p>
        <input type="text" id="sy-pass" placeholder="senha" autocomplete="off" spellcheck="false" autocapitalize="off" style="-webkit-text-security:disc">
        <h3>3. Nome deste aparelho</h3><input type="text" id="sy-name" value="${esc(dev)}">
        <div style="height:12px"></div><button class="btn pri big" id="sy-go">Ativar e sincronizar</button>
        <p class="tiny mut">O token e a senha ficam só neste aparelho e nunca entram nos backups.</p></div>`;
    if (fresh) { if (nav) nav.classList.add('hide'); app().innerHTML = `<header class="top"><div class="brand">Deutsch mit Plan<small>Trazer progresso de outro aparelho</small></div></header>${html}<button class="btn ghost big" id="sy-back">← Voltar ao diagnóstico</button>`; $('#sy-back').onclick = renderOnboarding; }
    else shell('mais', html);
    const after = async () => {
      const b = $('#sy-go') || $('#sy-now'); if (b) { b.disabled = true; b.textContent = 'Sincronizando…'; }
      try {
        await S.store.flush(); const r = await GF.sync.run(S.store); S.st = S.store.state;
        toast(r.merged ? 'Sincronizado: ' + r.merged + ' atualizações recebidas.' : 'Sincronizado. Tudo em dia.');
        if (!S.st.profile.diag) { toast('Nenhum progresso encontrado na nuvem ainda. Faça o diagnóstico.', 4000); return renderOnboarding(); }
        location.hash = '#sync'; renderSync();
      } catch (e) { toast(e.message, 6000); renderSync(); }
    };
    const go = $('#sy-go'); if (go) go.onclick = async () => {
      try { await GF.sync.setup({ token: $('#sy-token').value, pass: $('#sy-pass').value, name: $('#sy-name').value }); } catch (e) { return toast(e.message, 4000); }
      after();
    };
    const now = $('#sy-now'); if (now) now.onclick = after;
    const off = $('#sy-off'); if (off) off.onclick = () => { GF.sync.disable(); toast('Desativada neste aparelho. Seus dados locais continuam aqui.'); renderSync(); };
  }

  /* ---------------- Layout & rotas ---------------- */
  const TABS = [['hoje', '◉', 'Hoje'], ['praticar', '✎', 'Praticar'], ['progresso', '▤', 'Progresso'], ['curriculo', '☰', 'Currículo'], ['mais', '⋯', 'Mais']];
  /* Celular com "Versão para computador" ligada: a página fica minúscula. */
  function desktopModeWarn() {
    try {
      const touch = window.matchMedia('(pointer:coarse)').matches;
      if (touch && Math.min(screen.width, screen.height) < 700 && document.documentElement.clientWidth >= 900)
        return '<div class="desk-warn"><b>Está tudo pequeno?</b> O Chrome está em “Versão para computador”. Toque em ⋮ e desmarque <b>Versão para computador</b>.</div>';
    } catch (e) { /* */ }
    return '';
  }
  function shell(active, inner) {
    const lvl = M.estimateLevel(S.st);
    app().innerHTML = `${desktopModeWarn()}<header class="top"><div class="brand">Deutsch mit Plan<small>${esc(S.st.profile.name || '')} · ${esc(lvl.label)}</small></div><span id="savestate" class="pill"></span></header>${inner}`;
    let nav = $('nav.tabs'); if (!nav) { nav = document.createElement('nav'); nav.className = 'tabs'; document.body.appendChild(nav); }
    nav.innerHTML = TABS.map(([id, ic, l]) => `<a href="#${id}" class="${active === id ? 'on' : ''}"><b>${ic}</b>${l}</a>`).join('');
    nav.classList.remove('hide');
    renderSaveState();
    window.scrollTo(0, 0);
  }
  function route() {
    if (S.session) return; // durante a aula não troca de tela
    const h = (location.hash || '#hoje').slice(1);
    const r = { sync: renderSync, hoje: renderHome, praticar: renderPractice, progresso: renderProgress, curriculo: renderCurriculum, mais: renderMore, calendario: renderCalendar, metodo: renderMethod, dados: renderData, vocabulario: renderVocab, ajustes: renderSettings }[h] || renderHome;
    r();
  }

  /* ---------------- Diagnóstico inicial ---------------- */
  function renderOnboarding() {
    const nav = $('nav.tabs'); if (nav) nav.classList.add('hide');
    const D = { name: 'Rick', prior: 'zero', minutes: 20, days: [1, 2, 3, 4, 5], goals: [], pref: 'equilibrado', focus: 20 };
    const chips = (key, opts, multi) => `<div class="chips" data-k="${key}">${opts.map(([v, l]) => `<button class="chip" data-v="${v}">${l}</button>`).join('')}</div>`;
    app().innerHTML = `${desktopModeWarn()}<header class="top"><div class="brand">Deutsch mit Plan<small>Diagnóstico inicial · ~2 min</small></div></header>${installCardHtml()}
    <div class="card"><h2>Vamos configurar seu professor</h2><p class="mut small">Só o necessário para montar o plano. Tudo pode ser mudado depois. Seu progresso fica salvo num banco de dados seu, independente da IA usada.</p>
    <h3>Como quer ser chamado?</h3><input type="text" id="o-name" value="${esc(D.name)}">
    <h3>Seu contato com alemão até hoje</h3>${chips('prior', [['zero', 'Nunca estudei'], ['words', 'Sei algumas palavras'], ['some', 'Já estudei um pouco']])}
    <h3>Tempo disponível por dia</h3>${chips('minutes', [[10, '10 min'], [20, '20 min'], [30, '30 min'], [45, '45 min ou mais']])}
    <h3>Dias de estudo na semana</h3>${chips('days', [[1, 'seg'], [2, 'ter'], [3, 'qua'], [4, 'qui'], [5, 'sex'], [6, 'sáb'], [0, 'dom']], true)}
    <h3>Para que você quer o alemão? <span class="mut small">(marque quantos quiser)</span></h3>${chips('goals', [['viagem', 'Viagens'], ['trabalho', 'Trabalho'], ['morar', 'Morar num país germanófono'], ['exame', 'Goethe-Zertifikat'], ['estudo', 'Estudar'], ['midia', 'Filmes, séries, livros'], ['pessoas', 'Amigos ou família']], true)}
    <h3>O que você quer priorizar?</h3>${chips('pref', [['fala', 'Falar'], ['escuta', 'Entender ouvindo'], ['escrita', 'Ler e escrever'], ['equilibrado', 'Equilibrado']])}
    <h3>Quanto tempo você mantém a concentração sem pausa?</h3>${chips('focus', [[10, '~10 min'], [20, '~20 min'], [30, '30 min ou mais']])}
    <div style="height:14px"></div><button class="btn pri big" id="o-go">Continuar</button>
    ${GF.sync && GF.sync.available() ? '<button class="btn ghost big" id="o-sync" style="margin-top:6px">Já estudo em outro aparelho → sincronizar</button>' : ''}</div>`;
    const sync = () => $$('.chips').forEach((c) => { const k = c.dataset.k; $$('.chip', c).forEach((b) => { const v = isNaN(+b.dataset.v) ? b.dataset.v : +b.dataset.v; b.classList.toggle('on', Array.isArray(D[k]) ? D[k].includes(v) : D[k] === v); }); });
    $$('.chips').forEach((c) => c.addEventListener('click', (e) => {
      const b = e.target.closest('.chip'); if (!b) return; const k = c.dataset.k; const v = isNaN(+b.dataset.v) ? b.dataset.v : +b.dataset.v;
      if (Array.isArray(D[k])) D[k] = D[k].includes(v) ? D[k].filter((x) => x !== v) : D[k].concat(v); else D[k] = v; sync();
    }));
    sync(); bindInstall();
    const os = $('#o-sync'); if (os) os.onclick = () => renderSync();
    $('#o-go').onclick = () => {
      D.name = $('#o-name').value.trim() || 'Aluno';
      if (!D.days.length) return toast('Escolha ao menos um dia.');
      if (D.prior === 'zero') finishOnboarding(D, null); else renderPlacement(D);
    };
  }
  function renderPlacement(D) {
    const pool = shuffle(['n_tisch', 'n_mutter', 'n_kaffee', 'n_wohnung', 'n_kind', 'n_brot', 'p_danke', 'p_wiegehts', 'num_12', 'n_stadt', 'v_haben', 'n_rechnung']);
    const qs = pool.slice(0, 10);
    let i = 0; const res = [];
    const next = () => {
      if (i >= qs.length) return finishOnboarding(D, res);
      const it = C.items[qs[i]];
      app().innerHTML = `<header class="top"><div class="brand">Teste de nivelamento<small>${i + 1} de ${qs.length} · não chute: deixe em branco se não souber</small></div></header>
      <div class="card"><div class="step-k">Como se diz em alemão?</div><div class="de md" style="margin:8px 0 14px">${esc(it.pt)}</div>
      <p class="small mut">${it.type === 'noun' ? 'Substantivo: escreva com artigo (der/die/das).' : it.type === 'number' ? 'Escreva por extenso.' : ''}</p>
      <input type="text" id="pl-a" autocomplete="off" autocapitalize="off" spellcheck="false"><div class="row" style="margin-top:12px"><button class="btn" id="pl-skip">Não sei</button><button class="btn pri grow" id="pl-ok">Responder</button></div></div>`;
      const go = (ans) => { const r = G.check(ans, answerFor(it), { noun: it.type === 'noun' }); res.push({ id: it.id, ok: r.ok && r.score >= 0.9, given: ans }); i++; next(); };
      $('#pl-ok').onclick = () => go($('#pl-a').value); $('#pl-skip').onclick = () => go('');
      $('#pl-a').onkeydown = (e) => { if (e.key === 'Enter') go($('#pl-a').value); };
      $('#pl-a').focus();
    };
    next();
  }
  function finishOnboarding(D, placement) {
    const p = S.st.profile, t = now();
    p.name = D.name;
    p.diag = { prior: D.prior, minutes: D.minutes, days: D.days, goals: D.goals, pref: D.pref, focus: D.focus, at: t };
    p.settings.newPerDay = { 10: 5, 20: 8, 30: 10, 45: 12 }[D.minutes] || 8;
    p.adapt = [{ t, from: null, to: p.settings.newPerDay, why: 'valor inicial pelo tempo diário (' + D.minutes + ' min)' }];
    const touched = { profile: true, cards: [], mistakes: [], day: false };
    if (placement) {
      p.placement = { at: t, score: placement.filter((x) => x.ok).length, n: placement.length };
      // só cria registro para o que você DEMONSTROU saber (evidência)
      for (const r of placement.filter((x) => x.ok)) {
        const tt = M.recordAnswer(S.st, { itemId: r.id, stage: 'recog', ok: true, score: 1, grade: 3 }, t);
        M.recordAnswer(S.st, { itemId: r.id, stage: 'recall', ok: true, score: 1, grade: 3, skill: 'wortschatz' }, t);
        touched.cards.push(...tt.cards); touched.day = true;
      }
    }
    commit(touched);
    const weekly = D.minutes * D.days.length / 60;
    const lo = Math.ceil(60 / weekly), hi = Math.ceil(150 / weekly);
    const nav = $('nav.tabs'); if (nav) nav.classList.add('hide');
    app().innerHTML = `<header class="top"><div class="brand">Seu plano inicial<small>${esc(p.name)}</small></div></header>
    <div class="card"><h2>Plano configurado</h2>
    <p>${D.minutes} min × ${D.days.length} dias = <b>${weekly.toFixed(1)} h por semana</b>.</p>
    <p>O Goethe-Institut estima <b>≈ 60–150 horas</b> para chegar ao A1, dependendo de conhecimentos prévios e condições. No seu ritmo, isso dá <b>${lo}–${hi} semanas</b>. É uma estimativa, não uma promessa: o app só considera um nível alcançado quando você demonstra as competências nas avaliações.</p>
    ${placement ? `<p>Nivelamento: <b>${p.placement.score}/${p.placement.n}</b> acertos. Os itens que você acertou já entram no sistema de revisões; nada mais foi marcado como aprendido.</p>` : ''}
    <ul class="list small"><li>Itens novos por dia: <b>${p.settings.newPerDay}</b> (ajustado automaticamente pela sua retenção).</li><li>Cada sessão: revisões vencidas → conteúdo novo → gramática com contexto → escuta → fala.</li><li>Você começa conversando já na 1ª unidade.</li></ul>
    <button class="btn pri big" id="f-go">Ver minha primeira aula</button></div>`;
    $('#f-go').onclick = () => { location.hash = '#hoje'; route(); };
  }

  /* ---------------- Hoje ---------------- */
  const KIND_PT = { review: 'Revisão', intro: 'Palavra nova', grammar: 'Gramática', order: 'Ordem das palavras', listen: 'Ditado (Hören)', dialog: 'Diálogo para ouvir', pron: 'Pronúncia', pairs: 'Pares mínimos', speak: 'Fala (repetir)', convo: 'Conversa com o professor', write: 'Escrita', remedy: 'Corrigir erro recorrente', checkpoint: 'Checkpoint da unidade' };
  function planSummary(plan) {
    const cnt = {}; for (const s of plan.steps) cnt[s.kind] = (cnt[s.kind] || 0) + 1;
    return Object.entries(cnt).map(([k, n]) => `<li>${KIND_PT[k]}${n > 1 ? ' × ' + n : ''}</li>`).join('');
  }
  function renderHome() {
    const st = S.st, p = st.profile, t = now();
    const minutes = S.homeMinutes || p.diag.minutes;
    const plan = M.buildSession(st, minutes, t);
    const uid = plan.unit; const unit = uid ? C.units[uid] : null;
    const sk = M.streak(st, t); const stats = M.stats(st, t);
    const us = uid ? M.unitStatus(st, uid, t) : null;
    const dayIdx = new Date(t).getDay(); const plannedToday = p.diag.days.includes(dayIdx);
    const gap = p.lastSessionAt ? Math.floor((t - p.lastSessionAt) / 86400000) : 0;
    const obs = [];
    if (Audio.ready && !Audio.available()) obs.push('Sem voz alemã neste aparelho: ditados e escuta ficam de fora. Veja <a href="#mais">Mais → Voz e microfone</a> para ativar.');
    if (gap >= 3) obs.push(`Você ficou ${gap} dias fora. Sem problema: hoje a sessão prioriza o que está mais perto de ser esquecido e reduz conteúdo novo.`);
    if (stats.forgetting.length) obs.push(`${stats.forgetting.length} itens estão sendo esquecidos (probabilidade de lembrar < 70%): eles vêm primeiro.`);
    if (stats.topMistakes.length) obs.push(`Erro mais recorrente: ${esc(stats.topMistakes[0].msg)} (${stats.topMistakes[0].count}×).`);
    const lastAd = (p.adapt || []).slice(-1)[0]; if (lastAd && t - lastAd.t < 3 * 86400000 && lastAd.from != null) obs.push(`Ajuste recente: itens novos/dia ${lastAd.from} → ${lastAd.to} (${esc(lastAd.why)}).`);
    shell('hoje', `${installCardHtml()}
    <div class="card">
      <div class="row sp"><div><div class="step-k">${plannedToday ? 'Aula de hoje' : 'Hoje não é dia planejado — sessão opcional'}</div><h2 style="margin-top:2px">${unit ? esc(unit.title) : 'Revisões'}</h2><div class="mut small">${unit ? esc(unit.subtitle) + ' · ' + uid : ''}</div></div></div>
      <div class="chips" id="h-min" style="margin:12px 0">${[5, 15, 30, 45].map((m) => `<button class="chip ${m === minutes ? 'on' : ''}" data-m="${m}">${m} min</button>`).join('')}</div>
      <ul class="list small">${planSummary(plan)}</ul>
      ${plan.notes.map((n) => `<p class="tiny mut">${esc(n)}</p>`).join('')}
      <button class="btn pri big" id="h-start" ${plan.steps.length ? '' : 'disabled'}>Começar (${plan.steps.length} etapas)</button>
    </div>
    ${obs.length ? `<div class="card"><div class="step-k">O professor observou</div><ul class="list small">${obs.map((o) => `<li>${o}</li>`).join('')}</ul></div>` : ''}
    <div class="card"><div class="kpis">
      <div class="kpi"><b>${stats.due}</b><span>revisões pendentes</span></div>
      <div class="kpi"><b>${stats.recalledPlus}</b><span>itens que você lembra sem ajuda</span></div>
      <div class="kpi"><b>${sk.week}/7</b><span>dias estudados na semana</span></div>
      <div class="kpi"><b>${(stats.minutes / 60).toFixed(1)} h</b><span>de estudo no total</span></div>
    </div></div>
    ${us ? `<div class="card"><div class="step-k">Para concluir ${uid}</div>${unitChecklist(us)}</div>` : ''}`);
    bindInstall();
    $('#h-min').onclick = (e) => { const b = e.target.closest('[data-m]'); if (!b) return; S.homeMinutes = +b.dataset.m; renderHome(); };
    $('#h-start').onclick = () => startSession(plan);
  }
  function unitChecklist(us) {
    const L = [];
    const chk = (ok, txt) => L.push(`<li>${ok ? '✅' : '⬜'} ${txt}</li>`);
    if (us.uid === 'A0-P') { chk(us.pronDone >= Object.keys(C.pron).length, `Lições de pronúncia: ${us.pronDone}/${Object.keys(C.pron).length}`); chk(us.pairs >= 0.8, `Pares mínimos ≥ 80% (atual: ${pct(us.pairs)})`); }
    else {
      chk(us.vocabPct >= 0.9, `Vocabulário: ${us.recalled}/${us.items} no nível “lembra” (meta 90%) · ${us.intro} introduzidos`);
      for (const g of us.grammar) chk(g.n >= 5 && g.rate >= 0.8, `${esc(C.grammar[g.id].title)}: ${pct(g.rate)} (${g.n} exercícios; meta 80%)`);
      chk(us.listenOk, `Ditado: ${pct(us.listen)} (meta 75%)`);
      chk(us.convoOk, `Conversa concluída: ${us.convos}`);
      chk(us.writingOk, `Texto aprovado: ${us.writing ? us.writing.score + '/5' : '—'}`);
      chk(us.passed, `Checkpoint ≥ 80% e ≥ 70% em cada habilidade${us.checkpoint ? ' (último: ' + pct(us.checkpoint.score) + ')' : ''}`);
    }
    return `<ul class="list small" style="list-style:none;padding-left:0">${L.join('')}</ul>`;
  }

  /* ---------------- Sessão ---------------- */
  function startSession(plan) {
    S.session = { plan, i: 0, started: now(), stepStart: now(), results: { ok: 0, n: 0 }, breakShown: false };
    $('nav.tabs') && $('nav.tabs').classList.add('hide');
    runStep();
  }
  function sessionHeader(kind) {
    const s = S.session; const n = s.plan.steps.length;
    return `<header class="top"><button class="btn ghost" id="s-quit" style="padding-left:0">✕ Sair</button><span id="savestate" class="pill"></span></header>
    <div class="prog" style="margin-bottom:14px"><i style="width:${Math.round(100 * s.i / n)}%"></i></div><div class="step-k" style="margin-bottom:8px">${KIND_PT[kind] || ''} · ${s.i + 1}/${n}</div>`;
  }
  function bindQuit() { const q = $('#s-quit'); if (q) q.onclick = () => endSession(true); renderSaveState(); }
  function nextStep() {
    const s = S.session; if (!s) return;
    addMinutes(now() - s.stepStart); s.stepStart = now();
    s.i++;
    const focus = (S.st.profile.diag.focus || 20) * 60000;
    if (!s.breakShown && now() - s.started > focus && s.i < s.plan.steps.length) {
      s.breakShown = true;
      app().innerHTML = sessionHeader('') + `<div class="card center"><h2>Hora de uma pausa curta</h2><p class="mut">Você está há ${Math.round((now() - s.started) / 60000)} min focado (seu limite informado). Levante, beba água, 2–3 min. Ou continue se estiver bem.</p><button class="btn pri big" id="b-go">Continuar</button></div>`;
      bindQuit(); $('#b-go').onclick = () => { s.stepStart = now(); runStep(); }; return;
    }
    runStep();
  }
  function runStep() {
    const s = S.session; if (!s) return;
    if (s.i >= s.plan.steps.length) return endSession(false);
    const step = s.plan.steps[s.i];
    const R = { intro: stepIntro, review: stepReview, remedy: stepRemedy, grammar: stepGrammar, order: stepOrder, listen: stepListen, dialog: stepDialog, pron: stepPron, pairs: stepPairs, speak: stepSpeak, convo: stepConvo, write: stepWrite, checkpoint: stepCheckpoint }[step.kind];
    try { R(step); } catch (e) { log('error', 'etapa ' + step.kind + ': ' + e.message); s.i++; runStep(); }
    window.scrollTo(0, 0);
  }
  async function endSession(quit) {
    const s = S.session; if (!s) return;
    addMinutes(now() - s.stepStart);
    const p = S.st.profile; const t = now();
    const doneSteps = s.i;
    if (doneSteps > 0) { p.sessions = (p.sessions || 0) + 1; today().sessions++; p.lastSessionAt = t; }
    M.adapt(S.st, t);
    S.session = null;
    await commit({ profile: true, day: true });
    autoSync('fim da sessão');
    const mins = Math.round((t - s.started) / 60000);
    app().innerHTML = `<header class="top"><div class="brand">${quit ? 'Sessão interrompida' : 'Sessão concluída'}</div><span id="savestate" class="pill"></span></header>
    <div class="card"><h2>${quit ? 'Tudo que você fez foi salvo.' : 'Bom trabalho!'}</h2>
    <p>${doneSteps} etapas · ~${mins} min${s.results.n ? ` · acerto ${pct(s.results.ok / s.results.n)} em ${s.results.n} respostas` : ''}.</p>
    <p class="small mut">As revisões já foram reprogramadas pelo FSRS. A próxima aula será montada a partir do que aconteceu hoje.</p>
    <button class="btn pri big" id="e-home">Voltar ao início</button></div>`;
    renderSaveState();
    $('#e-home').onclick = () => { location.hash = '#hoje'; route(); };
  }
  function tally(ok) { if (S.session) { S.session.results.n++; if (ok) S.session.results.ok++; } }

  /* ---------- helpers de item ---------- */
  function artHtml(it) { return it.type === 'noun' ? `<span class="art-${it.art}">${it.art}</span> ${esc(it.de)}` : esc(it.de); }
  function answerFor(it) {
    if (it.type === 'noun') return [it.art + ' ' + it.de];
    if (it.type === 'number') return [it.de, it.de.replace(/ß/g, 'ss')];
    return [it.de];
  }
  function plStr(it) { return !it.pl ? 'sem plural usual' : it.pl === '—' ? 'só plural' : it.pl === '=' ? 'die ' + it.de + ' (igual)' : 'die ' + it.pl; }
  function itemCardHtml(it, opts) {
    opts = opts || {};
    const conj = it.conj ? `<table class="t small" style="margin-top:8px"><tr>${['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie'].map((p) => `<th>${p}</th>`).join('')}</tr><tr>${['ich', 'du', 'er', 'wir', 'ihr', 'sie'].map((k) => `<td>${esc(it.conj[k])}</td>`).join('')}</tr></table>` : '';
    return `<div class="row" style="align-items:flex-start"><div class="grow"><div class="de">${artHtml(it)}</div>
      ${it.ipa ? `<div class="ipa">[${esc(it.ipa)}]</div>` : ''}${it.type === 'noun' ? `<div class="small mut">Plural: <b>${esc(plStr(it))}</b></div>` : ''}</div>${audioBtn(it.type === 'noun' ? it.art + ' ' + it.de : it.de, 'lg')}</div>
      <p style="font-size:18px;margin:10px 0 4px">${esc(it.pt)}</p>${conj}
      ${it.ex.map(([de, pt]) => `<div class="row" style="margin-top:10px">${audioBtn(de)}<div><div>${esc(de)}</div><div class="small mut">${esc(pt)}</div></div></div>`).join('')}
      ${it.note ? `<p class="small" style="margin-top:10px">💡 ${esc(it.note)}</p>` : ''}
      ${it.type === 'noun' && !opts.noColorTip ? '<p class="tiny mut">Cores fixas: <span class="art-der">der</span> · <span class="art-die">die</span> · <span class="art-das">das</span>. Exemplos são frases didáticas escritas para o nível.</p>' : ''}`;
  }

  /* ---------- Etapa: palavra nova ---------- */
  function stepIntro(step) {
    const it = C.items[step.id];
    app().innerHTML = sessionHeader('intro') + `<div class="card">${itemCardHtml(it)}</div><button class="btn pri big" id="i-ok">Entendi — continuar</button>`;
    bindQuit();
    Audio.say(it.type === 'noun' ? it.art + ' ' + it.de : it.de).catch(() => {});
    $('#i-ok').onclick = () => {
      if (!S.st.cards[it.id]) { S.st.cards[it.id] = M.newCard(it, now()); today().newItems++; commit({ cards: [it.id], day: true, profile: false }); }
      nextStep();
    };
  }

  /* ---------- Etapa: revisão (4 estágios) ---------- */
  function distractors(it, n) {
    const pool = Object.values(C.items).filter((x) => x.id !== it.id && x.type === it.type && x.pt !== it.pt);
    const alt = pool.length >= n ? pool : Object.values(C.items).filter((x) => x.id !== it.id);
    return shuffle(alt).slice(0, n);
  }
  function stepReview(step, onDone) {
    const it = C.items[step.id]; if (!it) { nextStep(); return; }
    let stage = step.stage;
    if (stage === 'listen' && !Audio.available()) stage = 'recall';
    const t0 = now(); const done = onDone || nextStep;
    const finish = (res, given, hint, skill, key) => {
      const ms = now() - t0;
      const grade = G.gradeFrom(res, ms, hint, it.type === 'phrase' ? 14000 : 8000);
      const touched = M.recordAnswer(S.st, { itemId: it.id, stage, ok: res.ok, score: res.score, grade, ms, issues: res.issues, given, skill, key }, now());
      tally(res.ok); commit(touched);
      return grade;
    };
    const fbHtml = (res) => `<div class="fb ${res.ok ? (res.issues.length ? 'warn' : 'ok') : 'bad'}"><b>${res.ok ? (res.issues.length ? 'Aceito, com observação' : 'Richtig! ✓') : 'Ainda não'}</b>${res.issues.map((i) => `<div class="why">${esc(i.msg)}</div>`).join('')}</div>`;
    const after = (res, regradable, given, hint, skill) => {
      const box = $('#r-after');
      box.innerHTML = fbHtml(res) + `<div class="card">${itemCardHtml(it, { noColorTip: true })}</div>
        <div class="row">${regradable && !res.ok ? '<button class="btn" id="r-over">Eu sabia (erro de digitação)</button>' : ''}<button class="btn pri grow" id="r-next">Continuar</button></div>`;
      if (!res.ok) Audio.say(answerFor(it)[0]).catch(() => {});
      $('#r-next').onclick = done; $('#r-next').focus();
      const ov = $('#r-over'); if (ov) ov.onclick = () => {
        // correção manual: revisão registrada novamente como "difícil" (honesto: não conta como acerto limpo)
        const card = S.st.cards[it.id];
        if (card) { card.stages[stage] = F.review(prevStageState, 2, now(), S.st.profile.settings.desiredR); card.correct++; card.errors.pop(); commit({ cards: [it.id] }); }
        toast('Marcado como acerto com dificuldade.'); done();
      };
    };
    let prevStageState = S.st.cards[it.id] ? JSON.parse(JSON.stringify(S.st.cards[it.id].stages[stage])) : F.emptyState();
    const isNoun = it.type === 'noun';
    if (stage === 'recog') {
      const opts = shuffle([it, ...distractors(it, 3)]);
      app().innerHTML = sessionHeader('review') + `<div class="card"><div class="row sp"><div class="de">${artHtml(it)}</div>${audioBtn(isNoun ? it.art + ' ' + it.de : it.de)}</div><p class="small mut">O que significa?</p>
        ${opts.map((o) => `<button class="btn opt" data-id="${o.id}">${esc(o.pt)}</button>`).join('')}</div><div id="r-after"></div>`;
      bindQuit(); Audio.say(isNoun ? it.art + ' ' + it.de : it.de).catch(() => {});
      $$('.opt').forEach((b) => b.onclick = () => {
        const ok = b.dataset.id === it.id; $$('.opt').forEach((x) => { x.disabled = true; if (x.dataset.id === it.id) x.classList.add('right'); }); if (!ok) b.classList.add('wrong');
        const res = { ok, score: ok ? 1 : 0, issues: ok ? [] : [{ type: 'wrong', msg: (isNoun ? it.art + ' ' : '') + it.de + ' = ' + it.pt }] };
        finish(res, b.textContent, false, 'wortschatz'); after(res, false);
      });
      return;
    }
    let prompt, accepted, sub = '', skill = 'wortschatz', sayFirst = null, label = '';
    if (stage === 'recall') {
      label = 'Como se diz em alemão?'; prompt = `<div class="de md">${esc(it.pt)}</div>`; accepted = answerFor(it);
      sub = isNoun ? 'Com artigo (der/die/das).' : it.type === 'verb' ? 'Infinitivo.' : it.type === 'number' ? 'Por extenso.' : '';
    } else if (stage === 'listen') {
      label = 'Ouça e escreva'; skill = 'hoeren'; accepted = answerFor(it); sayFirst = accepted[0];
      prompt = `<div class="center">${audioBtn(accepted[0], 'lg')}</div>`; sub = isNoun ? 'Escreva com o artigo que ouviu.' : '';
    } else if (stage === 'use') {
      skill = it.type === 'phrase' ? 'sprechen' : 'grammatik';
      if (it.type === 'phrase') { label = 'Diga em alemão (fale ou digite)'; prompt = `<div class="de md">${esc(it.pt)}</div>`; accepted = [it.de]; sub = it.note ? 'Contexto: ' + it.note : ''; }
      else if (isNoun && it.pl && it.pl !== '—' && (S.st.cards[it.id].stages.use.reps % 2 === 1)) { label = 'Qual é o plural?'; prompt = `<div class="de md">${artHtml(it)}</div>`; accepted = ['die ' + (it.pl === '=' ? it.de : it.pl)]; sub = 'Com artigo do plural (die).'; skill = 'grammatik'; }
      else {
        const [de, pt] = it.ex[0] || [it.de, it.pt];
        const forms = it.type === 'verb' ? Object.values(it.conj).concat(it.de) : [it.de];
        const words = de.split(/(\s+|[.,!?])/);
        let hit = -1; for (let k = 0; k < words.length; k++) if (forms.some((f) => f.toLowerCase() === words[k].toLowerCase())) { hit = k; break; }
        if (hit < 0) { label = 'Como se diz em alemão?'; prompt = `<div class="de md">${esc(it.pt)}</div>`; accepted = answerFor(it); }
        else {
          accepted = [words[hit]]; const shown = words.map((w, k) => k === hit ? '_____' : esc(w)).join('');
          label = 'Complete a frase'; prompt = `<div class="de md">${shown}</div><div class="small mut">${esc(pt)}</div>`;
          sub = it.type === 'verb' ? `Verbo: ${esc(it.de)} (${esc(it.pt)}) — conjugue.` : `Palavra: ${esc(it.pt)}`;
        }
      }
    }
    app().innerHTML = sessionHeader('review') + `<div class="card"><div class="step-k">${label} · estágio “${M.STAGE_PT[stage]}”</div><div style="margin:10px 0">${prompt}</div>
      ${sub ? `<p class="small mut">${sub}</p>` : ''}<div class="row"><input type="text" id="r-a" class="grow" autocomplete="off" autocapitalize="off" spellcheck="false" style="flex:1;width:auto"><span id="r-mic"></span></div>
      ${stage === 'use' && it.type === 'phrase' ? micTip() : ''}
      <div class="row" style="margin-top:12px"><button class="btn" id="r-hint">Dica</button><button class="btn pri grow" id="r-ok">Verificar</button></div></div><div id="r-after"></div>`;
    bindQuit();
    const inp = $('#r-a');
    if (stage === 'use' && it.type === 'phrase') $('#r-mic').innerHTML = micControl(inp);
    if (sayFirst) Audio.say(sayFirst).catch(() => {});
    let hint = false;
    $('#r-hint').onclick = () => { hint = true; const a = accepted[0]; inp.placeholder = a.split(' ').map((w) => w[0] + '…').join(' '); $('#r-hint').disabled = true; };
    const check = () => {
      if ($('#r-ok').disabled) return;
      $('#r-ok').disabled = true; $('#r-hint').disabled = true; inp.disabled = true;
      let res;
      if (stage === 'use' && it.type === 'phrase') {
        const wm = G.wordMatch(inp.value, accepted[0]); const strict = G.check(inp.value, accepted, {});
        res = strict.ok ? strict : { ok: wm.ratio >= 0.85, score: wm.ratio, issues: wm.ratio >= 0.85 ? [{ type: 'typo', msg: 'Quase igual ao modelo: “' + accepted[0] + '”.' }] : [{ type: 'wrong', msg: 'Modelo: “' + accepted[0] + '”' + (wm.missing.length ? ' · faltou: ' + wm.missing.join(', ') : '') }] };
      } else res = G.check(inp.value, accepted, { noun: isNoun && stage !== 'use' });
      finish(res, inp.value, hint, skill); after(res, true, inp.value, hint, skill);
    };
    $('#r-ok').onclick = check; inp.onkeydown = (e) => { if (e.key === 'Enter') check(); };
    setTimeout(() => inp.focus(), 50);
  }
  function stepRemedy(step) {
    const m = S.st.mistakes[step.key]; const it = C.items[step.id];
    if (!m || !it) return nextStep();
    app().innerHTML = sessionHeader('remedy') + `<div class="card"><div class="step-k">Erro recorrente (${m.count}×)</div><p>${esc(m.msg)}</p>${m.given.length ? `<p class="small mut">Você escreveu: ${m.given.map((g) => '“' + esc(g) + '”').join(', ')}</p>` : ''}</div>
      <div class="card">${itemCardHtml(it)}</div><button class="btn pri big" id="m-go">Agora teste sem olhar</button>`;
    bindQuit(); $('#m-go').onclick = () => stepReview({ id: it.id, stage: 'recall' });
  }

  /* ---------- Gramática ---------- */
  function grammarIntroHtml(g) {
    return `<div class="card"><h2>${esc(g.title)}</h2><p>${g.explain}</p><p class="small" style="background:var(--bg);padding:10px;border-radius:10px">🇧🇷↔🇩🇪 ${esc(g.compare)}</p>
      ${g.examples.map(([de, pt]) => `<div class="row" style="margin-top:8px">${audioBtn(de)}<div><div>${esc(de)}</div><div class="small mut">${esc(pt)}</div></div></div>`).join('')}</div>`;
  }
  function recordGrammar(gid, ok, res, given, q) {
    const p = S.st.profile; p.grammarStats[gid] = (p.grammarStats[gid] || []).concat(ok ? 1 : 0).slice(-30);
    const issues = ok ? [] : [{ type: 'grammar', msg: C.grammar[gid].title + ': “' + q + '” → ' + res }];
    const touched = M.recordAnswer(S.st, { key: 'g:' + gid + ':' + q.slice(0, 40), ok, score: ok ? 1 : 0, issues, given, skill: 'grammatik' }, now());
    tally(ok); commit(touched);
  }
  function stepGrammar(step) {
    const g = C.grammar[step.grammar]; const us = unitState(g.unit);
    us.grammarSeen = Object.assign({}, us.grammarSeen, { [step.grammar]: true });
    app().innerHTML = sessionHeader('grammar') + grammarIntroHtml(g) + `<button class="btn pri big" id="g-go">Praticar (${Math.min(6, g.drills.length)} exercícios)</button>`;
    bindQuit();
    $('#g-go').onclick = () => runDrills(step.grammar, shuffle(g.drills).slice(0, 6), nextStep);
  }
  function runDrills(gid, drills, done) {
    const g = C.grammar[gid]; let k = 0;
    const one = () => {
      if (k >= drills.length) return done();
      const d = drills[k];
      app().innerHTML = (S.session ? sessionHeader('grammar') : '<div style="height:8px"></div>') + `<div class="card"><div class="step-k">${esc(g.title)} · ${k + 1}/${drills.length}</div>
        <div class="de md" style="margin:10px 0">${esc(d.q)}</div>${d.hint ? `<p class="small mut">${esc(d.hint)}</p>` : ''}
        <input type="text" id="d-a" autocomplete="off" autocapitalize="off" spellcheck="false"><button class="btn pri big" id="d-ok" style="margin-top:10px">Verificar</button></div><div id="d-after"></div>`;
      bindQuit();
      const inp = $('#d-a'); setTimeout(() => inp.focus(), 50);
      const chk = () => {
        if ($('#d-ok').disabled) return; $('#d-ok').disabled = true; inp.disabled = true;
        const r = G.check(inp.value, d.a, {}); const ok = r.ok && r.score >= 0.9;
        recordGrammar(gid, ok, d.a[0], inp.value, d.q);
        const full = d.q.replace('___', d.a[0]);
        $('#d-after').innerHTML = `<div class="fb ${ok ? 'ok' : 'bad'}"><b>${ok ? 'Richtig! ✓' : 'Correto: ' + esc(d.a[0])}</b><div class="why">${esc(full)} ${audioBtn(full.replace(/\(.*?\)/g, ''))}</div></div><button class="btn pri big" id="d-next">Continuar</button>`;
        $('#d-next').onclick = () => { k++; one(); }; $('#d-next').focus();
      };
      $('#d-ok').onclick = chk; inp.onkeydown = (e) => { if (e.key === 'Enter') chk(); };
    };
    one();
  }
  function stepOrder(step) {
    const g = C.grammar[step.grammar]; const us = unitState(g.unit);
    us.grammarSeen = Object.assign({}, us.grammarSeen, { [step.grammar]: true });
    app().innerHTML = sessionHeader('order') + grammarIntroHtml(g) + `<button class="btn pri big" id="o-go">Montar frases</button>`;
    bindQuit();
    $('#o-go').onclick = () => runOrder(step.grammar, shuffle(g.order).slice(0, 5), nextStep);
  }
  function runOrder(gid, list, done) {
    let k = 0;
    const one = () => {
      if (k >= list.length) return done();
      const [de, pt] = list[k]; const words = de.replace(/[.?!]$/, '').split(' '); const punct = (de.match(/[.?!]$/) || [''])[0];
      let pool = shuffle(words.map((w, i) => ({ w, i }))); if (pool.map((x) => x.w).join(' ') === words.join(' ')) pool = pool.reverse();
      const built = [];
      const draw = () => {
        $('#o-built').innerHTML = built.map((x, j) => `<button class="tile" data-b="${j}">${esc(x.w)}</button>`).join('') || '<span class="mut small">Toque nas palavras na ordem certa</span>';
        $('#o-pool').innerHTML = pool.map((x, j) => `<button class="tile" data-p="${j}">${esc(x.w)}</button>`).join('');
      };
      app().innerHTML = (S.session ? sessionHeader('order') : '') + `<div class="card"><div class="step-k">Ordene · ${k + 1}/${list.length}</div><p>${esc(pt)}</p><div class="tiles" id="o-built"></div><div class="tiles" id="o-pool" style="border-style:solid"></div><button class="btn pri big" id="o-ok">Verificar</button></div><div id="o-after"></div>`;
      bindQuit(); draw();
      $('#o-pool').onclick = (e) => { const b = e.target.closest('[data-p]'); if (!b) return; built.push(pool.splice(+b.dataset.p, 1)[0]); draw(); };
      $('#o-built').onclick = (e) => { const b = e.target.closest('[data-b]'); if (!b) return; pool.push(built.splice(+b.dataset.b, 1)[0]); draw(); };
      $('#o-ok').onclick = () => {
        if (pool.length) return toast('Use todas as palavras.');
        const ans = built.map((x) => x.w).join(' '); const ok = G.norm(ans) === G.norm(de);
        recordGrammar(gid, ok, de, ans, de); $('#o-ok').disabled = true;
        $('#o-after').innerHTML = `<div class="fb ${ok ? 'ok' : 'bad'}"><b>${ok ? 'Richtig! ✓' : 'Ordem correta:'}</b><div class="why">${esc(words.join(' ') + punct)} ${audioBtn(de)}</div>${ok ? '' : '<div class="why">Lembre: verbo conjugado na 2ª posição (afirmações e W-perguntas) ou na 1ª (sim/não).</div>'}</div><button class="btn pri big" id="o-next">Continuar</button>`;
        $('#o-next').onclick = () => { k++; one(); };
      };
    };
    one();
  }

  /* ---------- Escuta ---------- */
  function stepDialog(step) {
    const u = C.units[step.unit];
    app().innerHTML = sessionHeader('dialog') + `<div class="card"><h2>Ouça primeiro, sem ler</h2><p class="small mut">${esc(u.dialogPt)} Tente entender pelo contexto. Ouça 2 vezes antes de abrir o texto.</p>
      <button class="btn pri big" id="dl-play">▶ Ouvir o diálogo</button><div id="dl-text" class="hide" style="margin-top:12px">
      ${u.dialog.map(([sp, l]) => `<div class="bubble ${sp === 'A' ? 't' : 'u'}"><b class="small">${sp}</b> ${esc(l)} ${audioBtn(l)}</div>`).join('')}</div>
      <button class="btn" id="dl-show" style="margin-top:12px">Mostrar texto</button></div><button class="btn pri big" id="dl-next">Continuar</button>`;
    bindQuit();
    if (!Audio.available()) { $('#dl-text').classList.remove('hide'); $('#dl-show').classList.add('hide'); }
    $('#dl-play').onclick = () => Audio.sayLines(u.dialog);
    $('#dl-show').onclick = () => { $('#dl-text').classList.remove('hide'); $('#dl-show').classList.add('hide'); };
    $('#dl-next').onclick = () => { unitState(step.unit).dialogHeard = now(); commit({ profile: true }); nextStep(); };
  }
  function stepListen(step, done) {
    const u = C.units[step.unit]; done = done || nextStep;
    if (!Audio.available()) { toast('Sem voz alemã neste aparelho: ditado pulado.'); return done(); }
    const sents = shuffle(u.listening).slice(0, step.n || 3); let k = 0;
    const one = () => {
      if (k >= sents.length) return done();
      const s = sents[k]; let plays = 0;
      app().innerHTML = (S.session ? sessionHeader('listen') : '') + `<div class="card"><div class="step-k">Ditado ${k + 1}/${sents.length}</div><div class="center" style="margin:12px">${audioBtn(s, 'lg')}</div>
        <button class="btn ghost" id="l-slow">🐢 mais devagar</button><textarea id="l-a" placeholder="Escreva o que ouviu" style="min-height:70px" autocapitalize="off" spellcheck="false"></textarea><button class="btn pri big" id="l-ok" style="margin-top:10px">Verificar</button></div><div id="l-after"></div>`;
      bindQuit();
      Audio.say(s); $('#l-slow').onclick = () => { plays++; Audio.say(s, { rate: 0.65 }); };
      $('#l-ok').onclick = () => {
        const wm = G.wordMatch($('#l-a').value, s); const ok = wm.ratio >= 0.8;
        const us = unitState(step.unit); us.listen = (us.listen || []).concat(+wm.ratio.toFixed(2)).slice(-20);
        const touched = M.recordAnswer(S.st, { key: 'listen:' + step.unit, ok, score: wm.ratio, issues: [], skill: 'hoeren' }, now()); tally(ok); commit(touched);
        $('#l-ok').disabled = true;
        $('#l-after').innerHTML = `<div class="fb ${ok ? 'ok' : 'bad'}"><b>${Math.round(wm.ratio * 100)}% das palavras</b><div class="why">${esc(s)}</div>${wm.missing.length ? `<div class="why">Faltou/errou: ${esc(wm.missing.join(', '))}</div>` : ''}</div><button class="btn pri big" id="l-next">Continuar</button>`;
        $('#l-next').onclick = () => { k++; one(); };
      };
    };
    one();
  }

  /* ---------- Pronúncia ---------- */
  function pairsQuiz(pairs, n, done) {
    if (!Audio.available()) { toast('Sem voz alemã: exercício de escuta pulado.'); return done(); }
    const qs = []; for (let i = 0; i < n; i++) { const pr = pairs[i % pairs.length]; qs.push({ pr, ans: pr[Math.random() < 0.5 ? 0 : 1] }); }
    let k = 0;
    const one = () => {
      if (k >= qs.length) return done();
      const q = qs[k];
      app().innerHTML = (S.session ? sessionHeader('pairs') : '') + `<div class="card"><div class="step-k">Qual você ouviu? ${k + 1}/${qs.length}</div><div class="center" style="margin:14px">${audioBtn(q.ans, 'lg')}</div>
        ${shuffle(q.pr).map((w) => `<button class="btn opt" data-w="${esc(w)}">${esc(w)}</button>`).join('')}</div><div id="pq-after"></div>`;
      bindQuit(); Audio.say(q.ans);
      $$('.opt').forEach((b) => b.onclick = () => {
        const ok = b.dataset.w === q.ans; $$('.opt').forEach((x) => { x.disabled = true; if (x.dataset.w === q.ans) x.classList.add('right'); }); if (!ok) b.classList.add('wrong');
        S.st.profile.pronStats.pairs = S.st.profile.pronStats.pairs.concat(ok ? 1 : 0).slice(-40);
        const touched = M.recordAnswer(S.st, { key: 'pair:' + q.pr.join('/'), ok, score: ok ? 1 : 0, issues: ok ? [] : [{ type: 'pron', msg: 'Contraste ' + q.pr.join(' / ') }], skill: 'aussprache' }, now()); tally(ok); commit(touched);
        $('#pq-after').innerHTML = `<div class="fb ${ok ? 'ok' : 'bad'}"><b>${ok ? 'Isso!' : 'Era: ' + esc(q.ans)}</b><div class="why">${q.pr.map((w) => esc(w) + ' ' + audioBtn(w)).join(' · ')}</div></div><button class="btn pri big" id="pq-next">Continuar</button>`;
        $('#pq-next').onclick = () => { k++; one(); };
      });
    };
    one();
  }
  function stepPron(step, done) {
    const L = C.pron[step.pron]; done = done || nextStep;
    app().innerHTML = (S.session ? sessionHeader('pron') : '') + `<div class="card"><h2>${esc(L.title)}</h2><p>${L.explain}</p>
      <table class="t">${L.words.map(([w, ipa, pt]) => `<tr><td>${audioBtn(w)}</td><td><b>${esc(w)}</b><div class="ipa">[${esc(ipa)}]</div></td><td class="small mut">${esc(pt)}</td></tr>`).join('')}</table>
      <h3>Repita em voz alta</h3><p class="small mut">Ouça cada palavra e repita 2–3 vezes, exagerando a diferença entre os pares.${S.caps.dictation ? ' Use 🎤 para ver se o reconhecimento automático entende você.' : ''}</p>
      ${S.caps.dictation ? `<div class="row"><input type="text" id="pr-in" class="grow" style="flex:1;width:auto" placeholder="o que o reconhecedor ouviu">${'<span id="pr-mic"></span>'}</div>` : ''}
      <p class="tiny mut">Limite: o reconhecimento de fala mede se você foi entendido, não avalia fonética com precisão.</p></div>
      <button class="btn pri big" id="pr-go">${L.pairs.length ? 'Teste de escuta' : 'Concluir lição'}</button>`;
    bindQuit();
    if (S.caps.dictation) $('#pr-mic').innerHTML = micControl($('#pr-in'));
    $('#pr-go').onclick = () => {
      const fin = () => { S.st.profile.pronStats.done[step.pron] = now(); commit({ profile: true }); done(); };
      if (L.pairs.length) pairsQuiz(L.pairs, 6, fin); else fin();
    };
  }
  function stepPairs(step) { const all = Object.values(C.pron).flatMap((l) => l.pairs); pairsQuiz(shuffle(all), 8, nextStep); }

  /* ---------- Fala (repetir/shadowing) ---------- */
  function stepSpeak(step, done) {
    done = done || nextStep;
    const u = C.units[step.unit];
    const known = u.items.map((id) => C.items[id]).filter((it) => it.type === 'phrase' && S.st.cards[it.id]);
    const src = (known.length >= 2 ? shuffle(known).map((x) => x.de) : u.dialog.map((d) => d[1])).slice(0, 2);
    let k = 0;
    const one = () => {
      if (k >= src.length) return done();
      const s = src[k];
      app().innerHTML = (S.session ? sessionHeader('speak') : '') + `<div class="card"><div class="step-k">Ouça e repita · ${k + 1}/${src.length}</div><div class="row" style="margin:10px 0">${audioBtn(s, 'lg')}<div class="de md">${esc(s)}</div></div>
        <p class="small mut">Repita junto com o áudio (shadowing) e depois sozinho, imitando o ritmo.</p>
        <div class="row"><input type="text" id="sp-a" class="grow" style="flex:1;width:auto" placeholder="${S.caps.dictation ? 'Toque 🎤 e fale' : 'Fale pelo microfone do teclado ou digite de memória'}" autocapitalize="off" spellcheck="false"><span id="sp-mic"></span></div>${micTip()}
        <div class="row" style="margin-top:10px"><button class="btn" id="sp-self">Falei, sem verificar</button><button class="btn pri grow" id="sp-ok">Verificar</button></div></div><div id="sp-after"></div>`;
      bindQuit(); const inp = $('#sp-a'); $('#sp-mic').innerHTML = micControl(inp); Audio.say(s);
      const fin = (ratio, self) => {
        const ok = ratio >= 0.8; const touched = M.recordAnswer(S.st, { key: 'speak:' + step.unit, ok, score: ratio, issues: [], skill: self ? null : (S.caps.dictation ? 'aussprache' : 'sprechen') }, now());
        if (!self) tally(ok); commit(touched); k++; one();
      };
      $('#sp-self').onclick = () => fin(1, true);
      $('#sp-ok').onclick = () => {
        const wm = G.wordMatch(inp.value, s);
        $('#sp-after').innerHTML = `<div class="fb ${wm.ratio >= 0.8 ? 'ok' : 'warn'}"><b>${Math.round(wm.ratio * 100)}% das palavras reconhecidas</b>${wm.missing.length ? `<div class="why">Não reconhecido: ${esc(wm.missing.join(', '))} — ouça de novo e foque nesses sons.</div>` : ''}<div class="why tiny">Isto mede inteligibilidade pelo reconhecedor (ou sua digitação), não uma avaliação fonética.</div></div><button class="btn pri big" id="sp-next">Continuar</button>`;
        $('#sp-ok').disabled = true; $('#sp-next').onclick = () => fin(wm.ratio, false);
      };
    };
    one();
  }

  /* ---------- Conversa com o professor (IA) ---------- */
  function knownVocab() { return Object.keys(S.st.cards).map((id) => C.items[id]).filter(Boolean).map((it) => it.type === 'noun' ? it.art + ' ' + it.de : it.de).slice(0, 220); }
  function recurringForPrompt() { return Object.values(S.st.mistakes).filter((m) => m.count >= 2 && m.fixed < 3).sort((a, b) => b.count - a.count).slice(0, 5).map((m) => m.msg); }
  async function askJSON(prompt, opts) {
    const s = S.caps.sample; if (!s) throw { code: 'no_ai' };
    try { const v = await s.json(prompt, Object.assign({ modelTier: 'default', cache: false }, opts || {})); return v; }
    catch (e) { if (e && e.code === 'not_granted') S.caps.sample = null; throw e; }
  }
  function convoPrompt(u, history, level) {
    return `Você é um professor de alemão (DaF) fazendo um role-play com um aluno brasileiro.
NÍVEL DO ALUNO: ${level} (unidade ${u.id}: ${u.title}).
CENA: ${u.speaking.scene}
SEU PERSONAGEM: ${u.speaking.persona}
METAS COMUNICATIVAS DO ALUNO (índices 0..${u.speaking.goals.length - 1}): ${u.speaking.goals.map((g, i) => i + '=' + g).join('; ')}
VOCABULÁRIO QUE O ALUNO JÁ VIU: ${knownVocab().join(', ') || '(quase nenhum)'}
DIFICULDADES RECORRENTES DO ALUNO (crie oportunidades naturais de praticar): ${recurringForPrompt().join(' | ') || 'nenhuma registrada'}
REGRAS:
- "reply": SÓ alemão, no máximo 2 frases curtas, nível ${level}, presente, priorize o vocabulário acima. Fique no personagem. Faça uma pergunta por vez que leve às metas.
- Corrija no máximo 2 erros REAIS da ÚLTIMA fala do aluno (artigo/gênero, conjugação, ordem V2, caso, palavra errada, ortografia de palavra). Não corrija nomes próprios, pontuação ou maiúsculas. Se não houver erro, corrections = [].
- "recast": a última fala do aluno reescrita de forma natural e correta ("" se já estava correta ou se não há fala).
- "explanation_pt": 1 frase curta em português do Brasil, explicando a regra.
- "category": artigo | conjugacao | ordem | caso | vocabulario | ortografia | outro
- "goals_done": índices de metas já cumpridas pelo aluno em TODA a conversa.
- "end": true só quando todas as metas foram cumpridas e houve uma despedida natural.
- "hint_pt": sugestão curta em português do que o aluno pode responder agora.
Responda APENAS com JSON: {"reply":"","reply_pt":"","corrections":[{"original":"","corrected":"","explanation_pt":"","category":""}],"recast":"","goals_done":[],"end":false,"hint_pt":""}
CONVERSA ATÉ AGORA:
${history.map((h) => (h.who === 't' ? 'PROFESSOR: ' : 'ALUNO: ') + h.text).join('\n') || '(início — abra a conversa cumprimentando, no personagem)'}`;
  }
  function stepConvo(step, done) {
    done = done || nextStep;
    const u = C.units[step.unit]; const level = 'A1';
    if (!S.caps.sample) return scriptedConvo(u, done);
    const hist = []; const goalsDone = new Set(); let busy = false, ended = false;
    const corrections = [];
    app().innerHTML = (S.session ? sessionHeader('convo') : '') + `<div class="card"><div class="step-k">Conversa · ${esc(u.title)}</div><p class="small">${esc(u.speaking.scene)}</p>
      <div class="chips small" id="cv-goals">${u.speaking.goals.map((g, i) => `<span class="chip" data-g="${i}">${esc(g)}</span>`).join('')}</div></div>
      <div id="cv-log"></div><div class="card"><div class="row"><input type="text" id="cv-in" class="grow" style="flex:1;width:auto" placeholder="Responda em alemão" autocapitalize="off" spellcheck="false"><span id="cv-mic"></span></div>${micTip()}
      <div class="row" style="margin-top:10px"><button class="btn" id="cv-help">Ajuda</button><button class="btn" id="cv-end">Encerrar</button><button class="btn pri grow" id="cv-send">Enviar</button></div><p class="small mut" id="cv-hint"></p></div>`;
    bindQuit();
    const inp = $('#cv-in'); $('#cv-mic').innerHTML = micControl(inp);
    const logEl = $('#cv-log');
    const add = (html) => { logEl.insertAdjacentHTML('beforeend', html); logEl.lastElementChild.scrollIntoView({ block: 'nearest' }); };
    let lastHint = '';
    const turn = async (userText) => {
      if (busy) return; busy = true; $('#cv-send').disabled = true;
      if (userText) { hist.push({ who: 'u', text: userText }); add(`<div class="bubble u">${esc(userText)}</div>`); }
      add('<div class="bubble t mut" id="cv-wait">…</div>');
      try {
        const r = await askJSON(convoPrompt(u, hist, level));
        $('#cv-wait') && $('#cv-wait').remove();
        if (userText) {
          for (const c of (r.corrections || []).slice(0, 2)) {
            corrections.push(c);
            add(`<div class="corr"><s>${esc(c.original)}</s> → <b>${esc(c.corrected)}</b><div class="why">${esc(c.explanation_pt)}</div></div>`);
            const touched = M.recordAnswer(S.st, { key: 'ai:' + (c.category || 'outro') + ':' + G.norm(c.corrected).slice(0, 40), ok: false, score: 0, issues: [{ type: 'ai', msg: (c.category || '') + ': ' + c.original + ' → ' + c.corrected + ' (' + c.explanation_pt + ')' }], given: c.original }, now());
            commit(touched);
          }
          if (r.recast && !(r.corrections || []).length) { /* frase já natural */ }
          // uso espontâneo de vocabulário conhecido (sem correção na mesma fala)
          if (!(r.corrections || []).length) { const hits = M.spontaneousHits(S.st, userText); for (const id of hits) S.st.cards[id].spont = (S.st.cards[id].spont || 0) + 1; if (hits.length) commit({ cards: hits }); }
        }
        hist.push({ who: 't', text: r.reply });
        add(`<div class="bubble t">${esc(r.reply)} ${audioBtn(r.reply)}<div class="pt hide">${esc(r.reply_pt || '')}</div><button class="btn ghost tiny" style="min-height:0;padding:2px 0" data-tr="1">tradução</button></div>`);
        Audio.say(r.reply).catch(() => {});
        (r.goals_done || []).forEach((i) => goalsDone.add(+i));
        $$('#cv-goals .chip').forEach((c) => c.classList.toggle('on', goalsDone.has(+c.dataset.g)));
        lastHint = r.hint_pt || ''; $('#cv-hint').textContent = '';
        if (r.end) { ended = true; finish(); }
      } catch (e) {
        $('#cv-wait') && $('#cv-wait').remove();
        if (e && e.code === 'rate_limited') add('<div class="fb warn">O professor está sobrecarregado agora. Espere um pouco e envie de novo.</div>');
        else { log('warn', 'convo: ' + (e && (e.code || e.message))); add('<div class="fb warn">A IA não respondeu. Vou seguir com a conversa roteirizada.</div>'); busy = false; return scriptedConvo(u, done); }
      }
      busy = false; $('#cv-send').disabled = false; inp.value = ''; inp.focus();
    };
    const finish = async () => {
      $('#cv-send').disabled = true; $('#cv-end').disabled = true;
      const userTurns = hist.filter((h) => h.who === 'u').length;
      const us = unitState(u.id);
      let evalHtml = '';
      if (userTurns >= 3) {
        try {
          const ev = await askJSON(`Avalie a fala (transcrita) de um aluno brasileiro de alemão nível A1 neste role-play. Metas: ${u.speaking.goals.join('; ')}. Transcrição:\n${hist.map((h) => (h.who === 't' ? 'PROFESSOR: ' : 'ALUNO: ') + h.text).join('\n')}\nCritérios (inspirados no Sprechen do Goethe A1): cumprimento da tarefa, compreensibilidade, adequação do vocabulário, correção. Seja honesto e não infle a nota. JSON apenas: {"score":1-5,"goals_met":[índices],"strengths_pt":["..."],"improve_pt":["..."],"next_focus_pt":"..."}`);
          const score = Math.max(1, Math.min(5, +ev.score || 1));
          us.convos = (us.convos || 0) + (score >= 3 ? 1 : 0); us.lastConvo = { at: now(), score, turns: userTurns };
          const touched = M.recordAnswer(S.st, { key: 'convo:' + u.id, ok: score >= 3, score: score / 5, issues: [], skill: 'sprechen' }, now()); commit(touched);
          evalHtml = `<div class="card"><h2>Avaliação: ${score}/5</h2><p class="small"><b>Pontos fortes:</b> ${esc((ev.strengths_pt || []).join(' · '))}</p><p class="small"><b>Melhorar:</b> ${esc((ev.improve_pt || []).join(' · '))}</p><p class="small"><b>Próximo foco:</b> ${esc(ev.next_focus_pt || '')}</p>${score >= 3 ? '' : '<p class="small mut">Conversa registrada, mas só conta para o critério da unidade com nota ≥ 3.</p>'}</div>`;
        } catch (e) { evalHtml = '<div class="fb warn">Não foi possível avaliar agora; a conversa foi registrada sem nota.</div>'; us.lastConvo = { at: now(), turns: userTurns }; commit({ profile: true }); }
      } else evalHtml = '<div class="fb warn">Conversa curta demais para avaliar (mínimo 3 falas suas). Não conta para o critério da unidade.</div>';
      add(evalHtml + '<button class="btn pri big" id="cv-next">Continuar</button>');
      $('#cv-next').onclick = done;
    };
    $('#cv-send').onclick = () => { const v = inp.value.trim(); if (v) turn(v); };
    inp.onkeydown = (e) => { if (e.key === 'Enter') { const v = inp.value.trim(); if (v) turn(v); } };
    $('#cv-help').onclick = () => { $('#cv-hint').textContent = lastHint ? '💡 ' + lastHint : 'Tente responder à última pergunta com uma frase curta.'; };
    $('#cv-end').onclick = () => { if (!ended) { ended = true; finish(); } };
    turn(null);
  }
  function scriptedConvo(u, done) {
    const lines = u.dialog; let k = 0; const scores = [];
    const box = () => {
      while (k < lines.length && lines[k][0] === 'A') k++;
      if (k >= lines.length) {
        const avg = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
        const us = unitState(u.id); if (avg >= 0.6) us.convos = (us.convos || 0) + 1;
        const touched = M.recordAnswer(S.st, { key: 'convo:' + u.id, ok: avg >= 0.6, score: avg, issues: [], skill: 'sprechen' }, now()); commit(touched);
        app().innerHTML = (S.session ? sessionHeader('convo') : '') + `<div class="card"><h2>Diálogo concluído</h2><p>Proximidade média com o modelo: ${pct(avg)}.</p><p class="small mut">Modo roteirizado (sem IA): compara sua fala com um modelo. Com a IA ativa, a conversa é livre e corrigida.</p></div><button class="btn pri big" id="sc-next">Continuar</button>`;
        bindQuit(); $('#sc-next').onclick = done; return;
      }
      const prev = lines[k - 1]; const target = lines[k][1];
      app().innerHTML = (S.session ? sessionHeader('convo') : '') + `<div class="card"><div class="step-k">Role-play roteirizado · ${esc(u.title)}</div>${prev ? `<div class="bubble t">${esc(prev[1])} ${audioBtn(prev[1])}</div>` : ''}
        <p class="small mut">Sua vez (você é B). Responda; pode personalizar nomes e lugares.</p><div class="row"><input type="text" id="sc-in" class="grow" style="flex:1;width:auto" autocapitalize="off" spellcheck="false"><span id="sc-mic"></span></div>${micTip()}
        <button class="btn pri big" id="sc-ok" style="margin-top:10px">Responder</button><div id="sc-after"></div></div>`;
      bindQuit(); const inp = $('#sc-in'); $('#sc-mic').innerHTML = micControl(inp); if (prev) Audio.say(prev[1]);
      $('#sc-ok').onclick = () => {
        const wm = G.wordMatch(inp.value, target); scores.push(wm.ratio);
        $('#sc-after').innerHTML = `<div class="fb ${wm.ratio >= 0.6 ? 'ok' : 'warn'}">Modelo: <b>${esc(target)}</b> ${audioBtn(target)}</div><button class="btn pri big" id="sc-next">Continuar</button>`;
        $('#sc-ok').disabled = true; $('#sc-next').onclick = () => { k++; box(); };
      };
    };
    box();
  }

  /* ---------- Escrita ---------- */
  function stepWrite(step, done) {
    done = done || nextStep;
    const u = C.units[step.unit];
    app().innerHTML = (S.session ? sessionHeader('write') : '') + `<div class="card"><div class="step-k">Schreiben · ${esc(u.title)}</div><p>${esc(u.writing)}</p><textarea id="w-a" placeholder="Schreib hier…" spellcheck="false" autocapitalize="sentences"></textarea>
      <div class="row" style="margin-top:10px"><button class="btn" id="w-skip">Pular</button><button class="btn pri grow" id="w-ok">${S.caps.sample ? 'Enviar para correção' : 'Autoavaliar'}</button></div></div><div id="w-after"></div>`;
    bindQuit();
    $('#w-skip').onclick = done;
    $('#w-ok').onclick = async () => {
      const text = $('#w-a').value.trim(); if (text.split(/\s+/).length < 8) return toast('Escreva pelo menos 8 palavras.');
      $('#w-ok').disabled = true; const us = unitState(u.id);
      if (!S.caps.sample) {
        $('#w-after').innerHTML = `<div class="card"><p class="small">Sem IA disponível. Confira você mesmo: verbo na 2ª posição? Substantivos com maiúscula e artigo certo? Todos os pontos da tarefa?</p><div class="row">${[1, 2, 3, 4, 5].map((n) => `<button class="btn" data-n="${n}">${n}</button>`).join('')}</div><p class="tiny mut">Autoavaliação fica marcada como tal no histórico.</p></div>`;
        $$('#w-after [data-n]').forEach((b) => b.onclick = () => { us.writing = { score: +b.dataset.n, at: now(), self: true, text }; const t = M.recordAnswer(S.st, { key: 'write:' + u.id, ok: +b.dataset.n >= 3, score: +b.dataset.n / 5, issues: [], skill: 'schreiben' }, now()); commit(t); done(); });
        return;
      }
      $('#w-after').innerHTML = '<div class="card mut">Corrigindo…</div>';
      try {
        const r = await askJSON(`Corrija um texto de um aluno brasileiro de alemão nível A1. Tarefa: "${u.writing}". Texto do aluno:\n"""${text}"""\nAvalie como o Schreiben do Goethe A1 (cumprimento da tarefa e compreensibilidade), dando nota 1–5: 5 = todos os pontos, poucos erros; 3 = maioria dos pontos e compreensível; 1 = incompreensível ou fora da tarefa. Não infle a nota. Liste até 6 erros reais. Explicações em português do Brasil, curtas. JSON apenas: {"score":1-5,"corrected_text":"","errors":[{"original":"","corrected":"","explanation_pt":"","category":"artigo|conjugacao|ordem|caso|vocabulario|ortografia|outro"}],"feedback_pt":""}`);
        const score = Math.max(1, Math.min(5, +r.score || 1));
        us.writing = { score, at: now(), text: text.slice(0, 1500) };
        const t = M.recordAnswer(S.st, { key: 'write:' + u.id, ok: score >= 3, score: score / 5, issues: [], skill: 'schreiben' }, now()); commit(t);
        for (const c of (r.errors || []).slice(0, 6)) { const tt = M.recordAnswer(S.st, { key: 'ai:' + (c.category || 'outro') + ':' + G.norm(c.corrected).slice(0, 40), ok: false, score: 0, issues: [{ type: 'ai', msg: (c.category || '') + ': ' + c.original + ' → ' + c.corrected + ' (' + c.explanation_pt + ')' }], given: c.original }, now()); commit(tt); }
        $('#w-after').innerHTML = `<div class="card"><h2>Nota: ${score}/5</h2><p class="small">${esc(r.feedback_pt || '')}</p>${(r.errors || []).map((c) => `<div class="corr" style="margin-left:0"><s>${esc(c.original)}</s> → <b>${esc(c.corrected)}</b><div class="why">${esc(c.explanation_pt)}</div></div>`).join('')}
          <h3>Versão corrigida</h3><p>${esc(r.corrected_text || '')} ${r.corrected_text ? audioBtn(r.corrected_text.slice(0, 1800)) : ''}</p></div><button class="btn pri big" id="w-next">Continuar</button>`;
        $('#w-next').onclick = done;
      } catch (e) { $('#w-after').innerHTML = '<div class="fb warn">A correção falhou agora; seu texto não foi perdido. Tente de novo.</div>'; $('#w-ok').disabled = false; log('warn', 'write: ' + (e && (e.code || e.message))); }
    };
  }

  /* ---------- Checkpoint (avaliação multi-habilidade) ---------- */
  function stepCheckpoint(step, done) {
    done = done || nextStep;
    const u = C.units[step.unit]; const by = { wortschatz: [], grammatik: [], hoeren: [], lesen: [], sprechen: [] };
    const vocab = shuffle(u.items.filter((id) => C.items[id].type !== 'phrase')).slice(0, 6);
    const phrases = shuffle(u.items.filter((id) => C.items[id].type === 'phrase'));
    const drills = shuffle((u.grammar || []).flatMap((g) => C.grammar[g].drills.map((d) => Object.assign({ g }, d)))).slice(0, 5);
    const listen = Audio.available() ? shuffle(u.listening).slice(0, 3) : [];
    const read = phrases.slice(0, 3); const speak = phrases.slice(3, 5);
    const Q = [];
    vocab.forEach((id) => Q.push({ sk: 'wortschatz', id }));
    drills.forEach((d) => Q.push({ sk: 'grammatik', d }));
    listen.forEach((s) => Q.push({ sk: 'hoeren', s }));
    read.forEach((id) => Q.push({ sk: 'lesen', id }));
    speak.forEach((id) => Q.push({ sk: 'sprechen', id }));
    let k = 0;
    const one = () => {
      if (k >= Q.length) return result();
      const q = Q[k]; let body = '', accepted, mode = 'text', opts;
      if (q.sk === 'wortschatz') { const it = C.items[q.id]; body = `<p>Em alemão${it.type === 'noun' ? ', com artigo' : ''}:</p><div class="de md">${esc(it.pt)}</div>`; accepted = answerFor(it); }
      if (q.sk === 'grammatik') { body = `<div class="de md">${esc(q.d.q)}</div>`; accepted = q.d.a; }
      if (q.sk === 'hoeren') { body = `<p>Escreva o que ouvir:</p><div class="center">${audioBtn(q.s, 'lg')}</div>`; accepted = [q.s]; mode = 'words'; }
      if (q.sk === 'lesen') { const it = C.items[q.id]; mode = 'mc'; opts = shuffle([it, ...distractors(it, 3)]); body = `<p>O que significa?</p><div class="de md">${esc(it.de)}</div>`; accepted = [it.id]; }
      if (q.sk === 'sprechen') { const it = C.items[q.id]; body = `<p>Diga em alemão (fale${S.caps.dictation ? ' no 🎤' : ' pelo microfone do teclado'} ou digite):</p><div class="de md">${esc(it.pt)}</div>`; accepted = [it.de]; mode = 'words'; }
      app().innerHTML = (S.session ? sessionHeader('checkpoint') : '') + `<div class="card"><div class="step-k">Checkpoint ${esc(u.id)} · ${k + 1}/${Q.length} · ${esc(M.SKILL_PT[q.sk])}</div><p class="tiny mut">Sem dicas e sem correção imediata — é uma avaliação.</p>${body}
        ${mode === 'mc' ? opts.map((o) => `<button class="btn opt" data-id="${o.id}">${esc(o.pt)}</button>`).join('') : `<div class="row"><input type="text" id="c-a" class="grow" style="flex:1;width:auto" autocomplete="off" autocapitalize="off" spellcheck="false"><span id="c-mic"></span></div><button class="btn pri big" id="c-ok" style="margin-top:10px">Próxima</button>`}</div>`;
      bindQuit();
      if (q.sk === 'hoeren') Audio.say(q.s);
      const rec = (v) => { by[q.sk].push(v); k++; one(); };
      if (mode === 'mc') $$('.opt').forEach((b) => b.onclick = () => rec(b.dataset.id === accepted[0] ? 1 : 0));
      else {
        const inp = $('#c-a'); if (q.sk === 'sprechen') $('#c-mic').innerHTML = micControl(inp);
        const go = () => { const v = inp.value; let sc; if (mode === 'words') sc = G.wordMatch(v, accepted[0]).ratio >= 0.8 ? 1 : 0; else { const r = G.check(v, accepted, { noun: q.sk === 'wortschatz' && C.items[q.id].type === 'noun' }); sc = r.ok && r.score >= 0.9 ? 1 : 0; } rec(sc); };
        $('#c-ok').onclick = go; inp.onkeydown = (e) => { if (e.key === 'Enter') go(); }; setTimeout(() => inp.focus(), 50);
      }
    };
    const result = () => {
      const bySkill = {}; let tot = 0, n = 0;
      for (const [sk, arr] of Object.entries(by)) if (arr.length) { bySkill[sk] = arr.reduce((a, b) => a + b, 0) / arr.length; tot += arr.reduce((a, b) => a + b, 0); n += arr.length; }
      const score = n ? tot / n : 0; const pass = M.checkpointPass(score, bySkill);
      const us = unitState(u.id); us.checkpoint = { score, bySkill, at: now() };
      if (pass) us.passed = now();
      const a = { id: 'cp_' + u.id + '_' + now(), type: 'checkpoint', unit: u.id, at: now(), score, bySkill, pass, noAudio: !listen.length };
      S.st.assess.push(a); S.store.saveAssess(a);
      for (const [sk, v] of Object.entries(bySkill)) { S.st.profile.skillStats[sk] = (S.st.profile.skillStats[sk] || []).concat({ t: now(), v, cp: 1 }).slice(-50); }
      commit({ profile: true });
      app().innerHTML = (S.session ? sessionHeader('checkpoint') : '') + `<div class="card"><h2>${pass ? 'Unidade comprovada ✓' : 'Ainda não'}</h2><p>Total: <b>${pct(score)}</b> (meta 80%, e ≥ 70% em cada habilidade)</p>
        ${Object.entries(bySkill).map(([sk, v]) => `<div class="bar"><span>${esc(M.SKILL_PT[sk])}</span><div class="prog"><i style="width:${v * 100}%;${v < 0.7 ? 'background:var(--bad)' : ''}"></i></div><b>${pct(v)}</b></div>`).join('')}
        ${!listen.length ? '<p class="small mut">Audição não avaliada (sem voz alemã neste aparelho). Refaça num aparelho com áudio para uma avaliação completa.</p>' : ''}
        <p class="small mut">${pass ? 'A próxima unidade foi liberada. As revisões desta continuam.' : 'O próximo plano vai reforçar as habilidades abaixo de 70%. Tente de novo depois de algumas sessões.'}</p></div><button class="btn pri big" id="c-next">Continuar</button>`;
      $('#c-next').onclick = done;
    };
    one();
  }

  /* ---------------- Praticar (livre) ---------------- */
  function renderPractice() {
    const uid = M.currentUnit(S.st) || 'A1-U1'; const u = C.units[uid];
    const unlocked = C.unitOrder.filter((id) => id !== 'A0-P' && (id === uid || (S.st.profile.unitState[id] || {}).passed));
    shell('praticar', `
      <div class="card"><h2>Conversar</h2><p class="small mut">${S.caps.sample ? 'Professor com IA: conversa livre no seu nível, com correções e avaliação.' : 'IA indisponível nesta visualização: role-play roteirizado.'}</p>
        <div class="chips">${unlocked.map((id) => `<button class="chip" data-cv="${id}">${esc(C.units[id].title)}</button>`).join('')}</div></div>
      <div class="card"><h2>Revisar agora</h2><p class="small mut">${M.dueList(S.st, now()).length} revisões pendentes.</p><button class="btn pri" id="p-rev">Só revisões (10 min)</button></div>
      <div class="card"><h2>Gramática</h2><div class="chips">${Object.entries(C.grammar).filter(([, g]) => unlocked.includes(g.unit)).map(([id, g]) => `<button class="chip" data-g="${id}">${esc(g.title)}</button>`).join('')}</div></div>
      <div class="card"><h2>Pronúncia</h2><div class="chips">${Object.entries(C.pron).map(([id, l]) => `<button class="chip ${S.st.profile.pronStats.done[id] ? 'on' : ''}" data-pr="${id}">${esc(l.title)}</button>`).join('')}</div><button class="btn" id="p-pairs" style="margin-top:10px">Teste de pares mínimos</button></div>
      <div class="card"><h2>Escuta e escrita</h2><div class="row"><button class="btn" id="p-dict">Ditado (${esc(u.title)})</button><button class="btn" id="p-dlg">Ouvir diálogo</button><button class="btn" id="p-wr">Texto curto</button></div></div>
      <div class="card"><h2>Vocabulário</h2><a class="btn" href="#vocabulario">Ver todos os itens e seu domínio</a></div>`);
    const solo = (fn) => { $('nav.tabs').classList.add('hide'); fn(() => { location.hash = '#praticar'; route(); }); };
    $$('[data-cv]').forEach((b) => b.onclick = () => solo((d) => stepConvo({ unit: b.dataset.cv }, d)));
    $$('[data-g]').forEach((b) => b.onclick = () => solo((d) => { const g = C.grammar[b.dataset.g]; app().innerHTML = grammarIntroHtml(g) + '<button class="btn pri big" id="g-go">Praticar</button>'; $('#g-go').onclick = () => g.order ? runOrder(b.dataset.g, shuffle(g.order).slice(0, 5), d) : runDrills(b.dataset.g, shuffle(g.drills).slice(0, 6), d); }));
    $$('[data-pr]').forEach((b) => b.onclick = () => solo((d) => stepPron({ pron: b.dataset.pr }, d)));
    $('#p-pairs').onclick = () => solo((d) => pairsQuiz(shuffle(Object.values(C.pron).flatMap((l) => l.pairs)), 8, d));
    $('#p-dict').onclick = () => solo((d) => stepListen({ unit: uid, n: 5 }, d));
    $('#p-dlg').onclick = () => solo((d) => { app().innerHTML = `<div class="card"><h2>${esc(u.title)}</h2>${u.dialog.map(([sp, l]) => `<div class="bubble ${sp === 'A' ? 't' : 'u'}">${esc(l)} ${audioBtn(l)}</div>`).join('')}<button class="btn pri" id="dd-p">▶ Ouvir tudo</button></div><button class="btn big" id="dd-b">Voltar</button>`; $('#dd-p').onclick = () => Audio.sayLines(u.dialog); $('#dd-b').onclick = d; });
    $('#p-wr').onclick = () => solo((d) => stepWrite({ unit: uid }, d));
    $('#p-rev').onclick = () => { const plan = { steps: M.dueList(S.st, now()).slice(0, 40).map((x) => ({ kind: 'review', id: x.id, stage: x.stage })), unit: null, notes: [] }; if (!plan.steps.length) return toast('Nenhuma revisão pendente agora.'); startSession(plan); };
  }
  function renderVocab() {
    const t = now(); const q = (S.vq || '').toLowerCase();
    const rows = C.unitOrder.filter((u) => u !== 'A0-P').flatMap((uid) => C.units[uid].items.map((id) => C.items[id])).filter((it) => !q || (it.de + ' ' + it.pt).toLowerCase().includes(q));
    shell('praticar', `<div class="card"><h2>Vocabulário (${rows.length})</h2><input type="text" id="v-q" placeholder="Buscar" value="${esc(S.vq || '')}">
      <p class="tiny mut">Domínio: 0 novo · 1 reconhece · 2 lembra sem ajuda (≥1 acerto espaçado) · 3 usa em frase · 4 usa espontaneamente na conversa. “R” = probabilidade estimada de lembrar agora.</p>
      <table class="t">${rows.map((it) => { const c = S.st.cards[it.id]; const m = M.mastery(c, t); const R = c && c.stages.recall.reps ? F.currentR(c.stages.recall, t) : null; return `<tr class="${c ? '' : 'lock'}"><td>${audioBtn(it.type === 'noun' ? it.art + ' ' + it.de : it.de)}</td><td><b>${artHtml(it)}</b>${it.type === 'noun' ? `<div class="tiny mut">pl. ${esc(plStr(it))}</div>` : ''}<div class="small mut">${esc(it.pt)}</div></td><td class="small">${c ? M.MASTERY_PT[m] : '—'}${R != null ? `<div class="tiny mut">R ${pct(R)}</div>` : ''}${c && M.forgetting(c, t) ? '<div class="tiny" style="color:var(--bad)">esquecendo</div>' : ''}</td></tr>`; }).join('')}</table></div>`);
    const inp = $('#v-q'); inp.oninput = () => { S.vq = inp.value; clearTimeout(S.vqt); S.vqt = setTimeout(() => { renderVocab(); const i2 = $('#v-q'); i2.focus(); i2.setSelectionRange(i2.value.length, i2.value.length); }, 300); };
  }

  /* ---------------- Progresso ---------------- */
  function renderProgress() {
    const t = now(), st = S.st, s = M.stats(st, t), lvl = M.estimateLevel(st), sk = M.streak(st, t);
    shell('progresso', `
      <div class="card"><div class="step-k">Nível estimado</div><h2>${esc(lvl.label)}</h2><p class="small mut">${esc(lvl.detail)} O nível só sobe com checkpoints aprovados em todas as habilidades — nunca por tempo de uso.</p></div>
      <div class="card"><h2>Vocabulário</h2><div class="kpis">
        <div class="kpi"><b>${s.introduced}</b><span>introduzidos</span></div><div class="kpi"><b>${s.recalledPlus}</b><span>lembra sem ajuda (domínio ≥ 2)</span></div>
        <div class="kpi"><b>${s.retained}</b><span>retidos agora (R ≥ 90%)</span></div><div class="kpi"><b>${s.forgetting.length}</b><span>sendo esquecidos</span></div></div>
        <div style="margin-top:10px">${M.MASTERY_PT.map((l, i) => `<div class="bar"><span>${i} · ${l}</span><div class="prog"><i style="width:${s.introduced ? 100 * s.byMastery[i] / s.introduced : 0}%"></i></div><b>${s.byMastery[i]}</b></div>`).join('')}</div></div>
      <div class="card"><h2>Recente × longo prazo</h2><div class="kpis"><div class="kpi"><b>${pct(s.acc7)}</b><span>acerto nas revisões, últimos 7 dias</span></div><div class="kpi"><b>${pct(s.longRet)}</b><span>retenção de longo prazo (${s.longN} revisões após ≥ 7 dias)</span></div></div>
        <p class="tiny mut">Desempenho recente mede o que está fresco; retenção de longo prazo conta só revisões feitas 7+ dias depois da anterior. É a segunda que indica aprendizagem durável.</p></div>
      <div class="card"><h2>Por habilidade</h2>${s.skills.map((x) => `<div class="bar"><span>${esc(x.label)}</span><div class="prog"><i style="width:${(x.rate || 0) * 100}%"></i></div><b>${x.n ? pct(x.rate) : '—'}</b></div>`).join('')}
        <p class="tiny mut">Média das últimas 30 respostas avaliadas de cada habilidade (0–100%). “—” = ainda sem evidência. Habilidades são medidas separadamente: acertar vocabulário não compensa a escuta.</p></div>
      <div class="card"><h2>Rotina</h2><div class="kpis"><div class="kpi"><b>${(s.minutes / 60).toFixed(1)} h</b><span>de estudo</span></div><div class="kpi"><b>${s.sessions}</b><span>sessões</span></div><div class="kpi"><b>${sk.current}</b><span>dias seguidos</span></div><div class="kpi"><b>${sk.week}/7</b><span>dias nesta semana</span></div></div></div>
      <div class="card"><h2>Erros recorrentes</h2>${s.topMistakes.length ? `<table class="t">${s.topMistakes.map((m) => `<tr><td class="small">${esc(m.msg)}</td><td class="small">${m.count}×</td><td class="tiny mut">${m.fixed}/3 acertos</td></tr>`).join('')}</table><p class="tiny mut">Um erro é considerado resolvido após 3 acertos seguidos do mesmo ponto.</p>` : '<p class="small mut">Nenhum erro repetido (2× ou mais) ainda.</p>'}</div>
      <div class="card"><h2>Avaliações</h2>${st.assess.length ? `<table class="t">${st.assess.slice().reverse().map((a) => `<tr><td class="small">${new Date(a.at).toLocaleDateString('pt-BR')}</td><td class="small">${esc(a.type)} ${esc(a.unit || '')}</td><td class="small">${pct(a.score)} ${a.pass ? '✓' : '✗'}</td></tr>`).join('')}</table>` : '<p class="small mut">Nenhuma ainda. O checkpoint aparece quando a unidade cumpre os critérios.</p>'}</div>
      <div class="card"><h2>Ajustes automáticos</h2>${(st.profile.adapt || []).slice().reverse().slice(0, 8).map((a) => `<p class="small">${new Date(a.t).toLocaleDateString('pt-BR')}: itens novos/dia ${a.from == null ? '' : a.from + ' → '}${a.to} — ${esc(a.why)}</p>`).join('')}<p class="tiny mut">Ajustes são heurísticos e registrados com o motivo. Correlação no seu histórico não prova que uma estratégia funciona melhor para você.</p></div>`);
  }

  /* ---------------- Currículo ---------------- */
  function renderCurriculum() {
    const t = now();
    shell('curriculo', C.levels.map((L) => `<div class="card"><div class="row sp"><h2>${L.id} — ${esc(L.name)}</h2><span class="lvl">${esc(L.hours)}</span></div>
      <ul class="list small">${L.canDo.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>${L.exam !== '—' ? `<p class="tiny mut">Exame correspondente: ${esc(L.exam)}</p>` : ''}
      ${L.matrix ? `<details><summary class="small">Matriz de competências</summary><table class="t">${Object.entries(L.matrix).map(([k, v]) => `<tr><td><b>${esc(k)}</b></td><td class="small">${esc(v)}</td></tr>`).join('')}</table></details>` : ''}
      ${L.modules.map((m) => `<h3>${esc(m.title)}</h3>${m.units.map((uid) => { const u = C.units[uid]; const st = M.unitStatus(S.st, uid, t); const cur = M.currentUnit(S.st) === uid; return `<details ${cur ? 'open' : ''}><summary>${st.passed ? '✅' : cur ? '▶️' : uid === 'A0-P' ? '🔈' : '🔒'} ${esc(u.title)} <span class="mut small">${esc(u.subtitle)}</span></summary>
        <p class="small"><b>Objetivos:</b> ${u.goals.map(esc).join(' · ')}</p>${u.grammar.length ? `<p class="small"><b>Gramática:</b> ${u.grammar.map((g) => esc(C.grammar[g].title)).join(' · ')}</p>` : ''}
        <p class="small"><b>Pré-requisito:</b> ${u.prereq.length ? u.prereq.join(', ') : 'nenhum'} · <b>Critério:</b> ${esc(u.criteria)}</p>${unitChecklist(st)}</details>`; }).join('')}
        ${m.planned ? `<p class="small mut">Planejado (carregado quando você chegar lá): ${m.planned.map(esc).join(' · ')}</p>` : ''}`).join('')}</div>`).join('') +
      `<div class="card"><p class="small mut">O conteúdo é carregado progressivamente. Versão do conteúdo: ${esc(C.version)}. Seu histórico é guardado por id de item, então correções e ampliações do currículo não apagam o progresso.</p></div>`);
  }

  /* ---------------- Mais ---------------- */
  function renderMore() {
    shell('mais', `<div class="card"><a class="btn big" href="#calendario" style="display:block;text-align:left;margin-bottom:8px">📅 Calendário e previsão de revisões</a>
      <a class="btn big" href="#metodo" style="display:block;text-align:left;margin-bottom:8px">🔬 Método, evidências e referências</a>
      <a class="btn big" href="#dados" style="display:block;text-align:left;margin-bottom:8px">💾 Dados, backup e restauração</a>
      <a class="btn big" href="#sync" style="display:block;text-align:left;margin-bottom:8px">🔄 Sincronizar entre aparelhos${syncBadge()}</a>
      <a class="btn big" href="#ajustes" style="display:block;text-align:left">⚙️ Ajustes</a></div>
      <div class="card small"><b>O que funciona aqui</b><ul class="list">
        <li>Armazenamento: ${{ db: '✅ banco na nuvem do Claude (privado)', native: '✅ arquivo no seu PC, com cópias automáticas', device: '✅ neste aparelho (exporte backups de vez em quando)', local: '⚠️ banco indisponível — usando o navegador (pode ser perdido)' }[S.mode]}</li>
        <li>Professor com IA (conversa e correção de textos): ${S.caps.sample ? '✅' + (S.caps.sample.local ? ' via sua chave de API' : '') : window.claude ? '⚠️ indisponível nesta visualização — modo roteirizado' : '⚠️ desligado — configure uma chave em Ajustes (opcional)'}</li>
        <li>Voz alemã (TTS): ${Audio.voice ? '✅ voz do aparelho: ' + esc(Audio.voice.name) : S.caps.tts ? '✅ voz do Claude' : '⚠️ indisponível — veja “Voz e microfone” abaixo'}</li>
        <li>Reconhecimento de fala: ${S.caps.dictation ? '✅' : GF.local && GF.local.isElectron ? '🎤 use o ditado do Windows: Win + H' : '⚠️ indisponível aqui — veja “Voz e microfone” abaixo'}</li>
        <li>Notificações push: ❌ não disponíveis. Use lembretes do calendário do celular.</li></ul>
        ${window.gfsNative ? '<button class="btn" id="m-folder">Abrir pasta dos dados</button>' : ''}</div>`);
    const mf = $('#m-folder'); if (mf) mf.onclick = () => window.gfsNative.openDataFolder();
    $('#app').insertAdjacentHTML('beforeend', voiceCardHtml()); bindVoiceCard();
  }
  function renderCalendar() {
    const t = now(), st = S.st, p = st.profile;
    const fc = M.forecast(st, t, 14); const mx = Math.max(1, ...fc.map((d) => d.n));
    const wd = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
    const AD = M.allDays(st);
    const cells = []; for (let i = 27; i >= 0; i--) { const k = M.dayKey(t - i * 86400000); const d = AD[k]; const m = d ? d.minutes : 0; cells.push(`<div class="cell ${m >= 20 ? 'l3' : m >= 10 ? 'l2' : m > 0 ? 'l1' : ''}" title="${k}: ${m.toFixed ? m.toFixed(0) : m} min">${new Date(t - i * 86400000).getDate()}</div>`); }
    const weekMin = Object.values(AD).filter((d) => t - new Date(d.date + 'T12:00:00').getTime() < 7 * 86400000).reduce((a, d) => a + d.minutes, 0);
    const goal = p.diag.minutes * p.diag.days.length;
    shell('mais', `<div class="card"><h2>Esta semana</h2><p>${Math.round(weekMin)} de ${goal} min planejados</p><div class="prog"><i style="width:${Math.min(100, 100 * weekMin / goal)}%"></i></div>
      <p class="small mut">Dias planejados: ${p.diag.days.map((d) => wd[d]).join(', ')}. Perdeu um dia? Nada é cobrado em dobro: o FSRS só reprioriza.</p></div>
      <div class="card"><h2>Revisões previstas (14 dias)</h2><div class="forecast">${fc.map((d) => `<div style="height:${100 * d.n / mx}%" title="${d.date}: ${d.n}"></div>`).join('')}</div>
      <div class="forecast-l">${fc.map((d, i) => `<span>${i === 0 ? 'hoje' : new Date(d.date + 'T12:00:00').getDate()}</span>`).join('')}</div><p class="tiny mut">Contagem de estágios de item com revisão vencendo em cada dia, calculada pelo FSRS. Hoje inclui atrasadas.</p></div>
      <div class="card"><h2>Últimas 4 semanas</h2><div class="grid7">${cells.join('')}</div><p class="tiny mut">Cor = minutos estudados no dia (claro &lt; 10, médio 10–20, escuro ≥ 20).</p></div>`);
  }
  function renderMethod() {
    const Mt = GF.method;
    shell('mais', `<div class="card"><h2>Como este professor ensina</h2><p class="small">Combinação das técnicas com melhor evidência, aplicadas de forma verificável. Classificação: <span class="lvl ev-A">A</span> meta-análises/revisões sistemáticas consistentes · <span class="lvl ev-B">B</span> experimentos e revisões com resultados positivos, mas com limites · <span class="lvl ev-C">C</span> hipótese teórica ou opinião pedagógica.</p></div>
      ${Mt.T.map((x) => `<div class="card"><div class="row sp"><h2 style="font-size:16px">${esc(x.n)}</h2><span class="lvl ev-${x.ev[0]}">${x.ev}</span></div>
        <p class="small"><b>O que é:</b> ${esc(x.what)}</p><p class="small"><b>Como funciona:</b> ${esc(x.how)}</p><p class="small"><b>Evidência:</b> ${esc(x.evidence)}</p><p class="small"><b>Aplicação aqui:</b> ${esc(x.apply)}</p><p class="small"><b>Quando:</b> ${esc(x.when)} · <b>Como medimos:</b> ${esc(x.measure)}</p>
        <details><summary class="small">Referências</summary>${x.refs.map((r) => `<p class="ref">${Mt.REF[r]}</p>`).join('')}</details></div>`).join('')}
      <div class="card"><h2>Usado com cautela</h2>${Mt.NOT.map(([n, d, e]) => `<p class="small"><span class="lvl ev-C">${e}</span> <b>${esc(n)}</b> — ${esc(d)}</p>`).join('')}</div>
      <div class="card"><h2>FSRS × SM-2</h2><p class="small">O SM-2 (1987) usa um único “fator de facilidade” por cartão, que mistura dificuldade e intervalo, e não estima a probabilidade de lembrar. O FSRS modela separadamente dificuldade, estabilidade e retrievability, ajusta-se ao histórico e permite escolher a retenção-alvo. No benchmark aberto do projeto, o FSRS prevê a lembrança melhor que o SM-2 para a grande maioria das coleções testadas. Escolhido: FSRS-5 com pesos padrão; com histórico suficiente, os pesos podem ser otimizados para você numa versão futura.</p></div>
      <div class="card"><h2>Limites honestos</h2><ul class="list small"><li>Reconhecimento automático de fala mede inteligibilidade, não fonética fina.</li><li>Correções e notas da IA podem errar; erros recorrentes são revisados por regras fixas também.</li><li>Exemplos são frases didáticas; material autêntico entra a partir de A2/B1, com licença adequada.</li><li>Ajustes adaptativos são heurísticos; não provam causa.</li></ul></div>
      <div class="card"><h2>Referências institucionais</h2>${Mt.INST.map(([n, u]) => `<p class="ref"><a href="${u}" target="_blank" rel="noopener">${esc(n)}</a></p>`).join('')}</div>`);
  }
  function renderSettings() {
    const p = S.st.profile;
    shell('mais', `<div class="card"><h2>Ajustes</h2>
      <h3>Retenção-alvo do FSRS: <span id="s-rv">${Math.round(p.settings.desiredR * 100)}%</span></h3><input type="range" id="s-r" min="80" max="95" value="${Math.round(p.settings.desiredR * 100)}" style="width:100%"><p class="tiny mut">Mais alta = mais revisões e menos esquecimento. 90% é o padrão recomendado.</p>
      <h3>Itens novos por dia: <span id="s-nv">${p.settings.newPerDay}</span></h3><input type="range" id="s-n" min="3" max="20" value="${p.settings.newPerDay}" style="width:100%"><p class="tiny mut">O sistema continua ajustando isto pela sua retenção.</p>
      <h3>Velocidade da voz: <span id="s-tv">${p.settings.ttsRate}</span></h3><input type="range" id="s-t" min="60" max="110" value="${Math.round(p.settings.ttsRate * 100)}" style="width:100%">
      <h3>Tempo por dia</h3><div class="chips" id="s-min">${[10, 20, 30, 45].map((m) => `<button class="chip ${p.diag.minutes === m ? 'on' : ''}" data-m="${m}">${m} min</button>`).join('')}</div>
      ${!window.claude ? `<h3>Professor com IA (opcional)</h3><p class="small mut">Fora do Claude.ai, a conversa livre e a correção de textos usam a API da Anthropic com <b>sua</b> chave (cobrança por uso, separada da assinatura do Claude). Crie em console.anthropic.com → API Keys. A chave fica só neste aparelho e nunca entra nos backups. Sem chave, a conversa usa o modo roteirizado.</p>
        <input type="text" id="s-key" placeholder="sk-ant-..." value="${esc(GF.local.aiSettings().key ? '••••••••' + GF.local.aiSettings().key.slice(-4) : '')}" autocomplete="off" spellcheck="false">
        <div class="chips" id="s-model" style="margin-top:8px">${[['claude-sonnet-5-5', 'Sonnet (melhor correção)'], ['claude-haiku-5-5', 'Haiku (mais barato)']].map(([m, l]) => `<button class="chip ${(GF.local.aiSettings().model || 'claude-sonnet-5-5') === m ? 'on' : ''}" data-mod="${m}">${l}</button>`).join('')}</div>
        <div class="row" style="margin-top:8px"><button class="btn" id="s-ktest">Testar e salvar chave</button><button class="btn ghost" id="s-kdel">Remover chave</button></div>` : ''}
      <div style="height:12px"></div><button class="btn pri big" id="s-save">Salvar</button><button class="btn big" id="s-diag" style="margin-top:8px">Refazer diagnóstico (mantém o histórico)</button></div>`);
    $('#s-r').oninput = (e) => $('#s-rv').textContent = e.target.value + '%';
    $('#s-n').oninput = (e) => $('#s-nv').textContent = e.target.value;
    $('#s-t').oninput = (e) => $('#s-tv').textContent = (e.target.value / 100).toFixed(2);
    let mins = p.diag.minutes; $('#s-min').onclick = (e) => { const b = e.target.closest('[data-m]'); if (!b) return; mins = +b.dataset.m; $$('#s-min .chip').forEach((c) => c.classList.toggle('on', +c.dataset.m === mins)); };
    $('#s-save').onclick = () => {
      const old = p.settings.newPerDay; p.settings.desiredR = +$('#s-r').value / 100; p.settings.newPerDay = +$('#s-n').value; p.settings.ttsRate = +$('#s-t').value / 100; p.diag.minutes = mins;
      if (old !== p.settings.newPerDay) p.adapt = (p.adapt || []).concat({ t: now(), from: old, to: p.settings.newPerDay, why: 'alterado manualmente' });
      commit({ profile: true }); toast('Salvo.');
    };
    $('#s-diag').onclick = () => { p.diag = null; commit({ profile: true }); renderOnboarding(); };
    if (!window.claude) {
      let model = GF.local.aiSettings().model || 'claude-sonnet-5-5';
      $('#s-model').onclick = (e) => { const b = e.target.closest('[data-mod]'); if (!b) return; model = b.dataset.mod; $$('#s-model .chip').forEach((c) => c.classList.toggle('on', c.dataset.mod === model)); const cfg = GF.local.aiSettings(); if (cfg.key) { cfg.model = model; GF.local.saveAiSettings(cfg); S.caps.sample = GF.local.makeSample(); toast('Modelo alterado.'); } };
      $('#s-ktest').onclick = async () => {
        const v = $('#s-key').value.trim(); const cfg = GF.local.aiSettings();
        const key = v.startsWith('••') ? cfg.key : v; if (!key) return toast('Cole a chave primeiro.');
        $('#s-ktest').disabled = true; $('#s-ktest').textContent = 'Testando…';
        try { await GF.local.testKey(key, model); GF.local.saveAiSettings({ key, model }); S.caps.sample = GF.local.makeSample(); toast('Chave funcionando. Professor com IA ativado.'); renderSettings(); }
        catch (e) { toast('Não funcionou: ' + e.message, 5000); $('#s-ktest').disabled = false; $('#s-ktest').textContent = 'Testar e salvar chave'; }
      };
      $('#s-kdel').onclick = () => { GF.local.saveAiSettings({}); S.caps.sample = null; toast('Chave removida.'); renderSettings(); };
    }
  }

  /* ---------------- Dados ---------------- */
  function renderData() {
    const st = S.st;
    shell('mais', `<div class="card"><h2>Seus dados</h2><p class="small">Armazenamento: <b>${{ db: 'banco de dados do app (privado, por usuário)', native: 'arquivo no seu PC', device: 'memória deste aparelho', local: 'navegador local (temporário)' }[S.mode]}</b>. ${Object.keys(st.cards).length} itens, ${Object.keys(st.days).length} dias, ${Object.keys(st.mistakes).length} padrões de erro, ${st.assess.length} avaliações.</p>
      <p class="small mut">Seu histórico é independente da IA: é um registro estruturado (FSRS, erros, avaliações) que qualquer modelo pode ler. Exporte o JSON para guardar ou migrar.</p>
      <div class="row"><button class="btn pri" id="d-exp">Exportar backup (JSON)</button><button class="btn" id="d-copy">Copiar JSON</button><label class="btn">Restaurar de arquivo<input type="file" id="d-imp" accept=".json,application/json" class="sr"></label></div></div>
      <div class="card"><h2>Backups automáticos (semanais)</h2><div id="d-auto" class="small mut">Carregando…</div></div>
      <div class="card"><h2>Integridade e registros</h2><p class="small">Registros inválidos ignorados na última carga: ${st.integrity.dropped}. Versão do esquema: ${GF.store.SCHEMA}. Conteúdo: ${esc(C.version)}.</p>
      <details><summary class="small">Log técnico (${LOG.length})</summary><table class="t">${LOG.slice().reverse().map((l) => `<tr><td class="tiny">${new Date(l.t).toLocaleTimeString('pt-BR')}</td><td class="tiny">${l.level}</td><td class="tiny">${esc(l.msg)}</td></tr>`).join('')}</table></details></div>`);
    const json = () => JSON.stringify(S.store.exportData(now()));
    $('#d-exp').onclick = async () => {
      const name = 'deutsch-backup-' + M.dayKey(now()) + '.json';
      if (S.caps.downloads) { try { await S.caps.downloads.save({ filename: name, data: json() }); toast('Backup salvo.'); return; } catch (e) { log('warn', 'download: ' + (e && e.code)); } }
      try { await navigator.clipboard.writeText(json()); toast('Download indisponível: JSON copiado para a área de transferência.'); } catch (e) { toast('Não foi possível exportar aqui.'); }
    };
    $('#d-copy').onclick = async () => { try { await navigator.clipboard.writeText(json()); toast('Copiado.'); } catch (e) { toast('Cópia bloqueada.'); } };
    $('#d-imp').onchange = async (e) => {
      const f = e.target.files[0]; if (!f) return;
      try { const obj = JSON.parse(await f.text()); const err = GF.store.validateBackup(obj); if (err) throw new Error(err); await restore(obj); }
      catch (er) { toast('Restauração recusada: ' + er.message, 5000); }
    };
    S.store.listBackups().then((l) => {
      $('#d-auto').innerHTML = l.length ? l.map((b) => `<div class="row sp" style="margin:6px 0"><span>${new Date(b.at).toLocaleString('pt-BR')} · ${(b.size / 1024).toFixed(0)} KB</span><button class="btn" data-bk="${b.id}">Restaurar</button></div>`).join('') : 'Nenhum ainda (o primeiro é criado ao abrir o app numa nova semana).';
      $$('[data-bk]').forEach((btn) => btn.onclick = async () => { const b = l.find((x) => x.id === btn.dataset.bk); try { await restore(JSON.parse(b.json)); } catch (er) { toast('Falhou: ' + er.message, 5000); } });
    }).catch(() => { $('#d-auto').textContent = 'Indisponível.'; });
  }
  async function restore(obj) {
    const confirmBox = document.createElement('div');
    confirmBox.className = 'card'; confirmBox.innerHTML = `<p><b>Restaurar backup de ${new Date(obj.exportedAt).toLocaleString('pt-BR')}?</b> ${obj.data.cards.length} itens. O estado atual será substituído (itens que não existem no backup continuam no banco, mas são ignorados).</p><div class="row"><button class="btn" id="rs-no">Cancelar</button><button class="btn pri" id="rs-yes">Restaurar</button></div>`;
    app().prepend(confirmBox); window.scrollTo(0, 0);
    await new Promise((res, rej) => { $('#rs-no').onclick = () => { confirmBox.remove(); rej(new Error('cancelado')); }; $('#rs-yes').onclick = res; });
    confirmBox.innerHTML = '<p>Restaurando…</p>';
    S.st = await S.store.importData(obj); await S.store.flush();
    toast('Backup restaurado e verificado.'); location.hash = '#hoje'; route();
  }

  GF.app = { boot, S, Audio };
  if (typeof document !== 'undefined') { if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot(); }
})(globalThis.GF = globalThis.GF || {});
