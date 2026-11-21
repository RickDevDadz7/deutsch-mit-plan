# Conta + sincronização com um Supabase SIMULADO (intercepta as chamadas de rede).
# Verifica: criar conta (pede confirmação), entrar, enviar dados, 2º aparelho entra e recebe o progresso,
# link de confirmação no endereço, link de nova senha, sair da conta, RLS simulado (só as próprias linhas).
import subprocess, time, json, base64, urllib.parse
from playwright.sync_api import sync_playwright
srv = subprocess.Popen(['python3','-m','http.server','8776'], cwd='/home/claude/gfs/pwa', stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL); time.sleep(1)
DB = {'users': {}, 'rows': {}, 'mails': []}  # rows: (uid, device) -> row
def jwt(uid, email):
  b = lambda o: base64.urlsafe_b64encode(json.dumps(o).encode()).decode().rstrip('=')
  return b({'alg':'none'}) + '.' + b({'sub': uid, 'email': email}) + '.x'
def uid_from(req):
  a = req.headers.get('authorization', '')
  if not a.startswith('Bearer '): return None
  try: p = a[7:].split('.')[1]; p += '=' * (-len(p) % 4); return json.loads(base64.urlsafe_b64decode(p))['sub']
  except Exception: return None
def handler(route, req):
  u = urllib.parse.urlparse(req.url); path = u.path; q = urllib.parse.parse_qs(u.query)
  assert req.headers.get('apikey', '').startswith('sb_publishable_'), 'sem apikey'
  body = json.loads(req.post_data) if req.post_data else None
  def ok(o, st=200): route.fulfill(status=st, content_type='application/json', body=json.dumps(o))
  def tok(uid, email): return {'access_token': jwt(uid, email), 'refresh_token': 'r-' + uid, 'expires_in': 3600, 'user': {'id': uid, 'email': email}}
  if path == '/auth/v1/signup':
    if body['email'] in DB['users']: return ok({'id': 'x', 'identities': []})
    uid = 'u%d' % (len(DB['users']) + 1); DB['users'][body['email']] = {'id': uid, 'pw': body['password'], 'ok': False}
    DB['mails'].append(('confirm', body['email'], q.get('redirect_to', [''])[0])); return ok({'id': uid, 'email': body['email'], 'identities': [{}]})
  if path == '/auth/v1/token':
    if q['grant_type'][0] == 'password':
      x = DB['users'].get(body['email'])
      if not x or x['pw'] != body['password']: return ok({'error_code': 'invalid_credentials', 'msg': 'Invalid login credentials'}, 400)
      if not x['ok']: return ok({'error_code': 'email_not_confirmed', 'msg': 'Email not confirmed'}, 400)
      return ok(tok(x['id'], body['email']))
    return ok({'error_code': 'refresh_token_not_found'}, 400)
  if path == '/auth/v1/recover': DB['mails'].append(('recover', body['email'], q.get('redirect_to', [''])[0])); return ok({})
  if path == '/auth/v1/user' and req.method == 'PUT':
    uid = uid_from(req); x = [v for v in DB['users'].values() if v['id'] == uid][0]; x['pw'] = body['password']; return ok({'id': uid})
  if path == '/auth/v1/logout': return route.fulfill(status=204, body='')
  if path == '/rest/v1/sync_devices':
    uid = uid_from(req)
    if not uid: return ok({'message': 'permission denied'}, 401)
    if req.method == 'GET': return ok([{'device_id': d, 'name': r['name'], 'updated_at': r['updated_at'], 'data': r['data']} for (uu, d), r in DB['rows'].items() if uu == uid])
    if req.method == 'POST':
      for r in body:
        if r['user_id'] != uid: return ok({'message': 'new row violates row-level security policy'}, 403)
        DB['rows'][(uid, r['device_id'])] = r
      return route.fulfill(status=201, body='')
    if req.method == 'DELETE':
      for k in [k for k in DB['rows'] if k[0] == uid]: del DB['rows'][k]
      return route.fulfill(status=204, body='')
  ok({'message': 'not found ' + path}, 404)

