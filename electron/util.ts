import {app, BrowserWindow} from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import {AppSettings} from "./app-settings";

export class MainUtil {
  public static readonly settingsPath = path.join(app.getPath('userData'), "settings.json");

  public static saveSettings(win: Electron.CrossProcessExports.BrowserWindow | null) {
    if(!win) return;

    const windowBounds = win.getBounds();
    const data: AppSettings = {
      x: windowBounds.x,
      y: windowBounds.y,
      width: windowBounds.width,
      height: windowBounds.height,
      maximized: win.isMaximized()
    };
    fs.writeFileSync(MainUtil.settingsPath, JSON.stringify(data));
  }

  public static createWindow(settings: AppSettings, serve: boolean, onClose: () => void): BrowserWindow {
    const windowSize = AppSettings.getLaunchWindowSettings(settings);

    // Create the browser window.
    const win = new BrowserWindow({
      x: windowSize.x,
      y: windowSize.y,
      width: windowSize.width,
      height: windowSize.height,
      minWidth: AppSettings.MinWindowSize.width,
      minHeight: AppSettings.MinWindowSize.height,
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
      win.loadURL('http://localhost:4200').then();
    } else {
      // Path when running electron executable
      let pathIndex = './index.html';

      if (fs.existsSync(path.join(__dirname, '../dist/index.html'))) {
        // Path when running electron in local folder
        pathIndex = '../dist/index.html';
      }

      const url = new URL(path.join('file:', __dirname, pathIndex));
      win.loadURL(url.href).then();
    }

    // Emitted when the window is closed.
    win.on('closed', () => {
      // Dereference the window object, usually you would store window
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      // win = null;
      onClose();
    });

    return win;
  }
}
