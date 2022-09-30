const { contextBridge, ipcRenderer } = require('electron');
const files = [];
let dirPath;

contextBridge.exposeInMainWorld('electron', {
   titleBarApi: {
      minimize() {
         ipcRenderer.send('maximize');
      },
      maximize() {
         ipcRenderer.send('minimize');
      },
      quit() {
         ipcRenderer.send('quit');
      },
   },
   windowApi: {
      newWindow(noteId) {
         ipcRenderer.send('new-window', noteId);
      },
   },
   filesApi: {
      processFiles() {
         if (files.length > 0) return null;
         ipcRenderer.send('get-files');
         ipcRenderer.on('return-files', (event, file) => {
            files.push(file);
         });
      },
      getFiles() {
         return files;
      },
   },
   dialogApi: {
      openDialog() {
         ipcRenderer.send('open-dialog');
         ipcRenderer.on('return-path', (event, path) => {
            dirPath = path;
         });
      },
      getPath() {
         return dirPath;
      },
   },
   popupApi: {
      getData() {

      }
   }
});