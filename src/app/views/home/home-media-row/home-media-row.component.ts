import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeMediaItem} from "../home.component";

@Component({
  selector: 'app-home-media-row',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-media-row.component.html',
  styleUrls: ['./home-media-row.component.scss']
})
export class HomeMediaRowComponent {
  @Input() label!: string;
  @Input() items!: HomeMediaItem[];
}
