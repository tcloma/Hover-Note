const { contextBridge, ipcRenderer } = require('electron');

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
      getFiles() {
         // const files = []
         ipcRenderer.send('get-files');
         ipcRenderer.on('return-files', async (event, file) => {
            console.log(file);
            return file;
         });

         // return files
      },
   },
});
