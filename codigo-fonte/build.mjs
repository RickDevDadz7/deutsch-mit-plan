import fs from 'fs';
const src = (f) => fs.readFileSync('src/' + f, 'utf8');
const content = JSON.parse(JSON.stringify(src('content.js').match(/version: '([^']+)'/)[1]));
const js = ['fritz.js','fsrs.js','grading.js','content.js','content_a12.js','content_kit.js','content_a2.js','content_a2b.js','content_b1.js','content_b1b.js','content_b2.js','content_b2b.js','model.js','store.js','method.js','local.js','cloud.js','sync.js','gen.js','sfx.js','app.js'].map(src).join('\n;\n').replace(/<\/script/gi,'<\\/script');
const page = (extraHead, extraBody) => `<!DOCTYPE html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Deutsch mit Plan — professor de alemão</title>${extraHead}
<style>${fs.readFileSync('assets/fonts.css','utf8')}${src('style.css')}</style></head><body><div id="app"></div>
<script>${js}</script>${extraBody}</body></html>`;
// 1) artifact (Claude.ai)
fs.writeFileSync('dist/index.html', page('', ''));
// 2) PWA (celular / navegador)
fs.mkdirSync('pwa', { recursive: true });
fs.writeFileSync('pwa/index.html', page(`
<link rel="manifest" href="manifest.webmanifest"><meta name="theme-color" content="#26231e">
<link rel="apple-touch-icon" href="fritz-180.png"><link rel="icon" type="image/png" href="fritz-192.png"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-title" content="Deutsch"><script>window.GF_PWA = true;</script>`,
`<script>if ('serviceWorker' in navigator && window.isSecureContext) navigator.serviceWorker.register('sw.js');</script>`));
fs.writeFileSync('pwa/manifest.webmanifest', JSON.stringify({ name: 'Deutsch mit Plan', short_name: 'Deutsch', description: 'Professor de alemão A0–C2', start_url: './', scope: './', display: 'standalone', background_color: '#26231e', theme_color: '#26231e', lang: 'pt-BR', id: './', icons: [192, 512].flatMap((n) => [{ src: `fritz-${n}.png`, sizes: `${n}x${n}`, type: 'image/png', purpose: 'any' }, { src: `fritz-${n}.png`, sizes: `${n}x${n}`, type: 'image/png', purpose: 'maskable' }]) }, null, 1));
fs.writeFileSync('pwa/sw.js', fs.readFileSync('pwa-sw.js', 'utf8').replace('__VERSION__', content + '-' + Date.now()));
for (const n of [180, 192, 512]) fs.copyFileSync(`assets/icon-${n}.png`, `pwa/fritz-${n}.png`);
// 3) PC (Electron)
fs.mkdirSync('desktop/app', { recursive: true });
fs.writeFileSync('desktop/app/index.html', page('', ''));
fs.copyFileSync('assets/icon-512.png', 'desktop/icon.png');
console.log('ok: dist/, pwa/, desktop/');
