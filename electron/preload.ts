const { contextBridge, ipcRenderer } = require('electron');
const files = [];
let dirPath;

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
   filesApi: {
      processFiles() {
         if (files.length > 0) return null;
         ipcRenderer.send('get-files');
         ipcRenderer.on('return-files', (event, file) => {
            // console.log(event)
            files.push(file);
         });
      },
      getFiles() {
         // console.log('Files from preload: ', files);
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
});
