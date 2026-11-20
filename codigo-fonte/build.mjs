import fs from 'fs';
const src = (f) => fs.readFileSync('src/' + f, 'utf8');
const content = JSON.parse(JSON.stringify(src('content.js').match(/version: '([^']+)'/)[1]));
const js = ['fsrs.js','grading.js','content.js','model.js','store.js','method.js','local.js','app.js'].map(src).join('\n;\n').replace(/<\/script/gi,'<\\/script');
const page = (extraHead, extraBody) => `<!DOCTYPE html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Deutsch mit Plan — professor de alemão</title>${extraHead}
<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>${src('style.css')}</style></head><body><div id="app"></div>
<script>${js}</script>${extraBody}</body></html>`;
// 1) artifact (Claude.ai)
fs.writeFileSync('dist/index.html', page('', ''));
// 2) PWA (celular / navegador)
fs.mkdirSync('pwa', { recursive: true });
fs.writeFileSync('pwa/index.html', page(`
<link rel="manifest" href="manifest.webmanifest"><meta name="theme-color" content="#1f4fd1">
<link rel="apple-touch-icon" href="icon-180.png"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-title" content="Deutsch"><script>window.GF_PWA = true;</script>`,
`<script>if ('serviceWorker' in navigator && window.isSecureContext) navigator.serviceWorker.register('sw.js');</script>`));
fs.writeFileSync('pwa/manifest.webmanifest', JSON.stringify({ name: 'Deutsch mit Plan', short_name: 'Deutsch', description: 'Professor de alemão A0–C2', start_url: './', scope: './', display: 'standalone', background_color: '#121214', theme_color: '#1f4fd1', lang: 'pt-BR', id: './', icons: [192, 512].flatMap((n) => [{ src: `icon-${n}.png`, sizes: `${n}x${n}`, type: 'image/png', purpose: 'any' }, { src: `icon-${n}.png`, sizes: `${n}x${n}`, type: 'image/png', purpose: 'maskable' }]) }, null, 1));
fs.writeFileSync('pwa/sw.js', fs.readFileSync('pwa-sw.js', 'utf8').replace('__VERSION__', content + '-' + Date.now()));
for (const n of [180, 192, 512]) fs.copyFileSync(`assets/icon-${n}.png`, `pwa/icon-${n}.png`);
// 3) PC (Electron)
fs.mkdirSync('desktop/app', { recursive: true });
fs.writeFileSync('desktop/app/index.html', page('', ''));
fs.copyFileSync('assets/icon-512.png', 'desktop/icon.png');
console.log('ok: dist/, pwa/, desktop/');
