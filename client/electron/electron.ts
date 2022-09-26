const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const fs = require('fs').promises;

let win;
let child;

// Initial window render
function createWindow() {
   win = new BrowserWindow({
      width: 1200,
      height: 800,
      frame: false,
      webPreferences: {
         nodeIntegration: false,
         contextIsolation: true,
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
ipcMain.on('MAXIMIZE', () => {
   if (win.isMaximized()) {
      win.restore();
   } else {
      win.maximize();
   }
});
ipcMain.on('MINIMIZE', () => {
   win.minimize();
});
ipcMain.on('QUIT', () => {
   app.quit();
});

const createChildWindow = () => {
   child = new BrowserWindow({
      width: 300,
      height: 300,
      frame: false,
      webPreferences: {
         nodeIntegration: false,
         contextIsolation: true,
      },
   });
   child.loadURL('http://localhost:5173/note/1');
};

ipcMain.on('NEWWINDOW', () => {
   // win.minimize()
   createChildWindow();
});

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

const directory = '/Users/RikaaGamingPC1/Documents/Hover';
const readFiles = async () => {
   const files = await fs.readdir(directory);
   for (const fileName of files) {
      const file = await fs.readFile(`${directory}/${fileName}`, 'utf-8');
      win.webContents.send('return-files', file);
   }
};

ipcMain.on('get-files', readFiles)
