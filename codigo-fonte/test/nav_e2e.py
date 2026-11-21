# Botão "voltar" do celular: abas, subpáginas, aula e treinos avulsos.
import subprocess, time, json
from playwright.sync_api import sync_playwright
srv = subprocess.Popen(['python3','-m','http.server','8774'], cwd='/home/claude/gfs/pwa', stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL); time.sleep(1)
res = {}; errs = []
def where(pg):
  pg.wait_for_timeout(300)
  on = pg.locator('nav.tabs:not(.hide) a.on')
  return {'hash': pg.evaluate('location.hash'), 'tab': on.inner_text().split('\n')[-1] if on.count() else None, 'session': pg.evaluate('!!document.querySelector("#s-quit")')}
try:
  with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
    pg = b.new_page(viewport={'width': 390, 'height': 844})
    pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.goto('http://localhost:8774/'); pg.click('#sy-back'); pg.click('#o-go'); pg.click('#f-go'); pg.wait_for_selector('#h-start')
    pg.click('nav.tabs a[href="#progresso"]'); pg.go_back(); res['progresso->voltar'] = where(pg)
    pg.click('nav.tabs a[href="#mais"]'); pg.click('a[href="#calendario"]'); res['calendario'] = where(pg)
    pg.go_back(); res['calendario->voltar'] = where(pg)
    pg.click('a[href="#ajustes"]'); pg.click('nav.tabs a[href="#progresso"]'); res['ajustes->aba progresso'] = where(pg)
    pg.go_back(); res['progresso->voltar(2)'] = where(pg)
    pg.click('nav.tabs a[href="#praticar"]'); pg.click('#p-dlg'); res['treino aberto'] = where(pg)
    pg.go_back(); res['treino->voltar'] = where(pg)
    pg.click('nav.tabs a[href="#hoje"]'); pg.click('#h-start'); pg.wait_for_timeout(300)
    for i in range(3):
      for sel in ['#dl-next','#pr-go','#i-ok','#r-next']:
        if pg.locator(sel).count() and pg.locator(sel).is_visible(): pg.click(sel); break
    res['aula'] = where(pg)
    pg.go_back(); res['aula->voltar'] = where(pg)
    res['aula salva (sessions)'] = pg.evaluate('JSON.parse(localStorage.getItem("gfs-local-v1"))["profile"]["sessions"]')
    pg.click('#h-start'); pg.click('#s-quit'); pg.wait_for_selector('#e-home'); pg.click('#e-home'); res['sair->voltar btn'] = where(pg)
    pg.click('nav.tabs a[href="#praticar"]'); pg.click('#p-pairs'); pg.wait_for_timeout(200)
    for i in range(30):
      if pg.locator('.opt:enabled').count(): pg.locator('.opt:enabled').first.click()
      elif pg.locator('#pq-next').count(): pg.click('#pq-next')
      else: break
      pg.wait_for_timeout(60)
    res['treino terminado'] = where(pg)
    pg.go_back(); res['depois do treino ->voltar'] = where(pg)
finally: srv.terminate()
print(json.dumps(res, indent=1, ensure_ascii=False)); print('errs', errs)
