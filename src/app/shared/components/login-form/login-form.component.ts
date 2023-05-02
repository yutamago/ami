import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {UsersResource} from "../../../apis/kitsu/schemas/resources/users.resource";

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  @Input() isLoggedIn = false;
  @Input() userInfo?: UsersResource | undefined;

  @Input() username?: string;
  @Input() password?: string;

  @Output() usernameChange = new EventEmitter<string>()
  @Output() passwordChange = new EventEmitter<string>()
  @Output() clickLogin = new EventEmitter<void>()
  @Output() clickLogout = new EventEmitter<void>()
}
