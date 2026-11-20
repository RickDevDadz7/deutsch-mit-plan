import json, pathlib
from playwright.sync_api import sync_playwright
FX = pathlib.Path('/home/claude/gfs/test/fixtures/unit_b1u1.json').read_text()
MOCK = """(() => { const store = JSON.parse(sessionStorage.getItem('mockdb') || '{}'); const save = () => sessionStorage.setItem('mockdb', JSON.stringify(store));
 const fr = (o) => { if (o && typeof o === 'object') { Object.values(o).forEach(fr); Object.freeze(o); } return o; };
 const mkDoc = (p) => ({ async get(){ return { exists: p in store, data: () => fr(JSON.parse(JSON.stringify(store[p]))) }; }, async set(d){ store[p] = JSON.parse(JSON.stringify(d)); save(); }, async delete(){ delete store[p]; save(); }, collection(c){ return mkColl(p + '/' + c); } });
 const mkColl = (p) => { const q = { doc: (id) => mkDoc(p + '/' + id), limit(){ return q; }, async get(){ const pre = p + '/'; const docs = Object.keys(store).filter(k => k.startsWith(pre) && !k.slice(pre.length).includes('/')).map(k => ({ id: k.slice(pre.length), data: () => fr(JSON.parse(JSON.stringify(store[k]))) })); return { docs }; } }; return q; };
 const db = { doc: mkDoc, collection: mkColl }; const FX = __FX__;
 const sample = async () => ({ text: '' });
 sample.json = async (p) => { window.__genCalls = (window.__genCalls || 0) + (p.startsWith('Você é um autor') || p.startsWith('Você é um revisor') ? 1 : 0); await new Promise(r => setTimeout(r, 300));
   if (p.startsWith('Você é um revisor')) return Object.assign({}, FX, { review: { changes: ['plural de Wecker conferido'], confidence: 'alta' } });
   if (p.startsWith('Você é um autor')) return FX;
   if (p.startsWith('Um aluno reportou')) return { ok: false, explanation_pt: 'Tradução ajustada.', fixed: { type: 'noun', art: 'der', de: 'Mieter', pl: '=', pt: 'o inquilino (locatário)', ex: ['Der Mieter zahlt pünktlich.', 'O inquilino paga em dia.'] } };
   return {}; };
 const caps = { db, user: { id: async () => 'u1' }, sample }; window.claude = { use: async (n) => caps[n] || null }; })();""".replace('__FX__', FX)
with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
    pg = b.new_page(viewport={'width': 390, 'height': 844}); errs = []
    pg.on('pageerror', lambda e: errs.append(str(e))); pg.add_init_script(MOCK)
    pg.goto('file:///home/claude/gfs/dist/index.html'); pg.wait_for_selector('#o-go'); pg.click('#o-go'); pg.click('#f-go'); pg.wait_for_selector('#h-start')
    # simula A1.1 comprovado
    pg.evaluate("""async () => { const S = GF.app.S; for (const e of GF.content.plan.filter(x => x.level === 'A1' || x.level === 'A2')) S.st.profile.unitState[e.id] = { passed: Date.now() }; await S.store.saveProfile(); await S.store.flush(); }""")
    pg.reload(); pg.wait_for_selector('#gen-card', timeout=15000)
    before = pg.inner_text('#gen-card')
    pg.wait_for_function("GF.content.units['B1-U1']", timeout=30000); pg.wait_for_timeout(800)
    pg.screenshot(path='/home/claude/gfs/test/shot_gen_home.png', full_page=True)
    home = pg.inner_text('#app')
    # persistência: recarrega e a unidade continua lá, sem nova geração
    calls1 = pg.evaluate('window.__genCalls'); pg.reload(); pg.wait_for_selector('#h-start'); pg.wait_for_timeout(6000)
    calls2 = pg.evaluate('window.__genCalls || 0')
    # estuda: primeira palavra nova é da U6 e tem o botão de reportar
    pg.click('#h-start')
    for _ in range(6):
        if pg.locator('#i-ok').count(): break
        for sel in ['#dl-next', '#pr-go', '#pq-next']:
            if pg.locator(sel).count(): pg.click(sel); break
        else:
            if pg.locator('.opt:enabled').count(): pg.locator('.opt:enabled').first.click()
        pg.wait_for_timeout(100)
    rep = pg.locator('[data-report]').count()
    if rep: pg.locator('[data-report]').first.click(); pg.click('#rep-s'); pg.wait_for_timeout(1200)
    fixed = pg.evaluate("GF.content.items['b1u1_n_mieter'] && GF.content.items['b1u1_n_mieter'].pt")
    print(json.dumps({'card_before': before[:120], 'home_has_unit': 'Nachbarschaft' in home, 'gen_calls_first': calls1, 'gen_calls_after_reload': calls2,
      'report_button': rep, 'fixed_pt': fixed, 'curriculum_label': pg.evaluate('GF.model.estimateLevel(GF.app.S.st).label'), 'errors': errs}, ensure_ascii=False, indent=1))
    b.close()
