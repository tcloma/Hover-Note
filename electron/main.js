const { app, BrowserWindow, ipcMain, dialog, ipcRenderer } = require('electron');
const path = require('path');
const fs = require('fs').promises;

// Variable references
let mainWindow;
let childWindow;
let childId
let directory;
let filesCopy = []
let foldersCopy = []

// Initial window render
function createWindow() {
   mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      frame: false,
      minWidth: 800,
      minHeight: 550,
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
      minHeight: 200,
      minWidth: 200,
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

const isIgnored = (item) => {
   return item.split('')[0] !== '.'
}

const isValid = (item) => {
   return ['.md', '.txt'].includes(path.extname(item))
}

const getDirContents = async () => {
   if (directory === undefined) return;
   const directoryContents = await fs.readdir(directory, { withFileTypes: true });
   for (const [index, item] of directoryContents.entries()) {
      if (isIgnored(item.name)) {
         if (item.isFile()) {
            if (isValid(item.name)) {
               const fileContents = await readFileContents(item.name, index)
               filesCopy.push(fileContents)
            }
         }
         else if (item.isDirectory()) {
            foldersCopy.push(item.name)
         } else {
            console.log('Unsupported type: ', item.name)
         }
      }
   }
   mainWindow.webContents.send('return-files', filesCopy);
   mainWindow.webContents.send('return-folders', foldersCopy)
}

ipcMain.on('get-dir-contents', getDirContents);

ipcMain.on('set-dir', (event, dir) => {
   directory = dir.split('\\').join('/')
   filesCopy.length = 0
   foldersCopy.length = 0
})

ipcMain.on('write-file', (event, args) => {
   const { file, content } = args
   fs.writeFile(`${directory}/${file}`, content, (err) => {
      if (err) {
         console.log(err)
      } else {
         console.log('Success!')
      }
   })
})