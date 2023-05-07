import {Component, HostBinding, inject} from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {ElectronService} from "./core/services/electron.service";
import {environment} from "../environments/environment";
import {WindowHandleBarComponent} from "./core/components/window/window-handle-bar/window-handle-bar.component";
import {MainNavigationComponent} from "./core/components/window/main-navigation/main-navigation.component";
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material/icon";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WindowHandleBarComponent, MainNavigationComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  electronService = inject(ElectronService);
  // translate = inject(TranslateService);

  @HostBinding('class.electron')
  isElectron: boolean;

  constructor(iconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    iconRegistry.addSvgIconSet(
      domSanitizer.bypassSecurityTrustResourceUrl('../assets/mdi.svg')
    );

    this.isElectron = this.electronService.isElectron;

    // this.translate.setDefaultLang('en');
    console.log('environment', environment);

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
