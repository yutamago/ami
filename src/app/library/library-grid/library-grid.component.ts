import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MediaItem} from "../library.component";

@Component({
  selector: 'app-library-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './library-grid.component.html',
  styleUrls: ['./library-grid.component.scss']
})
export class LibraryGridComponent {
  @Input() items: MediaItem[] = [];
}
