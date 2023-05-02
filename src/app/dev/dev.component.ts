import { Component } from '@angular/core';
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.scss'],
  imports: [
    MatInputModule,
    FormsModule,
    MatButtonModule,
    NgIf,
    ReactiveFormsModule
  ],
  standalone: true
})
export class DevComponent {

}
