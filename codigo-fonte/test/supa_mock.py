import json, base64, urllib.parse
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
  if path != '/auth/v1/authorize': assert req.headers.get('apikey', '').startswith('sb_publishable_'), 'sem apikey'
  body = json.loads(req.post_data) if req.post_data else None
  def ok(o, st=200): route.fulfill(status=st, content_type='application/json', body=json.dumps(o))
  def tok(uid, email): return {'access_token': jwt(uid, email), 'refresh_token': 'r-' + uid, 'expires_in': 3600, 'user': {'id': uid, 'email': email, 'user_metadata': {'name': (DB['users'].get(email) or {}).get('name')}}}
  if path == '/auth/v1/signup':
    if body['email'] in DB['users']: return ok({'id': 'x', 'identities': []})
    uid = 'u%d' % (len(DB['users']) + 1); DB['users'][body['email']] = {'id': uid, 'pw': body['password'], 'ok': False, 'name': (body.get('data') or {}).get('name')}
    DB['mails'].append(('confirm', body['email'], q.get('redirect_to', [''])[0])); return ok({'id': uid, 'email': body['email'], 'identities': [{}]})
  if path == '/auth/v1/token':
    if q['grant_type'][0] == 'password':
      x = DB['users'].get(body['email'])
      if not x or x['pw'] != body['password']: return ok({'error_code': 'invalid_credentials', 'msg': 'Invalid login credentials'}, 400)
      if not x['ok']: return ok({'error_code': 'email_not_confirmed', 'msg': 'Email not confirmed'}, 400)
      return ok(tok(x['id'], body['email']))
    return ok({'error_code': 'refresh_token_not_found'}, 400)
  if path == '/auth/v1/authorize':
    rt = q['redirect_to'][0].replace('https://rickdevdadz7.github.io/deutsch-mit-plan/', 'http://localhost:8776/'); assert q['provider'][0] == 'google'
    go = lambda url: route.fulfill(status=200, content_type='text/html', body='<script>location.replace(%s)</script>' % json.dumps(url))
    if DB.get('google_off'): return go(rt + '?error=server_error&error_code=unexpected_failure&error_description=Unsupported+provider')
    x = DB['users'].setdefault('rick@example.com', {'id': 'u1', 'pw': None, 'ok': True})
    return go(rt + '#access_token=' + jwt(x['id'], 'rick@example.com') + '&refresh_token=r-' + x['id'] + '&expires_in=3600&token_type=bearer')
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

