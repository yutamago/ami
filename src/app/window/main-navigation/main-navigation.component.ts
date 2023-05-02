import {Component, HostBinding, inject} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {ElectronService} from "../../core";
import {MatRippleModule} from "@angular/material/core";
import {MatTooltipModule} from "@angular/material/tooltip";
import {AnimeMangaToggle} from "../../library/library.component";
import {AuthService} from "../../apis/general/services/auth.service";
import {AsyncPipe, NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss'],
  imports: [
    RouterLink,
    RouterLinkActive,
    MatRippleModule,
    MatTooltipModule,
    AsyncPipe,
    NgOptimizedImage,
    NgIf
  ],
  standalone: true
})
export class MainNavigationComponent {
  protected readonly AnimeMangaToggle = AnimeMangaToggle;

  electron = inject(ElectronService);
  authService = inject(AuthService);
  animeMangaToggle: AnimeMangaToggle = AnimeMangaToggle.Anime;

  @HostBinding('class.is-electron') isElectron = false;

  constructor() {
    this.isElectron = this.electron.isElectron;
  }
}
