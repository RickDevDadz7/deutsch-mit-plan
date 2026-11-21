# Recuperação: sair da conta não pode apagar o histórico; e um aparelho que perdeu dados recebe de volta
# o que os outros aparelhos sabem dele (dias e cartas). Supabase simulado, dois aparelhos (celular A, PC B).
import subprocess, time, json, sys
sys.path.insert(0, '/home/claude/gfs/test')
from playwright.sync_api import sync_playwright
import importlib.util
srv = subprocess.Popen(['python3','-m','http.server','8783'], cwd='/home/claude/gfs/pwa', stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL); time.sleep(1)
spec = importlib.util.spec_from_file_location('mock', '/home/claude/gfs/test/supa_mock.py'); mock = importlib.util.module_from_spec(spec); spec.loader.exec_module(mock)
DB = mock.DB; res = {}; errs = []
DB['users']['rick@example.com'] = {'id': 'u1', 'pw': 'senha-segura-1', 'ok': True, 'name': 'Rick'}
STUDY = """async () => { const S = GF.app.S, M = GF.model; const d = M.dayKey(Date.now() - 86400000);
  S.st.days[d] = { date: d, minutes: 40, reviews: 30, newItems: 12 }; await S.store.saveDay(d);
  const ids = Object.keys(GF.content.items).slice(0, 5); for (const id of ids) { S.st.cards[id] = M.newCard(GF.content.items[id], Date.now()); await S.store.saveCard(id); }
  await S.store.flush(); }"""
def stats(pg): return pg.evaluate("(() => { const S = GF.app.S; const all = GF.model.allDays(S.st); const min = Object.values(all).reduce((a, d) => a + (d.minutes || 0), 0); return { min, cards: Object.keys(S.st.cards).length, ownDays: Object.keys(S.st.days).length }; })()")
def login(pg):
  pg.wait_for_selector('#ac-go'); pg.fill('#ac-email', 'rick@example.com'); pg.fill('#ac-pass', 'senha-segura-1'); pg.click('#ac-go'); pg.wait_for_selector('#h-start, #o-go', timeout=10000)
def sync(pg): pg.evaluate("async () => { await GF.app.S.store.flush(); await GF.sync.run(GF.app.S.store); }")
try:
  with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
    def device():
      ctx = b.new_context(viewport={'width': 390, 'height': 844}); ctx.route('https://uutyijvitbeiwbivkfgz.supabase.co/**', mock.handler)
      pg = ctx.new_page(); pg.on('pageerror', lambda e: errs.append(str(e))); pg.on('dialog', lambda d: d.accept()); return pg
    A = device(); A.goto('http://localhost:8783/'); A.click('#sy-back'); A.click('#o-go'); A.click('#f-go'); A.wait_for_selector('#h-start')
    A.evaluate(STUDY); A.click('nav.tabs a[href="#mais"]'); A.click('a[href="#sync"]'); login(A); sync(A)
    res['A estudou'] = stats(A)
    B = device(); B.goto('http://localhost:8783/'); login(B); sync(B); res['B (PC) recebeu'] = stats(B)
    # 1) sair da conta e entrar de novo no MESMO aparelho: tudo volta
    A.click('nav.tabs a[href="#mais"]'); A.click('a[href="#sync"]'); A.wait_for_selector('#ac-out'); A.wait_for_timeout(1100); A.click('#ac-out'); A.wait_for_selector('#ac-go', timeout=10000)
    login(A); A.wait_for_timeout(500); res['A depois de sair e entrar'] = stats(A)
    # 2) o caso do bug antigo: a linha do celular no servidor foi sobrescrita vazia. O PC devolve o que sabe.
    devA = A.evaluate("GF.sync.cfg().deviceId")
    A.evaluate("async () => { await GF.app.S.store.wipeLocal(Date.now()); }"); A.reload(); A.wait_for_selector('#o-go, #ac-go, #h-start')
    row = DB['rows'][('u1', devA)]; empty = json.dumps({'profile': None, 'cards': [], 'mistakes': [], 'assess': [], 'days': {}, 'gen': [], 'reports': []}); row['data'] = 'j:' + empty
    sync(B); A.evaluate("async () => { await GF.sync.run(GF.app.S.store); }"); A.reload(); A.wait_for_selector('#h-start', timeout=10000)
    res['A recuperado pelo PC (linha própria apagada)'] = stats(A)
finally: srv.terminate()
print(json.dumps(res, indent=1, ensure_ascii=False)); print('errs', errs)
