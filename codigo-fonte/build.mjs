import fs from 'fs';
import crypto from 'crypto';
const src = (f) => fs.readFileSync('src/' + f, 'utf8');
const content = JSON.parse(JSON.stringify(src('content.js').match(/version: '([^']+)'/)[1]));
const js = ['fritz.js','fsrs.js','grading.js','content.js','content_a12.js','content_kit.js','content_a2.js','content_a2b.js','content_b1.js','content_b1b.js','content_b2.js','content_b2b.js','model.js','store.js','method.js','local.js','cloud.js','sync.js','gen.js','sfx.js','app.js'].map(src).join('\n;\n').replace(/<\/script/gi,'<\\/script');
const page = (extraHead, extraBody) => `<!DOCTYPE html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Stempel — alemão do zero ao visto</title>${extraHead}
<style>${fs.readFileSync('assets/fonts.css','utf8')}${src('style.css')}</style></head><body><div id="app"></div>
<script>${js}</script>${extraBody}</body></html>`;
/* Segurança: política de conteúdo (CSP) nas versões instalada e de PC.
 * Scripts só rodam se forem exatamente os do app (hash SHA-256): código injetado não executa.
 * Conexões só com os servidores conhecidos: mesmo que algo escape, não consegue mandar dados para fora. */
const sha = (code) => "'sha256-" + crypto.createHash('sha256').update(code, 'utf8').digest('base64') + "'";
const PWA_JS = 'window.GF_PWA = true;';
const SW_JS = "if ('serviceWorker' in navigator && window.isSecureContext) navigator.serviceWorker.register('sw.js');";
const csp = (scripts) => `<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src ${scripts.map(sha).join(' ')}; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; media-src 'self' data: blob:; connect-src 'self' https://uutyijvitbeiwbivkfgz.supabase.co https://api.anthropic.com https://api.github.com https://gist.githubusercontent.com; worker-src 'self'; manifest-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-src 'none'">
<meta name="referrer" content="strict-origin-when-cross-origin">`;
// 1) artifact (Claude.ai) — o próprio Claude aplica as regras dele; CSP própria quebraria as capacidades

fs.writeFileSync('dist/index.html', page('', ''));
// 2) PWA (celular / navegador)
fs.mkdirSync('pwa', { recursive: true });
fs.writeFileSync('pwa/index.html', page(csp([PWA_JS, js, SW_JS]) + `
<link rel="manifest" href="manifest.webmanifest"><meta name="theme-color" content="#26231e">
<link rel="apple-touch-icon" href="fritz-180.png"><link rel="icon" type="image/png" href="fritz-192.png"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-title" content="Deutsch"><script>${PWA_JS}</script>`,
`<script>${SW_JS}</script>`));
fs.writeFileSync('pwa/manifest.webmanifest', JSON.stringify({ name: 'Stempel — alemão do zero ao visto', short_name: 'Stempel', description: 'Alemão do A0 ao C2 para quem vai morar na Alemanha, com a raposa Reineke', start_url: './', scope: './', display: 'standalone', background_color: '#26231e', theme_color: '#26231e', lang: 'pt-BR', id: './', icons: [192, 512].flatMap((n) => [{ src: `fritz-${n}.png`, sizes: `${n}x${n}`, type: 'image/png', purpose: 'any' }, { src: `fritz-${n}.png`, sizes: `${n}x${n}`, type: 'image/png', purpose: 'maskable' }]) }, null, 1));
fs.writeFileSync('pwa/sw.js', fs.readFileSync('pwa-sw.js', 'utf8').replace('__VERSION__', content + '-' + Date.now()));
for (const n of [180, 192, 512]) fs.copyFileSync(`assets/icon-${n}.png`, `pwa/fritz-${n}.png`);
// 3) PC (Electron)
fs.mkdirSync('desktop/app', { recursive: true });
fs.writeFileSync('desktop/app/index.html', page(csp([js]), ''));
fs.copyFileSync('assets/icon-512.png', 'desktop/icon.png');
console.log('ok: dist/, pwa/, desktop/');
