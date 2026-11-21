// Service worker: guarda o app para funcionar sem internet.
// O site rickdevdadz7.github.io é compartilhado com o Trilha Dev: só apagamos caches nossos (prefixo gfs-).
const CACHE = 'gfs-2026.11.20-2-1795270716047';
const FILES = ['./', './index.html', './manifest.webmanifest', './fritz-192.png', './fritz-512.png', './fritz-180.png'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith('gfs-') && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return; // API da IA e fontes: direto da rede
  e.respondWith(fetch(e.request).then((r) => { const cp = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, cp)); return r; }).catch(() => caches.match(e.request).then((r) => r || caches.match('./index.html'))));
});
