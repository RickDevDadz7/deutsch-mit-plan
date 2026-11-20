// Deutsch mit Plan — programa de PC (Electron). Dados ficam num arquivo JSON local.
const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const fs = require('fs');

if (!app.requestSingleInstanceLock()) { app.quit(); }

const DATA_DIR = path.join(app.getPath('userData'), 'dados');
const DB_FILE = path.join(DATA_DIR, 'db.json');
const BK_DIR = path.join(DATA_DIR, 'copias-automaticas');
let db = {}; let timer = null; let win = null;

function load() {
  fs.mkdirSync(BK_DIR, { recursive: true });
  for (const f of [DB_FILE, DB_FILE + '.anterior']) {
    try { if (fs.existsSync(f)) { db = JSON.parse(fs.readFileSync(f, 'utf8')); return; } }
    catch (e) { console.error('arquivo corrompido, tentando o anterior:', f); }
  }
  db = {};
}
function writeNow() {
  clearTimeout(timer); timer = null;
  const tmp = DB_FILE + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(db));
  if (fs.existsSync(DB_FILE)) fs.copyFileSync(DB_FILE, DB_FILE + '.anterior');
  fs.renameSync(tmp, DB_FILE); // troca atômica: nunca fica um arquivo pela metade
}
function schedule() { if (!timer) timer = setTimeout(writeNow, 300); }
function dailyCopy() { // uma cópia por dia, guarda as 14 mais recentes
  try {
    const d = new Date().toISOString().slice(0, 10);
    const f = path.join(BK_DIR, 'db-' + d + '.json');
    if (!fs.existsSync(f) && Object.keys(db).length) fs.writeFileSync(f, JSON.stringify(db));
    const all = fs.readdirSync(BK_DIR).filter((x) => x.startsWith('db-')).sort();
    for (const old of all.slice(0, Math.max(0, all.length - 14))) fs.unlinkSync(path.join(BK_DIR, old));
  } catch (e) { console.error('cópia diária falhou', e); }
}
const clone = (o) => JSON.parse(JSON.stringify(o));

ipcMain.handle('store:get', (_e, p) => (p in db ? clone(db[p]) : null));
ipcMain.handle('store:set', (_e, p, d) => { db[p] = clone(d); schedule(); return true; });
ipcMain.handle('store:del', (_e, p) => { delete db[p]; schedule(); return true; });
ipcMain.handle('store:list', (_e, c) => {
  const pre = c + '/';
  return Object.keys(db).filter((k) => k.startsWith(pre) && !k.slice(pre.length).includes('/')).map((k) => ({ id: k.slice(pre.length), data: clone(db[k]) }));
});
ipcMain.handle('file:save', async (_e, name, data) => {
  const r = await dialog.showSaveDialog(win, { defaultPath: path.join(app.getPath('documents'), name), filters: [{ name: 'Backup JSON', extensions: ['json'] }] });
  if (r.canceled || !r.filePath) return false;
  fs.writeFileSync(r.filePath, data); return true;
});
ipcMain.handle('folder:open', () => shell.openPath(DATA_DIR));
ipcMain.handle('ai:anthropic', async (_e, key, body) => {
  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' }, body: JSON.stringify(body) });
    let json = null; try { json = await r.json(); } catch (e) { /* */ }
    return { status: r.status, json };
  } catch (e) { return { status: 0, json: { error: { message: 'sem conexão com a internet' } } }; }
});

function desktopShortcut() { // cria atalho na Área de Trabalho e no Menu Iniciar na 1ª execução (Windows)
  if (process.platform !== 'win32' || !app.isPackaged) return;
  const flag = path.join(app.getPath('userData'), 'atalho-criado');
  if (fs.existsSync(flag)) return;
  const opts = { target: process.execPath, description: 'Deutsch mit Plan — professor de alemão', icon: process.execPath, iconIndex: 0 };
  try {
    shell.writeShortcutLink(path.join(app.getPath('desktop'), 'Deutsch mit Plan.lnk'), 'create', opts);
    const start = path.join(app.getPath('appData'), 'Microsoft', 'Windows', 'Start Menu', 'Programs');
    shell.writeShortcutLink(path.join(start, 'Deutsch mit Plan.lnk'), 'create', opts);
    fs.writeFileSync(flag, new Date().toISOString());
  } catch (e) { console.error('atalho', e); }
}

function createWindow() {
  win = new BrowserWindow({
    width: 1100, height: 820, minWidth: 380, minHeight: 600, title: 'Deutsch mit Plan', backgroundColor: '#26231e',
    icon: path.join(__dirname, 'icon.png'), autoHideMenuBar: true,
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, nodeIntegration: false, sandbox: true }
  });
  win.loadFile(path.join(__dirname, 'app', 'index.html'));
  win.webContents.setWindowOpenHandler(({ url }) => { if (/^https:\/\//.test(url)) shell.openExternal(url); return { action: 'deny' }; });
  win.webContents.on('will-navigate', (e, url) => { if (!url.startsWith('file://')) { e.preventDefault(); if (/^https:\/\//.test(url)) shell.openExternal(url); } });
}

app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });
app.whenReady().then(() => { load(); dailyCopy(); desktopShortcut(); createWindow(); });
app.on('before-quit', () => { if (timer) writeNow(); });
app.on('window-all-closed', () => { if (timer) writeNow(); app.quit(); });
