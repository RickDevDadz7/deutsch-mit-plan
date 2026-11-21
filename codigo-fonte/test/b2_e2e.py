# B2 fixo: unidade B2-U1 vira a aula atual depois do B1, leitura em Praticar e material autêntico no Currículo.
import subprocess, time, json
from playwright.sync_api import sync_playwright
srv = subprocess.Popen(['python3','-m','http.server','8778'], cwd='/home/claude/gfs/pwa', stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL); time.sleep(1)
res = {}; errs = []
try:
  with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
    pg = b.new_page(viewport={'width': 390, 'height': 844}); pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.goto('http://localhost:8778/'); pg.click('#sy-back'); pg.click('#o-go'); pg.click('#f-go'); pg.wait_for_selector('#h-start')
    pg.evaluate("""async () => { const S = GF.app.S; for (const e of GF.content.plan.filter(x => ['A1','A2','B1'].includes(x.level))) S.st.profile.unitState[e.id] = { passed: Date.now() }; await S.store.saveProfile(); }""")
    pg.reload(); pg.wait_for_selector('#h-start')
    res['aula atual'] = pg.evaluate('GF.model.currentUnit(GF.app.S.st)')
    res['sem cartão de gerar unidade'] = pg.locator('#gen-card').count() == 0
    res['tela inicial'] = pg.inner_text('.card.akte h2')
    pg.click('nav.tabs a[href="#praticar"]'); pg.wait_for_selector('[data-rd]')
    res['leituras disponíveis'] = pg.locator('[data-rd]').count()
    pg.click('[data-rd="B2-U1"]'); pg.wait_for_selector('#rd-q'); res['parágrafos'] = pg.locator('.card .row p').count()
    pg.screenshot(path='/home/claude/shots/lesen.png')
    pg.click('#rd-q')
    for i in range(3):
      pg.wait_for_selector('.opt'); pg.locator('.opt[data-k="0"]').click(); pg.click('#rd-next')
    pg.wait_for_selector('#rd-end'); res['resultado'] = pg.inner_text('.card h2'); pg.click('#rd-end'); pg.wait_for_timeout(400)
    res['voltou para'] = pg.evaluate('location.hash'); res['salvo'] = pg.evaluate('GF.app.S.st.profile.readingDone["B2-U1"].best')
    res['chip marcado'] = pg.inner_text('[data-rd="B2-U1"]')
    pg.click('nav.tabs a[href="#curriculo"]'); pg.wait_for_timeout(300)
    res['material autêntico no currículo'] = pg.locator('text=Material autêntico').count()
    pg.click('nav.tabs a[href="#hoje"]'); pg.click('#h-start'); pg.wait_for_timeout(400)
    res['primeira etapa da aula'] = pg.inner_text('.step-k')
finally: srv.terminate()
print(json.dumps(res, indent=1, ensure_ascii=False)); print('errs', errs)
