import {screen} from "electron";

export class AppSettings {
  x?: number;
  y?: number;
  width = 1600;
  height = 900;
  maximized = false;

  static normalize(settings: AppSettings) {
    const defaultSettings = new AppSettings();
    if(typeof settings.x !== 'number' && settings.x !== undefined) settings.x = defaultSettings.x;
    if(typeof settings.y !== 'number' && settings.y !== undefined) settings.y = defaultSettings.y;
    if(typeof settings.width !== 'number') settings.width = defaultSettings.width;
    if(typeof settings.height !== 'number') settings.height = defaultSettings.height;
    if(typeof settings.maximized !== 'boolean') settings.maximized = defaultSettings.maximized;
  }

  public static readonly MinWindowSize = {
    width: 940,
    height: 500
  };

  public static getLaunchWindowSettings(preferredSettings: AppSettings): AppSettings {
    let display: Electron.Display;
    if(preferredSettings.x === undefined || preferredSettings.y === undefined) {
      display = screen.getPrimaryDisplay();
    } else {
      display = screen.getDisplayNearestPoint({x: preferredSettings.x, y: preferredSettings.y});
    }

    const workArea = display.workArea;

    let width = preferredSettings.width;
    let height = preferredSettings.height;
    let x = preferredSettings.x;
    let y = preferredSettings.y;

    if (width < AppSettings.MinWindowSize.width) width = AppSettings.MinWindowSize.width;
    if (width > workArea.width) width = workArea.width;
    if (height < AppSettings.MinWindowSize.height) height = AppSettings.MinWindowSize.height;
    if (height > workArea.height) height = workArea.height;

    if(x !== undefined && x < workArea.x) x = workArea.x;
    if(x !== undefined && x > workArea.x + workArea.width - 50) x = workArea.x + workArea.width - 50;
    if(y !== undefined && y < workArea.y) y = workArea.y;
    if(y !== undefined && y > workArea.y + workArea.height - 50) y = workArea.y + workArea.height - 50;

    return {
      width: width,
      height: height,
      x: x,
      y: y,
      maximized: preferredSettings.maximized
    }
  }
}


