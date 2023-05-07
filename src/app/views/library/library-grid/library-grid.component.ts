import {Component, inject, Input} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {AuthService} from "../../../apis/general/services/auth.service";
import {MatButtonModule} from "@angular/material/button";
import {AnimeModel} from "../../../apis/general/models/anime.model";

@Component({
  selector: 'app-library-grid',
  standalone: true,
  imports: [CommonModule, MatButtonModule, NgOptimizedImage],
  templateUrl: './library-grid.component.html',
  styleUrls: ['./library-grid.component.scss']
})
export class LibraryGridComponent {
  @Input() items: AnimeModel[] = [];

  authService = inject(AuthService)
}
