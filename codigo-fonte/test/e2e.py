"""Teste ponta a ponta em Chrome headless.
Modo 1: sem capacidades (fallback local). Modo 2: window.claude simulado (db em memória com a API doc/collection, user, sample)."""
import json, sys, pathlib
from playwright.sync_api import sync_playwright

HTML = pathlib.Path(__file__).resolve().parent.parent / 'dist' / 'index.html'
MOCK = r"""
(() => {
  const store = JSON.parse(sessionStorage.getItem('mockdb') || '{}');
  const save = () => sessionStorage.setItem('mockdb', JSON.stringify(store));
  window.__dbstore = store;
  const deepFreeze = (o) => { if (o && typeof o === 'object') { Object.values(o).forEach(deepFreeze); Object.freeze(o); } return o; };
  const mkDoc = (path) => ({ id: path.split('/').pop(), path,
    async get(){ return { id: path.split('/').pop(), exists: path in store, data: () => store[path] && deepFreeze(JSON.parse(JSON.stringify(store[path]))), metadata:{} }; },
    async set(d){ store[path] = JSON.parse(JSON.stringify(d)); save(); },
    async update(d){ store[path] = Object.assign(store[path]||{}, d); },
    async delete(){ delete store[path]; save(); },
    collection(c){ return mkColl(path + '/' + c); } });
  const mkColl = (path) => { const q = { path, _lim: 1000,
    doc(id){ return mkDoc(path + '/' + id); },
    limit(n){ q._lim = n; return q; },
    async get(){ const pre = path + '/'; const docs = Object.keys(store).filter(k => k.startsWith(pre) && !k.slice(pre.length).includes('/')).slice(0, q._lim).map(k => ({ id: k.slice(pre.length), exists: true, data: () => deepFreeze(JSON.parse(JSON.stringify(store[k]))) })); return { docs, size: docs.length, empty: !docs.length }; } }; return q; };
  const db = { doc: (p) => { if (p.split('/').length % 2) throw new TypeError('odd'); return mkDoc(p); }, collection: (p) => mkColl(p) };
  const user = { id: async () => 'u123', isOwner: () => true };
  let turn = 0;
  const sample = async () => ({ text: '' });
  sample.json = async (prompt) => {
    window.__prompts = (window.__prompts || []).concat(prompt);
    if (prompt.startsWith('Avalie a fala')) return { score: 4, goals_met: [0,1], strengths_pt: ['boa'], improve_pt: ['artigos'], next_focus_pt: 'V2' };
    if (prompt.startsWith('Corrija um texto')) return { score: 4, corrected_text: 'Ich heiße Rick.', errors: [{ original: 'Ich heisse', corrected: 'Ich heiße', explanation_pt: 'use ß', category: 'ortografia' }], feedback_pt: 'Bom.' };
    turn++;
    return { reply: turn === 1 ? 'Hallo! Ich bin Lena. Wie heißt du?' : 'Schön! Woher kommst du?', reply_pt: 'Olá', corrections: turn === 2 ? [{ original: 'Ich heißen Rick', corrected: 'Ich heiße Rick', explanation_pt: 'ich → -e', category: 'conjugacao' }] : [], recast: '', goals_done: [0], end: turn >= 5, hint_pt: 'Diga seu nome.' };
  };
  const caps = { db, user, sample };
  window.claude = { use: async (n) => caps[n] || null };
})();
"""

