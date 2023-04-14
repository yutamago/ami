import {app, BrowserWindow, ipcMain, screen} from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import {AppSettings, getLaunchWindowSettings, MinWindowSize} from "./app-settings";

let settingsPath = path.join(app.getPath('userData'), "settings.json");
let settings: AppSettings = new AppSettings();
let win: BrowserWindow = null;
const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');

try {
  const settingsFile = fs.readFileSync(settingsPath, 'utf8');
  settings = Object.assign(settings, JSON.parse(settingsFile));
  AppSettings.normalize(settings);
}
catch(e) {
  console.error('Could not load settings from ', settingsPath, e);
}

function createWindow(): BrowserWindow {
  const windowSize = getLaunchWindowSettings(settings);

  // Create the browser window.
  win = new BrowserWindow({
    x: windowSize.x,
    y: windowSize.y,
    width: windowSize.width,
    height: windowSize.height,
    minWidth: MinWindowSize.width,
    minHeight: MinWindowSize.height,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve),
      contextIsolation: false,  // false if you want to run e2e test with Spectron
    }
  });

  if (serve) {
    const debug = require('electron-debug');
    debug();

    require('electron-reloader')(module);
    win.loadURL('http://localhost:4200');
  } else {
    // Path when running electron executable
    let pathIndex = './index.html';

    if (fs.existsSync(path.join(__dirname, '../dist/index.html'))) {
       // Path when running electron in local folder
      pathIndex = '../dist/index.html';
    }

    const url = new URL(path.join('file:', __dirname, pathIndex));
    win.loadURL(url.href);
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  return win;
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
  app.on('ready', () => setTimeout(() => {
    createWindow();
    if(settings.maximized) {
      win.maximize();
    }
  }, 400));

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}


try {
  ipcMain.on('minimize_window', () => win.minimize());
  ipcMain.on('maximize_window', () => win.isMaximized() ? win.unmaximize() : win.maximize());
  ipcMain.on('exit_app', () => app.quit());
} catch (e) {
  // Catch Error
  // throw e;
}

try {
  win.on('close', () => {
    const windowBounds = win.getBounds();
    const data: AppSettings = {
      x: windowBounds.x,
      y: windowBounds.y,
      width: windowBounds.width,
      height: windowBounds.height,
      maximized: win.isMaximized()
    };
    fs.writeFileSync(settingsPath, JSON.stringify(data));
  });
} catch (e) {
  // Catch Error
  // throw e;
}
