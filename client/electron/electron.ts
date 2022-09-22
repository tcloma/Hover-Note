const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

// app.commandLine.appendSwitch('no-sandbox');
// app.commandLine.appendSwitch('disable-gpu');
// app.commandLine.appendSwitch('disable-software-rasterizer');
// app.commandLine.appendSwitch('disable-gpu-compositing');
// app.commandLine.appendSwitch('disable-gpu-rasterization');
// app.commandLine.appendSwitch('disable-gpu-sandbox');
// app.commandLine.appendSwitch('--no-sandbox');
// app.disableHardwareAcceleration();

let win;

// Initial window render
function createWindow() {
   win = new BrowserWindow({
      width: 800,
      height: 600,
      frame: false,
      webPreferences: {
         nodeIntegration: true,
         contextIsolation: false,
         preload: path.join(__dirname, 'preload.js'),
      },
   });

   win.loadURL(
      isDev
         ? 'http://localhost:5173'
         : `file://${path.join(__dirname, '../build/public/index.html')}`
   );
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
