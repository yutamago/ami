import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatRippleModule} from "@angular/material/core";
import {AnimeModel} from "../../../../apis/general/models/anime.model";

@Component({
  selector: 'app-progress-cell',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatRippleModule],
  templateUrl: './progress-cell.component.html',
  styleUrls: ['./progress-cell.component.scss']
})
export class ProgressCellComponent {
  @Input() item!: AnimeModel;
}
