"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppSettings = void 0;
const electron_1 = require("electron");
class AppSettings {
    constructor() {
        this.width = 1600;
        this.height = 900;
        this.maximized = false;
    }
    static normalize(settings) {
        const defaultSettings = new AppSettings();
        if (typeof settings.x !== 'number' && settings.x !== undefined)
            settings.x = defaultSettings.x;
        if (typeof settings.y !== 'number' && settings.y !== undefined)
            settings.y = defaultSettings.y;
        if (typeof settings.width !== 'number')
            settings.width = defaultSettings.width;
        if (typeof settings.height !== 'number')
            settings.height = defaultSettings.height;
        if (typeof settings.maximized !== 'boolean')
            settings.maximized = defaultSettings.maximized;
    }
    static getLaunchWindowSettings(preferredSettings) {
        let display;
        if (preferredSettings.x === undefined || preferredSettings.y === undefined) {
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
        if (width < AppSettings.MinWindowSize.width)
            width = AppSettings.MinWindowSize.width;
        if (width > workArea.width)
            width = workArea.width;
        if (height < AppSettings.MinWindowSize.height)
            height = AppSettings.MinWindowSize.height;
        if (height > workArea.height)
            height = workArea.height;
        if (x !== undefined && x < workArea.x)
            x = workArea.x;
        if (x !== undefined && x > workArea.x + workArea.width - 50)
            x = workArea.x + workArea.width - 50;
        if (y !== undefined && y < workArea.y)
            y = workArea.y;
        if (y !== undefined && y > workArea.y + workArea.height - 50)
            y = workArea.y + workArea.height - 50;
        return {
            width: width,
            height: height,
            x: x,
            y: y,
            maximized: preferredSettings.maximized
        };
    }
}
AppSettings.MinWindowSize = {
    width: 940,
    height: 500
};
exports.AppSettings = AppSettings;
//# sourceMappingURL=app-settings.js.map