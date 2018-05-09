import {
  app,
  BrowserWindow,
  ipcMain,
  Menu
} from 'electron'
require('electron-debug')({ showDevTools: false })
// Install `electron-debug` with `devtron`

// Install `vue-devtools`
require('electron').app.on('ready', () => {
  let installExtension = require('electron-devtools-installer')
  installExtension.default(installExtension.VUEJS_DEVTOOLS)
      .then(() => {})
      .catch(err => {
        console.log('Unable to install `vue-devtools`: \n', err)
      })
})
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

global.shared = {
  danmuSetting: {
    color: '#ffffff',
    bgcolor: '#222222',
    size: 48,
    alpha: 1,
    hover: false,
    enterTip:true
  }
}
let mainWindow, danmuWindow;
const winURL = process.env.NODE_ENV === 'development' ?
    `http://localhost:9080` :
    `file://${__dirname}/index.html`;
const danmuUrl = process.env.NODE_ENV === 'development' ?
    `file://F:/Project/webstrom/ds/static./index.html`:
    `file://${__dirname}/static/index.html`;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 600,
    useContentSize: true,
    width: 1000,
    //frame: false,

    webPreferences: {webSecurity: false},
  });
  danmuWindow = new BrowserWindow({

    width: 1000, height: 600,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    fullscreen: true,
    webPreferences: {webSecurity: false},
  });
  danmuWindow.setIgnoreMouseEvents(true);
  danmuWindow.loadURL(danmuUrl);
  mainWindow.loadURL(winURL);
  danmuWindow.on('closed', () => {
    danmuWindow = null
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
    danmuWindow.close()
  });
  mainWindow.webContents.window = mainWindow;
  danmuWindow.otherId = mainWindow.id;
  mainWindow.otherId = danmuWindow.id
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
});
ipcMain.on('c', (event, data) => {
  console.log(event, data);
  if (data.type === 'close') {
    event.sender.window.close()
  } else if (data.type === 'mini') {
    event.sender.window.minimize()
  }
});
ipcMain.on('id', (event, data) => {
  console.log(event, data);
  event.sender.send('id', {main: mainWindow.id, danmu: danmuWindow.id})

})
ipcMain.on('start', (event, data) => {

});
/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
