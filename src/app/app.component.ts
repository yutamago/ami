import {Component, HostBinding, inject} from '@angular/core';
import {ElectronService} from './core';
import {TranslateService} from '@ngx-translate/core';
import {APP_CONFIG} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  electronService = inject(ElectronService);
  translate = inject(TranslateService);

  @HostBinding('class.electron')
  isElectron: boolean;

  constructor() {
    this.isElectron = this.electronService.isElectron;

    this.translate.setDefaultLang('en');
    console.log('APP_CONFIG', APP_CONFIG);

    if (this.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);
    } else {
      console.log('Run in browser');
    }
  }
}
