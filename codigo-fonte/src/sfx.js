/* Efeitos sonoros "Amt": carimbo, papel, campainha e máquina de escrever.
 * Tudo sintetizado com Web Audio (sem arquivos, funciona offline).
 * Preferências ficam só neste aparelho (localStorage 'gfs-sfx'). */
(function (GF) {
  const KEY = 'gfs-sfx';
  const DEF = { on: true, vol: 0.6, type: true };
  let ctx = null, master = null, noiseBuf = null, lastType = 0;
  function cfg() { try { return Object.assign({}, DEF, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { return Object.assign({}, DEF); } }
  function save(c) { try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) { /* */ } if (master) master.gain.value = c.vol; }
  function ac() {
    if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return ctx; }
    const A = window.AudioContext || window.webkitAudioContext; if (!A) return null;
    try {
      ctx = new A(); master = ctx.createGain(); master.gain.value = cfg().vol; master.connect(ctx.destination);
      const n = ctx.sampleRate; noiseBuf = ctx.createBuffer(1, n, n); const d = noiseBuf.getChannelData(0);
      for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    } catch (e) { ctx = null; }
    return ctx;
  }
  function speaking() { try { return window.speechSynthesis && speechSynthesis.speaking; } catch (e) { return false; } }
  function noise(t, dur, f, q, gain, type) {
    const s = ctx.createBufferSource(); s.buffer = noiseBuf;
    const fl = ctx.createBiquadFilter(); fl.type = type || 'bandpass'; fl.frequency.value = f; fl.Q.value = q;
    const g = ctx.createGain(); g.gain.setValueAtTime(gain, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(fl); fl.connect(g); g.connect(master); s.start(t, Math.random() * 0.5); s.stop(t + dur + 0.02);
  }
  function tone(t, f0, f1, dur, gain, wave) {
    const o = ctx.createOscillator(); o.type = wave || 'sine';
    o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(f1, t + dur);
    const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(gain, t + 0.004); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(master); o.start(t); o.stop(t + dur + 0.02);
  }
  const SOUNDS = {
    stamp(t) { tone(t, 150, 55, 0.16, 0.9); noise(t, 0.07, 1800, 0.8, 0.55); noise(t + 0.01, 0.12, 400, 1.2, 0.35); },
    reject(t) { tone(t, 110, 38, 0.24, 1); noise(t, 0.1, 900, 0.7, 0.6); noise(t + 0.02, 0.2, 220, 1.4, 0.45); },
    paper(t) { noise(t, 0.16, 3200, 0.6, 0.18, 'highpass'); noise(t + 0.05, 0.12, 2200, 0.9, 0.12); },
    key(t) { noise(t, 0.025, 2600, 1.5, 0.22); tone(t, 1900, 1200, 0.018, 0.05, 'square'); },
    bell(t) { [[2093, 0.35], [2637, 0.2], [4186, 0.08]].forEach(([f, g]) => tone(t, f, f * 0.998, 1.4, g)); }
  };
  function play(name) {
    const c = cfg(); if (!c.on) return;
    if (name === 'key' && (!c.type || speaking())) return;
    if (!ac() || !master) return;
    try {
      const t = ctx.currentTime + 0.01;
      if (name === 'approve') { SOUNDS.stamp(t); SOUNDS.stamp(t + 0.45); SOUNDS.bell(t + 0.95); return; }
      if (name === 'done') { SOUNDS.stamp(t); SOUNDS.bell(t + 0.5); return; }
      SOUNDS[name] && SOUNDS[name](t);
    } catch (e) { /* som é opcional */ }
  }
  function bind() {
    const unlock = () => ac(); window.addEventListener('pointerdown', unlock, { passive: true });
    document.addEventListener('keydown', (e) => {
      const el = e.target; if (!el || !/^(INPUT|TEXTAREA)$/.test(el.tagName) || (el.type && el.type !== 'text' && el.tagName === 'INPUT')) return;
      if (e.key.length !== 1 && e.key !== 'Backspace' && e.key !== 'Enter') return;
      const n = performance.now(); if (n - lastType < 35) return; lastType = n; play('key');
    }, true);
  }
  GF.sfx = { play, cfg, save, bind };
})(globalThis.GF = globalThis.GF || {});
