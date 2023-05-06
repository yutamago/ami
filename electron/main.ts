import {app, BrowserWindow, ipcMain} from 'electron';
import * as fs from 'fs';
import {AppSettings} from "./app-settings";
import {MainUtil} from "./util";

let settings: AppSettings = new AppSettings();
let win: BrowserWindow | null = null;
const args = process.argv.slice(1);
const serve = args.some(val => val === '--serve');

try {
  const settingsFile = fs.readFileSync(MainUtil.settingsPath, 'utf8');
  settings = Object.assign(settings, JSON.parse(settingsFile));
  AppSettings.normalize(settings);
} catch (e: unknown) {
  if ((e as any).code === 'ENOENT') {
    console.info('File does not exist: ', MainUtil.settingsPath);
  } else {
    console.error('Could not load settings from ', MainUtil.settingsPath, e);
  }
}

function onCloseMainWindow() {
  // Dereference the window object, usually you would store window
  // in an array if your app supports multi windows, this is the time
  // when you should delete the corresponding element.
  win = null;
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
  app.on('ready', () => setTimeout(() => {
    win = MainUtil.createWindow(settings, serve, onCloseMainWindow);
    if (settings.maximized) {
      win.maximize();
    }
    try {
      win.on('close', () => {
        MainUtil.saveSettings(win);
      });
    } catch (e) {
      // Catch Error
      // throw e;
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
      win = MainUtil.createWindow(settings, serve, onCloseMainWindow);

      try {
        win.on('close', () => {
          MainUtil.saveSettings(win);
        });
      } catch (e) {
        // Catch Error
        // throw e;
      }
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}


try {
  ipcMain.on('minimize_window', () => win?.minimize());
  ipcMain.on('maximize_window', () => win?.isMaximized() ? win?.unmaximize() : win?.maximize());
  ipcMain.on('exit_app', () => app.quit());
} catch (e) {
  // Catch Error
  // throw e;
}


