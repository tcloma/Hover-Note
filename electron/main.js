const { app, BrowserWindow, ipcMain, dialog, ipcRenderer } = require('electron');
const path = require('path');
const fs = require('fs').promises;

// Variable references
let mainWindow;
let childWindow;
let childId
let directory;
let filesCopy = []

// Initial window render
function createWindow() {
   mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      frame: false,
      icon: '../public/favicon.ico',
      webPreferences: {
         nodeIntegration: false,
         contextIsolation: true,
         preload: path.join(__dirname, 'preload.js'),
      },
   });

   mainWindow.loadURL('http://localhost:5173');
   mainWindow.maximize();
   mainWindow.webContents.openDevTools({ mode: 'detach' });
}
app.whenReady().then(createWindow);

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

// Title bar controls
ipcMain.on('maximize', () => {
   if (mainWindow.isMaximized()) {
      mainWindow.restore();
   } else {
      mainWindow.maximize();
   }
});
ipcMain.on('minimize', () => {
   mainWindow.minimize();
});
ipcMain.on('quit', (event, win) => {
   if (win === 'main') {
      app.quit();
   } else {
      childWindow.close()
   }
});

ipcMain.on('new-child-window', (event, noteId) => {
   childId = noteId
   childWindow = new BrowserWindow({
      width: 400,
      height: 400,
      frame: false,
      parent: mainWindow,
      webPreferences: {
         nodeIntegration: false,
         contextIsolation: true,
         preload: path.join(__dirname, 'preload.js'),
      },
   });
   childWindow.loadURL(`http://localhost:5173/sticky/${noteId}`);
   childWindow.setAlwaysOnTop(true, 'screen')
});

ipcMain.on('get-child-data', () => {
   const childFile = filesCopy.find(file => file.id === childId)
   childWindow.webContents.send('return-child-data', childFile)
})

const readFileContents = async (file, index) => {
   const fileContent = await fs.readFile(`${directory}/${file}`, 'utf-8');
   const fileObject = {
      id: index,
      name: file,
      content: fileContent,
   };
   return fileObject
}

ipcMain.on('open-dialog', () => {
   dialog.showOpenDialog(mainWindow, {
      properties: ['openFile', 'openDirectory'],
   })
      .then((result) => {
         if (result.canceled) return null;
         mainWindow.webContents.send('return-path', result.filePaths);
         const convertedPath = result.filePaths.toString().split(path.sep).join(path.posix.sep);
         directory = convertedPath;
         console.log('Directory: ', directory);
      });
});

const getDirContents = async () => {
   if (directory === undefined) return;
   const directoryContents = await fs.readdir(directory, { withFileTypes: true });
   console.log(directoryContents)
   for (const [index, item] of directoryContents.entries()) {
      if (item.isFile()) {
         const fileContents = await readFileContents(item.name, index)
         filesCopy.push(fileContents)
         mainWindow.webContents.send('return-files', fileContents);
      }
      else if (item.isDirectory()) {
         mainWindow.webContents.send('return-folders', item.name)
      } else {
         console.log('Unsupported type: ', item.name)
      }
   }
}

ipcMain.on('get-dir-contents', getDirContents);

ipcMain.on('set-dir', (event, dir) => {
   directory = dir.split('\\').join('/')
   getDirContents()
})