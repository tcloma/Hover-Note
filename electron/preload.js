const { contextBridge, ipcRenderer } = require('electron');
let files = [];
let folders = []
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
         ipcRenderer.once('return-files', (event, filesArr) => {
            files.push(filesArr);
         });
         ipcRenderer.once('return-folders', (event, foldersArr) => {
            folders.push(foldersArr)
         })
      },
      getFiles() {
         if (files.length !== 0) return files;
      },
      getFolders() {
         if (files.length !== 0) return folders;
      },
      writeFile(file, content) {
         ipcRenderer.send('write-file', {
            file: file,
            content: content
         })
      }
   },
   directoryApi: {
      setNewDirectory(dir) {
         files.length = 0
         folders.length = 0
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