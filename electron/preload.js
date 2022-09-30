const { contextBridge, ipcRenderer } = require('electron');
const files = [];
let childFile;
let dirPath;

contextBridge.exposeInMainWorld('electron', {
   titleBarApi: {
      minimize() {
         ipcRenderer.send('minimize');
      },
      maximize() {
         ipcRenderer.send('maximize');
      },
      quit(win) {
         ipcRenderer.send('quit', win);
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
   stickyNoteApi: {
      initData() {
         console.log('clicked')
         ipcRenderer.send('get-child-data');
         ipcRenderer.on('return-child-data', (event, data) => {
            console.log(data)
            childFile = data
         })
      },
      getChildData() {
         return childFile
      }
   }
});