# Botão Reportar: abre na aula, salva com contexto, aparece em Mais → Problemas, sobrevive a recarregar.
import subprocess, time, json
from playwright.sync_api import sync_playwright
srv = subprocess.Popen(['python3','-m','http.server','8775'], cwd='/home/claude/gfs/pwa', stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL); time.sleep(1)
res = {}; errs = []
try:
  with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
    ctx = b.new_context(viewport={'width': 390, 'height': 844}); ctx.grant_permissions(['clipboard-read','clipboard-write'])
    pg = ctx.new_page(); pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.goto('http://localhost:8775/'); pg.click('#sy-back'); pg.click('#o-go'); pg.click('#f-go'); pg.click('#h-start'); pg.wait_for_timeout(300)
    pg.click('header [data-rep]'); pg.wait_for_selector('#rep-modal')
    res['enviar desabilitado sem categoria'] = pg.is_disabled('#rep-send')
    pg.click('#rep-cat [data-c=de]'); pg.fill('#rep-txt', 'Artigo errado aqui'); pg.screenshot(path='/home/claude/shots/rep_modal.png')
    pg.click('#rep-send'); pg.wait_for_timeout(400)
    res['modal fechou'] = pg.locator('#rep-modal').count() == 0
    res['ainda na aula'] = pg.locator('#s-quit').count() == 1
    pg.click('#s-quit'); pg.click('#e-home'); pg.wait_for_timeout(300)
    pg.reload(); pg.wait_for_selector('#h-start')
    pg.click('nav.tabs a[href="#mais"]'); res['badge mais'] = pg.locator('a[href="#problemas"] .pill').inner_text()
    pg.click('a[href="#problemas"]'); pg.wait_for_selector('.rep-item')
    res['itens'] = pg.locator('.rep-item').count(); res['contexto'] = pg.locator('.rep-item summary').first.inner_text()
    pg.click('#rp-copy'); pg.wait_for_timeout(200); res['copiado'] = pg.evaluate('navigator.clipboard.readText()')[:160]
    pg.screenshot(path='/home/claude/shots/rep_list.png', full_page=True)
    pg.click('[data-rs]'); pg.wait_for_timeout(200); res['resolvido'] = pg.locator('.rep-item .pill').first.inner_text()
    pg.click('nav.tabs a[href="#praticar"]'); pg.click('#p-dlg'); pg.wait_for_timeout(300); res['fab visivel no treino'] = pg.is_visible('#rep-fab')
    pg.click('#rep-fab'); res['modal pelo fab'] = pg.locator('#rep-modal').count()
    pg.click('#rep-cancel'); pg.go_back(); pg.wait_for_timeout(300); res['fab some fora do treino'] = not pg.is_visible('#rep-fab')
finally: srv.terminate()
print(json.dumps(res, indent=1, ensure_ascii=False)); print('errs', errs)
