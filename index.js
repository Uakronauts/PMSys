const {app, BrowserWindow, ipcMain, shell} = require('electron');
const { autoUpdater } = require('electron-updater');

let projTitle = 'Akronauts PMSys';

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 1000,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    },
    autoHideMenuBar: true,
    title: projTitle
  })
  mainWindow.loadFile('index.html'),
  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  //Uncomment when autoupdater is set up
  // mainWindow.once('ready-to-show', () => {
  //   autoUpdater.checkForUpdatesAndNotify();
  // });
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  //for silly MACOS projects
  app.quit();
});

//uncomment when autoupdater is set up
/*
ipcMain.on('app-version', (event) =>{ //reads app version specified in package.json and sends to main window
  event.sender.send('app-version', {version: app.getVersion() });
});

autoUpdater.on('update-available', () =>{ //if update is available send a signal over to the web side
  mainWindow.webContents.send('update_available');
});

autoUpdater.on('update-downloaded', () =>{  //if update is downloaded send a signal over to the web side
  mainWindow.webContents.send('update_downloaded');
});

ipcMain.on('restart_app', () => { // Restart and install the app
  autoUpdater.quitAndInstall();
});
*/