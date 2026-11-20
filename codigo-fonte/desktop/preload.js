const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('gfsNative', {
  store: {
    get: (p) => ipcRenderer.invoke('store:get', p),
    set: (p, d) => ipcRenderer.invoke('store:set', p, d),
    del: (p) => ipcRenderer.invoke('store:del', p),
    list: (c) => ipcRenderer.invoke('store:list', c)
  },
  saveFile: (name, data) => ipcRenderer.invoke('file:save', name, data),
  openDataFolder: () => ipcRenderer.invoke('folder:open'),
  anthropic: (key, body) => ipcRenderer.invoke('ai:anthropic', key, body)
});
