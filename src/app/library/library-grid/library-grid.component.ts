import {Component, inject, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MediaItem} from "../library.component";
import {AuthService} from "../../apis/general/services/auth.service";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-library-grid',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './library-grid.component.html',
  styleUrls: ['./library-grid.component.scss']
})
export class LibraryGridComponent {
  @Input() items: MediaItem[] = [];

  authService = inject(AuthService)
}
