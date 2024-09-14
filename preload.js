const { contextBridge, ipcRenderer } = require('electron/renderer');

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type])
    }
})

contextBridge.exposeInMainWorld('electronAPI', {
    callInitialize: (value) => ipcRenderer.send('call-initialize', value),

    loadSettings: (callback) => ipcRenderer.on('load-settings', (_event, value) => callback(value)),

    openApp: (value) => ipcRenderer.send('open-app', value),

    theme: (value) => ipcRenderer.send('theme', value),
    icons: (value) => ipcRenderer.send('icons', value),
});