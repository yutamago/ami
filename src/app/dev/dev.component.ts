import {Component, inject} from '@angular/core';
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {LoginFormComponent} from "../shared/components";
import {AuthService} from "../apis/general/services/auth.service";

@Component({
  selector: 'app-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.scss'],
  imports: [
    MatInputModule,
    FormsModule,
    MatButtonModule,
    NgIf,
    ReactiveFormsModule,
    LoginFormComponent
  ],
  standalone: true
})
export class DevComponent {
  username?: string;
  password?: string;
  authService = inject(AuthService);

  async loginKitsu() {
    if (!this.username || !this.password) return;

    await this.authService.loginKitsu(this.username, this.password);
  }

  logoutKitsu() {
    this.authService.logoutKitsu();
  }
}
