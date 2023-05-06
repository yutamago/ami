"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const fs = __importStar(require("fs"));
const app_settings_1 = require("./app-settings");
const util_1 = require("./util");
let settings = new app_settings_1.AppSettings();
let win = null;
const args = process.argv.slice(1);
const serve = args.some(val => val === '--serve');
try {
    const settingsFile = fs.readFileSync(util_1.MainUtil.settingsPath, 'utf8');
    settings = Object.assign(settings, JSON.parse(settingsFile));
    app_settings_1.AppSettings.normalize(settings);
}
catch (e) {
    if (e.code === 'ENOENT') {
        console.info('File does not exist: ', util_1.MainUtil.settingsPath);
    }
    else {
        console.error('Could not load settings from ', util_1.MainUtil.settingsPath, e);
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
    electron_1.app.on('ready', () => setTimeout(() => {
        win = util_1.MainUtil.createWindow(settings, serve, onCloseMainWindow);
        if (settings.maximized) {
            win.maximize();
        }
        try {
            win.on('close', () => {
                util_1.MainUtil.saveSettings(win);
            });
        }
        catch (e) {
            // Catch Error
            // throw e;
        }
    }, 400));
    // Quit when all windows are closed.
    electron_1.app.on('window-all-closed', () => {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            electron_1.app.quit();
        }
    });
    electron_1.app.on('activate', () => {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (win === null) {
            win = util_1.MainUtil.createWindow(settings, serve, onCloseMainWindow);
            try {
                win.on('close', () => {
                    util_1.MainUtil.saveSettings(win);
                });
            }
            catch (e) {
                // Catch Error
                // throw e;
            }
        }
    });
}
catch (e) {
    // Catch Error
    // throw e;
}
try {
    electron_1.ipcMain.on('minimize_window', () => win === null || win === void 0 ? void 0 : win.minimize());
    electron_1.ipcMain.on('maximize_window', () => (win === null || win === void 0 ? void 0 : win.isMaximized()) ? win === null || win === void 0 ? void 0 : win.unmaximize() : win === null || win === void 0 ? void 0 : win.maximize());
    electron_1.ipcMain.on('exit_app', () => electron_1.app.quit());
}
catch (e) {
    // Catch Error
    // throw e;
}
//# sourceMappingURL=main.js.map