const { contextBridge, ipcRenderer } = require('electron');
const files = [];
const folders = []
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
         ipcRenderer.send('new-child-window', noteId);
      },
   },
   filesApi: {
      processDirectory() {
         if (files.length > 0) return null;
         ipcRenderer.send('get-dir-contents');
         ipcRenderer.on('return-files', (event, file) => {
            files.push(file);
         });
         ipcRenderer.on('return-folders', (event, folder) => {
            folders.push(folder)
         })
      },
      getFiles() {
         return files;
      },
      getFolders() {
         return folders
      }
   },
   directoryApi: {
      setNewDirectory(dir) {
         ipcRenderer.send('set-dir', dir)
      }
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
            childFile = data
         })
      },
      getChildData() {
         return childFile
      }
   }
});