import {Component, inject} from '@angular/core';
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {AsyncPipe, JsonPipe, NgIf} from "@angular/common";
import {LoginFormComponent} from "../shared/components/login-form/login-form.component";
import {AuthService} from "../apis/general/services/auth.service";
import {KitsuOAuthService} from "../apis/kitsu/services/kitsu-o-auth.service";

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
    LoginFormComponent,
    AsyncPipe,
    JsonPipe
  ],
  standalone: true
})
export class DevComponent {
  username = '';
  password = '';
  authService = inject(AuthService);
  kitsuOAuthService = inject(KitsuOAuthService);

  async loginKitsu() {
    if (!this.username || !this.password) return;

    await this.authService.loginKitsu(this.username, this.password);
  }

  logoutKitsu() {
    this.authService.logoutKitsu();
  }
}
