const { contextBridge, ipcRenderer } = require('electron');
const files = []

contextBridge.exposeInMainWorld('electron', {
   titleBarApi: {
      minimize() {
         ipcRenderer.send('MINIMIZE');
      },
      maximize() {
         ipcRenderer.send('MAXIMIZE');
      },
      quit() {
         ipcRenderer.send('QUIT');
      },
   },
   windowApi: {
      newWindow() {
         ipcRenderer.send('NEWWINDOW');
      },
   },
   fileSystemApi: {
      processFiles() {
         if (files.length > 0) return null
         ipcRenderer.send('get-files');
         ipcRenderer.on('return-files', (event, file) => {
            files.push(file)
         });
      },
      getFiles() {
         console.log('Files from preload: ', files)
         return files
      }
   },
});