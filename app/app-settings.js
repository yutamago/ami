"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLaunchWindowSettings = exports.MinWindowSize = exports.AppSettings = void 0;
const electron_1 = require("electron");
class AppSettings {
    constructor() {
        this.x = null;
        this.y = null;
        this.width = 1600;
        this.height = 900;
        this.maximized = false;
    }
    static normalize(settings) {
        const defaultSettings = new AppSettings();
        if (typeof settings.x !== 'number' && settings.x !== null)
            settings.x = defaultSettings.x;
        if (typeof settings.y !== 'number' && settings.y !== null)
            settings.y = defaultSettings.y;
        if (typeof settings.width !== 'number')
            settings.width = defaultSettings.width;
        if (typeof settings.height !== 'number')
            settings.height = defaultSettings.height;
        if (typeof settings.maximized !== 'boolean')
            settings.maximized = defaultSettings.maximized;
    }
}
exports.AppSettings = AppSettings;
exports.MinWindowSize = {
    width: 940,
    height: 500
};
function getLaunchWindowSettings(preferredSettings) {
    let display;
    if (preferredSettings.x === null || preferredSettings.y === null) {
        display = electron_1.screen.getPrimaryDisplay();
    }
    else {
        display = electron_1.screen.getDisplayNearestPoint({ x: preferredSettings.x, y: preferredSettings.y });
    }
    const workArea = display.workArea;
    let width = preferredSettings.width;
    let height = preferredSettings.height;
    let x = preferredSettings.x;
    let y = preferredSettings.y;
    if (width < exports.MinWindowSize.width)
        width = exports.MinWindowSize.width;
    if (width > workArea.width)
        width = workArea.width;
    if (height < exports.MinWindowSize.height)
        height = exports.MinWindowSize.height;
    if (height > workArea.height)
        height = workArea.height;
    if (preferredSettings.x < workArea.x)
        x = workArea.x;
    if (preferredSettings.x > workArea.x + workArea.width - 50)
        x = workArea.x + workArea.width - 50;
    if (preferredSettings.y < workArea.y)
        y = workArea.y;
    if (preferredSettings.y > workArea.y + workArea.height - 50)
        y = workArea.y + workArea.height - 50;
    return {
        width: width,
        height: height,
        x: x,
        y: y,
        maximized: preferredSettings.maximized
    };
}
exports.getLaunchWindowSettings = getLaunchWindowSettings;
//# sourceMappingURL=app-settings.js.map