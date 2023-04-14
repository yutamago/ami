import {screen} from "electron";

export class AppSettings {
  x: number | null = null;
  y: number | null = null;
  width = 1600;
  height = 900;
  maximized = false;

  static normalize(settings: AppSettings) {
    const defaultSettings = new AppSettings();
    if(typeof settings.x !== 'number' && settings.x !== null) settings.x = defaultSettings.x;
    if(typeof settings.y !== 'number' && settings.y !== null) settings.y = defaultSettings.y;
    if(typeof settings.width !== 'number') settings.width = defaultSettings.width;
    if(typeof settings.height !== 'number') settings.height = defaultSettings.height;
    if(typeof settings.maximized !== 'boolean') settings.maximized = defaultSettings.maximized;
  }
}

export const MinWindowSize = {
  width: 940,
  height: 500
}

export function getLaunchWindowSettings(preferredSettings: AppSettings): AppSettings {
  let display: Electron.Display;
  if(preferredSettings.x === null || preferredSettings.y === null) {
    display = screen.getPrimaryDisplay();
  } else {
    display = screen.getDisplayNearestPoint({x: preferredSettings.x, y: preferredSettings.y});
  }

  const workArea = display.workArea;

  let width = preferredSettings.width;
  let height = preferredSettings.height;
  let x = preferredSettings.x;
  let y = preferredSettings.y;

  if (width < MinWindowSize.width) width = MinWindowSize.width;
  if (width > workArea.width) width = workArea.width;
  if (height < MinWindowSize.height) height = MinWindowSize.height;
  if (height > workArea.height) height = workArea.height;

  if(preferredSettings.x < workArea.x) x = workArea.x;
  if(preferredSettings.x > workArea.x + workArea.width - 50) x = workArea.x + workArea.width - 50;
  if(preferredSettings.y < workArea.y) y = workArea.y;
  if(preferredSettings.y > workArea.y + workArea.height - 50) y = workArea.y + workArea.height - 50;

  return {
    width: width,
    height: height,
    x: x,
    y: y,
    maximized: preferredSettings.maximized
  }
}
