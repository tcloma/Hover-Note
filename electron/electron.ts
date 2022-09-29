const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs').promises;
// const slash = require('slash');

let win;
let child;
let directory;

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

   win.loadURL('http://localhost:5173');
   win.maximize();
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
         preload: path.join(__dirname, 'preload.js'),
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
app.on('activate', () => {
   if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
   }
});

const openDirectoryDialog = () => {
   dialog
      .showOpenDialog(win, {
         properties: ['openFile', 'openDirectory'],
      })
      .then((result) => {
         if (result.canceled) return null;
         win.webContents.send('return-path', result.filePaths);
         const convertedPath = result.filePaths
            .toString()
            .split(path.sep)
            .join(path.posix.sep);
         directory = convertedPath;
         console.log('Directory: ', directory);
      });
};

ipcMain.on('open-dialog', openDirectoryDialog);

const readFilesFromDirectory = async () => {
   if (directory === undefined) return null;
   const directoryContents = await fs.readdir(directory);
   for (const [index, fileName] of directoryContents.entries()) {
      const fileContent = await fs.readFile(
         `${directory}/${fileName}`,
         'utf-8'
      );
      const fileObject = {
         id: index + 1,
         title: fileName,
         content: fileContent,
      };
      win.webContents.send('return-files', fileObject);
   }
};

ipcMain.on('get-files', readFilesFromDirectory);
