"""Dois aparelhos (celular e PC) sincronizando pela API de Gists simulada."""
import json, re, subprocess, time
from playwright.sync_api import sync_playwright

TOKEN = 'ghp_testtoken_1234567890abcdefghij'
GISTS = {}  # id -> {'description', 'files': {name: content}}

def handle(route, request):
    url, method = request.url, request.method
    if request.headers.get('authorization') != 'Bearer ' + TOKEN:
        return route.fulfill(status=401, body='{}')
    m = re.match(r'https://api\.github\.com/gists(?:/([^/?]+))?', url)
    gid = m.group(1) if m else None
    def gist_json(i):
        g = GISTS[i]
        return {'id': i, 'description': g['description'], 'files': {n: {'filename': n, 'content': c, 'truncated': False, 'raw_url': ''} for n, c in g['files'].items()}}
    if method == 'GET' and not gid:
        return route.fulfill(status=200, content_type='application/json', body=json.dumps([{'id': i, 'description': g['description']} for i, g in GISTS.items()]))
    if method == 'POST' and not gid:
        body = json.loads(request.post_data); i = 'g%d' % (len(GISTS) + 1)
        GISTS[i] = {'description': body['description'], 'files': {n: f['content'] for n, f in body['files'].items()}}
        return route.fulfill(status=201, content_type='application/json', body=json.dumps(gist_json(i)))
    if gid and gid not in GISTS: return route.fulfill(status=404, body='{}')
    if method == 'GET': return route.fulfill(status=200, content_type='application/json', body=json.dumps(gist_json(gid)))
    if method == 'PATCH':
        body = json.loads(request.post_data)
        for n, f in body['files'].items(): GISTS[gid]['files'][n] = f['content']
        return route.fulfill(status=200, content_type='application/json', body=json.dumps(gist_json(gid)))
    route.fulfill(status=500, body='{}')

srv = subprocess.Popen(['python3', '-m', 'http.server', '8766'], cwd='/home/claude/gfs/pwa', stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(1)
out = {}
try:
    with sync_playwright() as p:
        b = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
        def device(ua):
            ctx = b.new_context(viewport={'width': 390, 'height': 844}, user_agent=ua)
            ctx.route('https://api.github.com/**', handle)
            pg = ctx.new_page(); errs = []
            pg.on('pageerror', lambda e: errs.append(str(e)))
            pg.goto('http://localhost:8766/'); return pg, errs
        def study(pg, n):
            pg.click('#h-start')
            for _ in range(n):
                pg.wait_for_timeout(80)
                for sel in ['#dl-next', '#pr-go', '#i-ok', '#r-next', '#pq-next']:
                    if pg.locator(sel).count() and pg.locator(sel).is_visible(): pg.click(sel); break
                else:
                    if pg.locator('.opt:enabled').count(): pg.locator('.opt:enabled').first.click()
                    elif pg.locator('#r-a').count(): pg.fill('#r-a', 'Hallo!'); pg.click('#r-ok')
            pg.click('#s-quit'); pg.wait_for_selector('#e-home'); pg.click('#e-home'); pg.wait_for_selector('#h-start')
        def enable(pg, pw, name):
            pg.fill('#sy-token', TOKEN); pg.fill('#sy-pass', pw); pg.fill('#sy-name', name); pg.click('#sy-go')

        # Celular: diagnóstico, estuda, ativa sincronização
        A, ea = device('Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Chrome/130 Mobile Safari/537.36')
        A.wait_for_selector('#o-go'); A.click('#o-go'); A.click('#f-go'); A.wait_for_selector('#h-start')
        study(A, 14)
        cardsA = A.evaluate('Object.keys(GF.app.S.st.cards).length')
        A.evaluate("location.hash='#sync'"); A.wait_for_selector('#sy-go'); enable(A, 'minha-senha-123', 'Celular')
        A.wait_for_selector('#sy-now', timeout=20000)
        out['gist_files'] = sorted(GISTS[list(GISTS)[0]]['files'].keys())
        enc = [c for n, c in GISTS[list(GISTS)[0]]['files'].items() if n.endswith('.enc')][0]
        out['plaintext_leak'] = ('n_' in enc) or ('Rick' in enc)   # conteúdo deve estar criptografado

        # PC: aparelho novo, traz o progresso pela sincronização
        B, eb = device('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130 Safari/537.36')
        B.wait_for_selector('#o-sync'); B.click('#o-sync'); enable(B, 'minha-senha-123', 'PC')
        B.wait_for_selector('#sy-now', timeout=20000)
        out['pc_cards_after_first_sync'] = B.evaluate('Object.keys(GF.app.S.st.cards).length'); out['phone_cards'] = cardsA
        out['pc_has_profile'] = B.evaluate('!!GF.app.S.st.profile.diag')
        B.evaluate("location.hash='#hoje'"); B.wait_for_selector('#h-start')
        study(B, 10)  # estuda no PC (fim da sessão sincroniza sozinho)
        B.wait_for_timeout(2500)
        cardsB = B.evaluate('Object.keys(GF.app.S.st.cards).length')
        # Celular recebe o que foi feito no PC
        A.evaluate("location.hash='#sync'"); A.wait_for_selector('#sy-now'); A.click('#sy-now'); A.wait_for_timeout(2500)
        out['phone_cards_after_pc_study'] = A.evaluate('Object.keys(GF.app.S.st.cards).length'); out['pc_cards'] = cardsB
        out['phone_sessions_total'] = A.evaluate('GF.model.stats(GF.app.S.st, Date.now()).sessions')
        out['devices_listed'] = A.locator('table.t tr').count()
        A.screenshot(path='/home/claude/gfs/test/shot_sync.png', full_page=True)

        # Senha errada em um 3º aparelho
        C, ec = device('Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Chrome/130 Mobile Safari/537.36')
        C.wait_for_selector('#o-sync'); C.click('#o-sync'); enable(C, 'senha-errada-000', 'Tablet')
        C.wait_for_selector('#sy-now', timeout=20000)
        out['wrong_pass_message'] = C.locator('.fb.bad').inner_text() if C.locator('.fb.bad').count() else None
        out['wrong_pass_no_upload'] = sum(1 for n in GISTS[list(GISTS)[0]]['files'] if n.endswith('.enc'))
        out['errors'] = ea + eb + ec
        b.close()
finally:
    srv.terminate()
print(json.dumps(out, ensure_ascii=False, indent=1))
