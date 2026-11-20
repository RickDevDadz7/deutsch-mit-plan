/* Adaptadores para rodar FORA do Claude.ai (programa de PC ou app instalado no celular).
 * Mesma interface das capacidades do Claude: o resto do app não muda. */
(function (GF) {
  'use strict';
  const isElectron = typeof navigator !== 'undefined' && /Electron/i.test(navigator.userAgent);
  const KEY = 'gfs-ai-settings';

  function aiSettings() { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { return {}; } }
  function saveAiSettings(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* */ } }

  /** IA via API da Anthropic com a chave do próprio usuário (fica só neste aparelho, fora dos backups). */
  function makeSample() {
    const cfg = aiSettings();
    if (!cfg.key) return null;
    async function call(prompt) {
      const body = { model: cfg.model || 'claude-sonnet-5-5', max_tokens: 1200, messages: [{ role: 'user', content: prompt + '\n\nResponda somente com o JSON, sem texto antes ou depois.' }] };
      if (window.gfsNative && window.gfsNative.anthropic) { // no PC: a chamada sai pelo processo principal
        const res = await window.gfsNative.anthropic(cfg.key, body);
        if (res.status === 401) throw { code: 'not_granted', message: 'Chave de API inválida.' };
        if (res.status === 429) throw { code: 'rate_limited', message: 'Limite de uso atingido.' };
        if (res.status !== 200) throw { code: 'unavailable', message: 'API respondeu ' + res.status };
        return (res.json.content || []).filter((c) => c.type === 'text').map((c) => c.text).join('');
      }
      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-api-key': cfg.key, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
        body: JSON.stringify(body)
      });
      if (r.status === 401) throw { code: 'not_granted', message: 'Chave de API inválida.' };
      if (r.status === 429) throw { code: 'rate_limited', message: 'Limite de uso atingido.' };
      if (!r.ok) throw { code: 'unavailable', message: 'API respondeu ' + r.status };
      const j = await r.json();
      return (j.content || []).filter((c) => c.type === 'text').map((c) => c.text).join('');
    }
    const sample = async (prompt) => ({ text: await call(prompt), truncated: false });
    sample.json = async (prompt) => {
      const t = await call(prompt);
      const a = t.indexOf('{'), b = t.lastIndexOf('}');
      if (a < 0 || b < a) throw { code: 'unavailable', message: 'Resposta sem JSON.' };
      return JSON.parse(t.slice(a, b + 1));
    };
    sample.local = true;
    return sample;
  }
  async function testKey(key, model) {
    const body = { model: model || 'claude-sonnet-5-5', max_tokens: 5, messages: [{ role: 'user', content: 'Sag nur: ok' }] };
    if (window.gfsNative && window.gfsNative.anthropic) {
      const res = await window.gfsNative.anthropic(key, body);
      if (res.status !== 200) throw new Error((res.json && res.json.error && res.json.error.message) || 'erro ' + res.status);
      return true;
    }
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST', headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
      body: JSON.stringify({ model: model || 'claude-sonnet-5-5', max_tokens: 5, messages: [{ role: 'user', content: 'Sag nur: ok' }] })
    });
    if (!r.ok) { let m = 'erro ' + r.status; try { const j = await r.json(); m = (j.error && j.error.message) || m; } catch (e) { /* */ } throw new Error(m); }
    return true;
  }

  /** Reconhecimento de fala do navegador (Chrome no Android/PC). Não funciona dentro do Electron. */
  function makeDictation() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR || isElectron) return null;
    let rec = null; const cb = { partial: [], final: [], state: [] };
    const emit = (k, v) => cb[k].forEach((f) => { try { f(v); } catch (e) { /* */ } });
    return {
      onPartial(f) { cb.partial.push(f); }, onFinal(f) { cb.final.push(f); }, onState(f) { cb.state.push(f); },
      start() {
        return new Promise((res, rej) => {
          try {
            rec = new SR(); rec.lang = 'de-DE'; rec.interimResults = true; rec.continuous = false;
            rec.onstart = () => { emit('state', { state: 'listening' }); res(); };
            rec.onresult = (e) => {
              let fin = '', part = '';
              for (let i = e.resultIndex; i < e.results.length; i++) { const t = e.results[i][0].transcript; if (e.results[i].isFinal) fin += t; else part += t; }
              if (part) emit('partial', { text: part });
              if (fin) emit('final', { text: fin });
            };
            rec.onerror = (e) => { emit('state', { state: 'idle', reason: e.error }); if (e.error === 'not-allowed') rej({ code: 'not_granted' }); };
            rec.onend = () => emit('state', { state: 'idle', reason: 'stopped' });
            rec.start();
          } catch (e) { rej({ code: 'unavailable' }); }
        });
      },
      async stop() { try { rec && rec.stop(); } catch (e) { /* */ } }
    };
  }

  /** Salvar arquivo: no PC abre "Salvar como"; no celular baixa para Downloads. */
  function makeDownloads() {
    return {
      async save({ filename, data }) {
        if (window.gfsNative && window.gfsNative.saveFile) { const ok = await window.gfsNative.saveFile(filename, data); if (!ok) throw { code: 'dismissed' }; return; }
        const url = URL.createObjectURL(new Blob([data], { type: 'application/json' }));
        const a = document.createElement('a'); a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 5000);
      }
    };
  }

  /** Armazenamento em arquivo no PC (via processo principal do Electron). */
  function NativeBackend() {
    const n = window.gfsNative.store;
    return { kind: 'native', get: (p) => n.get(p), set: (p, d) => n.set(p, d), del: (p) => n.del(p), list: (c) => n.list(c) };
  }

  GF.local = { isElectron, aiSettings, saveAiSettings, makeSample, testKey, makeDictation, makeDownloads, NativeBackend };
})(globalThis.GF = globalThis.GF || {});
