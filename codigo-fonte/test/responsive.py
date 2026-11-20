import json, subprocess, time
from playwright.sync_api import sync_playwright
srv = subprocess.Popen(['python3','-m','http.server','8767'], cwd='/home/claude/gfs/pwa', stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL); time.sleep(1)
MEASURE = """() => { const W = document.documentElement.clientWidth; const bad = [];
  document.querySelectorAll('body *').forEach(el => { const r = el.getBoundingClientRect(); if (r.width && r.right > W + 1) bad.push((el.id ? '#' + el.id : el.tagName.toLowerCase() + '.' + [...el.classList].join('.')) + ' ' + Math.round(r.right)); });
  return { W, scroll: document.documentElement.scrollWidth, bad: [...new Set(bad)].slice(0, 8) }; }"""
res = {}
try:
  with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
    pg = b.new_page(viewport={'width': 360, 'height': 740}, device_scale_factor=3, is_mobile=True, has_touch=True, user_agent='Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Chrome/130 Mobile Safari/537.36')
    pg.goto('http://localhost:8767/'); pg.wait_for_selector('#o-go'); res['onboarding'] = pg.evaluate(MEASURE)
    pg.click('#o-go'); pg.click('#f-go'); pg.wait_for_selector('#h-start')
    pg.click('#h-start')
    seen = set()
    for i in range(45):
        pg.wait_for_timeout(60)
        k = pg.locator('.step-k').first.inner_text().split('·')[0].strip() if pg.locator('.step-k').count() else 'x'
        if k not in seen: seen.add(k); res['step:' + k] = pg.evaluate(MEASURE)
        for sel in ['#dl-next','#pr-go','#i-ok','#r-next','#pq-next','#d-next','#g-go','#o-go','#sp-next','#sc-next','#l-next']:
            if pg.locator(sel).count() and pg.locator(sel).is_visible() and pg.locator(sel).is_enabled(): pg.click(sel); break
        else:
            if pg.locator('.opt:enabled').count(): pg.locator('.opt:enabled').first.click()
            elif pg.locator('#r-a').count() and pg.locator('#r-ok').is_enabled(): pg.fill('#r-a','Hallo!'); pg.click('#r-ok')
            elif pg.locator('#d-a').count() and pg.locator('#d-ok').is_enabled(): pg.fill('#d-a','bin'); pg.click('#d-ok')
            elif pg.locator('#sp-a').count(): pg.fill('#sp-a','Hallo'); pg.click('#sp-ok')
            elif pg.locator('#sc-in').count() and pg.locator('#sc-ok').is_enabled(): pg.fill('#sc-in','Hallo'); pg.click('#sc-ok')
            else: break
    pg.goto('http://localhost:8767/#hoje'); pg.reload(); pg.wait_for_selector('#h-start')
    if not pg.locator('#h-start').count(): print('BODY:', pg.inner_text('body')[:600])
    for h in ['hoje','praticar','vocabulario','progresso','curriculo','mais','calendario','metodo','dados','ajustes','sync']:
        pg.evaluate(f"location.hash='#{h}'"); pg.wait_for_timeout(300)
        if h == 'curriculo': pg.evaluate("document.querySelectorAll('details').forEach(d=>d.open=true)")
        res[h] = pg.evaluate(MEASURE)
        pg.screenshot(path=f'/home/claude/gfs/test/r_{h}.png', full_page=False)
    b.close()
finally: srv.terminate()
print(json.dumps({k: v for k, v in res.items() if v['scroll'] > v['W'] or v['bad']}, indent=1, ensure_ascii=False) or 'ok')
print('telas medidas:', len(res))
