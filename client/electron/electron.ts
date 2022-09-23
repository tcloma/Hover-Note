const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

let win;
let child;

// Initial window render
function createWindow() {
   win = new BrowserWindow({
      width: 800,
      height: 600,
      frame: false,
      webPreferences: {
         nodeIntegration: true,
         contextIsolation: false,
         preload: path.join(__dirname, 'preload.ts'),
      },
   });

   win.loadURL(
      isDev
         ? 'http://localhost:5173'
         : `file://${path.join(__dirname, '../build/public/index.html')}`
   );

   win.webContents.openDevTools({ mode: 'detach' });
}
app.whenReady().then(createWindow);

// Title bar controls
ipcMain.on('QUIT', () => {
   app.quit();
});

ipcMain.on('MAXIMIZE', () => {
   if (win.isMaximized()) {
      win.restore();
      win.webContents.send('isRestored');
   } else {
      win.maximize();
      win.webContents.send('isMaximized');
   }
});

ipcMain.on('MINIMIZE', () => {
   win.minimize();
});


const createChildWindow = () => {
   child = new BrowserWindow({
      width: 300,
      height: 300,
      frame: false,
      webPreferences: {
         nodeIntegration: true,
         contextIsolation: false,
      },
   });
   child.loadURL('http://localhost:5173/note/1');
}

ipcMain.on('NEWWINDOW', () => {
   // win.minimize()
   createChildWindow()
});

// win.on('maximize', () => {
// });

// win.on('unmaximize', () => {
// });

// Close app when all windows are closed
app.on('window-all-closed', () => {
   if (process.platform !== 'darwin') {
      app.quit();
   }
});

// Make initial window
app.on('activate', () => {
   if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
   }
});
