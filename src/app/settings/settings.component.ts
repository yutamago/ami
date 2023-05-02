import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../apis/general/services/auth.service";
import {LoginFormComponent} from "../shared/components";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule, FormsModule, LoginFormComponent],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  username = '';
  password = '';

  constructor(protected authService: AuthService) {
  }

  async loginKitsu() {
    await this.authService.loginKitsu(this.username, this.password);
  }

  logoutKitsu() {
    this.authService.logoutKitsu();
  }
}
