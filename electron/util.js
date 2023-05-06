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
exports.MainUtil = void 0;
const electron_1 = require("electron");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const app_settings_1 = require("./app-settings");
class MainUtil {
    static saveSettings(win) {
        if (!win)
            return;
        const windowBounds = win.getBounds();
        const data = {
            x: windowBounds.x,
            y: windowBounds.y,
            width: windowBounds.width,
            height: windowBounds.height,
            maximized: win.isMaximized()
        };
        fs.writeFileSync(MainUtil.settingsPath, JSON.stringify(data));
    }
    static createWindow(settings, serve, onClose) {
        const windowSize = app_settings_1.AppSettings.getLaunchWindowSettings(settings);
        // Create the browser window.
        const win = new electron_1.BrowserWindow({
            x: windowSize.x,
            y: windowSize.y,
            width: windowSize.width,
            height: windowSize.height,
            minWidth: app_settings_1.AppSettings.MinWindowSize.width,
            minHeight: app_settings_1.AppSettings.MinWindowSize.height,
            frame: false,
            webPreferences: {
                nodeIntegration: true,
                allowRunningInsecureContent: (serve),
                contextIsolation: false, // false if you want to run e2e test with Spectron
            }
        });
        if (serve) {
            const debug = require('electron-debug');
            debug();
            require('electron-reloader')(module);
            win.loadURL('http://localhost:4200').then();
        }
        else {
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
MainUtil.settingsPath = path.join(electron_1.app.getPath('userData'), "settings.json");
exports.MainUtil = MainUtil;
//# sourceMappingURL=util.js.map