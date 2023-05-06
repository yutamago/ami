import {Component, inject} from '@angular/core';
import {ElectronService} from '../../core/services/electron/electron.service';

@Component({
  selector: 'app-window-handle-bar',
  templateUrl: './window-handle-bar.component.html',
  styleUrls: ['./window-handle-bar.component.scss'],
  standalone: true
})
export class WindowHandleBarComponent {

  electron = inject(ElectronService);

  minimizeWindow() {
    this.electron.ipcRenderer?.send('minimize_window');
  }

  maximizeWindow() {
    this.electron.ipcRenderer?.send('maximize_window');
  }

  closeApp() {
    this.electron.ipcRenderer?.send('exit_app');
  }
}