res = {}; errs = []
def where(pg): pg.wait_for_timeout(250); return pg.evaluate('location.hash')
try:
  with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
    def device():
      ctx = b.new_context(viewport={'width': 390, 'height': 844}); ctx.route('https://uutyijvitbeiwbivkfgz.supabase.co/**', handler)
      pg = ctx.new_page(); pg.on('pageerror', lambda e: errs.append(str(e) + ' @ ' + (e.stack or '')[:400])); pg.on('dialog', lambda d: d.accept()); return pg
    # Aparelho A: faz o diagnóstico rápido e estuda um pouco
    A = device(); A.goto('http://localhost:8776/'); A.click('#o-go'); A.click('#f-go'); A.wait_for_selector('#h-start')
    A.evaluate("() => { const p = JSON.parse(localStorage.getItem('gfs-local-v1')); }")
    A.click('#h-start'); A.wait_for_timeout(300); A.click('#s-quit'); A.click('#e-home'); A.wait_for_timeout(300)
    A.click('nav.tabs a[href="#mais"]'); A.click('a[href="#sync"]'); A.wait_for_selector('#ac-go')
    A.click('[data-ac-tab=up]'); A.fill('#ac-email', 'Rick@Example.com'); A.fill('#ac-pass', 'senha-segura-1'); A.click('#ac-go'); A.wait_for_timeout(400)
    res['cadastro pede confirmação'] = 'e-mail de confirmação' in A.inner_text('.fb')
    A.fill('#ac-pass', 'senha-segura-1'); A.click('#ac-go'); A.wait_for_timeout(400); res['entrar sem confirmar'] = A.inner_text('.fb')[:60]
    DB['users']['rick@example.com']['ok'] = True
    A.fill('#ac-pass', 'senha-segura-1'); A.click('#ac-go'); A.wait_for_selector('#ac-out', timeout=8000)
    res['A conectado'] = A.inner_text('.card h2')
    res['linhas no servidor'] = len(DB['rows']); res['dados comprimidos'] = list(DB['rows'].values())[0]['data'][:2]
    sessions_A = A.evaluate("Object.keys(JSON.parse(localStorage.getItem('gfs-local-v1'))).filter(k=>k.startsWith('srs/')).length + ' cartas, diag=' + !!JSON.parse(localStorage.getItem('gfs-local-v1')).profile.diag")
    # Aparelho B: novo, entra pela tela inicial
    B = device(); B.goto('http://localhost:8776/'); B.wait_for_selector('#o-sync'); B.click('#o-sync'); B.wait_for_selector('#ac-go')
    B.fill('#ac-email', 'rick@example.com'); B.fill('#ac-pass', 'senha-segura-1'); B.click('#ac-go'); B.wait_for_selector('#h-start', timeout=8000)
    res['B recebeu o progresso (sessões A/B)'] = [sessions_A, B.evaluate("Object.keys(JSON.parse(localStorage.getItem('gfs-local-v1'))).filter(k=>k.startsWith('srs/')).length + ' cartas, diag=' + !!JSON.parse(localStorage.getItem('gfs-local-v1')).profile.diag")]
    res['B foi para'] = where(B); res['linhas após B'] = len(DB['rows'])
    # link de confirmação (tokens no endereço)
    C = device(); C.goto('http://localhost:8776/#access_token=' + jwt('u1', 'rick@example.com') + '&refresh_token=r-u1&expires_in=3600&type=signup'); C.wait_for_selector('#ac-out', timeout=8000)
    res['link de confirmação conecta e limpa o endereço'] = [C.inner_text('.card h2'), C.evaluate('location.hash')]
    # nova senha
    A.click('#ac-out'); A.wait_for_selector('#ac-go'); A.click('[data-ac-tab=rec]'); A.fill('#ac-email', 'rick@example.com'); A.click('#ac-go'); A.wait_for_timeout(300)
    res['recuperação enviada'] = DB['mails'][-1][:2]; res['redirect do e-mail'] = DB['mails'][-1][2]
    R = device(); R.goto('http://localhost:8776/#access_token=' + jwt('u1', 'rick@example.com') + '&refresh_token=r-u1&expires_in=3600&type=recovery'); R.wait_for_selector('#ac-np', timeout=8000)
    R.fill('#ac-np', 'nova-senha-22'); R.click('#ac-np-go'); R.wait_for_timeout(400); res['senha trocada'] = DB['users']['rick@example.com']['pw']
    R2 = device(); R2.goto('http://localhost:8776/#error=access_denied&error_code=otp_expired&error_description=Email+link+is+invalid'); R2.wait_for_timeout(800); res['link expirado'] = [R2.evaluate('location.hash'), R2.locator('.fb').first.inner_text() if R2.locator('.fb').count() else None]
    # RLS simulado: outro usuário não vê nada
    DB['users']['eva@example.com'] = {'id': 'u9', 'pw': 'outrasenha9', 'ok': True}
    E_ = device(); E_.goto('http://localhost:8776/'); E_.click('#o-sync'); E_.fill('#ac-email', 'eva@example.com'); E_.fill('#ac-pass', 'outrasenha9'); E_.click('#ac-go'); E_.wait_for_timeout(1500)
    res['outra conta não recebe dados do Rick'] = E_.locator('#o-go').count() > 0 or E_.locator('#ac-out').count() > 0
    # apagar dados da nuvem (conta da Eva)
    rows_before = len(DB['rows'])
finally: srv.terminate()
print(json.dumps(res, indent=1, ensure_ascii=False)); print('errs', errs)