def run(mock):
    errs = []
    with sync_playwright() as p:
        b = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
        pg = b.new_page(viewport={'width': 390, 'height': 844})
        pg.on('pageerror', lambda e: errs.append(str(e)))
        pg.on('console', lambda m: m.type == 'error' and errs.append(m.text))
        if mock: pg.add_init_script(MOCK)
        pg.goto(HTML.as_uri())
        pg.wait_for_selector('#o-go, #sy-back', timeout=15000)
        if pg.locator('#sy-back').count(): pg.click('#sy-back'); pg.wait_for_selector('#o-go')
        pg.screenshot(path=f'/home/claude/gfs/test/shot_onboard_{mock}.png')
        pg.click('#o-go'); pg.click('#f-go')
        pg.wait_for_selector('#h-start')
        pg.screenshot(path=f'/home/claude/gfs/test/shot_home_{mock}.png', full_page=True)
        if mock: pg.click('#h-min [data-m="30"]'); pg.wait_for_timeout(200)
        pg.click('#h-start')
        kinds_seen = []
        for i in range(160):
            pg.wait_for_timeout(60)
            body = pg.inner_text('body')
            if 'Sessão concluída' in body or 'Sessão interrompida' in body: break
            k = pg.locator('.step-k').first.inner_text() if pg.locator('.step-k').count() else ''
            if k and (not kinds_seen or kinds_seen[-1] != k.split('·')[0].strip()): kinds_seen.append(k.split('·')[0].strip())
            if i == 40: pg.screenshot(path=f'/home/claude/gfs/test/shot_mid_{mock}.png', full_page=True)
            # convo
            if pg.locator('#cv-in').count() and pg.locator('#cv-send').is_enabled() and not pg.locator('#cv-next').count():
                n = pg.locator('.bubble.u').count()
                if n >= 4: pg.click('#cv-end'); pg.wait_for_selector('#cv-next', timeout=5000); pg.screenshot(path=f'/home/claude/gfs/test/shot_convo_{mock}.png', full_page=True); pg.click('#cv-next'); continue
                pg.fill('#cv-in', ['Ich heißen Rick', 'Ich komme aus Brasilien', 'Ich wohne in São Paulo', 'Tschüss'][n]); pg.click('#cv-send'); pg.wait_for_timeout(150); continue
            clicked = False
            for sel in ['#i-ok', '#r-next', '#d-next', '#o-next', '#l-next', '#pq-next', '#sp-next', '#sc-next', '#w-next', '#c-next', '#cv-next', '#e-home', '#b-go', '#dl-next', '#pr-go', '#g-go', '#o-go', '#m-go']:
                if pg.locator(sel).count() and pg.locator(sel).is_visible() and pg.locator(sel).is_enabled():
                    pg.click(sel); clicked = True; break
            if clicked: continue
            if pg.locator('.opt:enabled').count(): pg.locator('.opt:enabled').first.click(); continue
            if pg.locator('#o-pool .tile').count(): pg.locator('#o-pool .tile').first.click(); continue
            if pg.locator('#o-ok').count() and pg.locator('#o-ok').is_enabled(): pg.click('#o-ok'); continue
            for inp, btn, val in [('#r-a', '#r-ok', 'der Tisch'), ('#d-a', '#d-ok', 'bin'), ('#l-a', '#l-ok', 'Ich heiße Lena'), ('#sp-a', '#sp-ok', 'Ich heiße Rick'), ('#sc-in', '#sc-ok', 'Hallo'), ('#w-a', '#w-ok', 'Ich heisse Rick. Ich komme aus Brasilien und wohne in Rio. Ich spreche Portugiesisch.'), ('#c-a', '#c-ok', 'x')]:
                if pg.locator(inp).count() and pg.locator(btn).is_enabled():
                    pg.fill(inp, val); pg.click(btn); clicked = True; break
            if not clicked:
                print('travado em:', body[:300]); break
        final = pg.inner_text('body')
        pg.screenshot(path=f'/home/claude/gfs/test/shot_end_{mock}.png', full_page=True)
        res = {'mock': mock, 'kinds': kinds_seen, 'ended': 'Sessão' in final, 'errors': errs}
        # navegação pelas abas
        for h in ['progresso', 'curriculo', 'praticar', 'vocabulario', 'calendario', 'metodo', 'dados', 'ajustes', 'mais', 'hoje']:
            pg.goto(HTML.as_uri() + '#' + h) if False else pg.evaluate(f"location.hash='#{h}'")
            pg.wait_for_timeout(250)
            if h in ('progresso', 'curriculo', 'metodo'): pg.screenshot(path=f'/home/claude/gfs/test/shot_{h}_{mock}.png', full_page=True)
        if mock:
            store = pg.evaluate('JSON.stringify(Object.keys(window.__dbstore))')
            keys = json.loads(store)
            res['db_docs'] = len(keys); res['db_sample'] = keys[:6]
            res['prompt_has_vocab'] = 'VOCABULÁRIO QUE O ALUNO JÁ VIU' in (pg.evaluate('(window.__prompts||[]).join("\\n")') or '')
            # recarregar e verificar persistência
            pg.reload(); pg.wait_for_selector('#h-start', timeout=15000)
            res['after_reload_home'] = pg.locator('#h-start').count() == 1
            res['reload_profile'] = pg.evaluate("GF.app.S.st.profile.sessions")
            res['reload_cards'] = pg.evaluate("Object.keys(GF.app.S.st.cards).length")
        res['errors'] = errs
        b.close()
        return res

for m in [False, True]:
    print(json.dumps(run(m), ensure_ascii=False, indent=1))
