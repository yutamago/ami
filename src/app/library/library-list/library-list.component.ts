import {Component, HostListener, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
// import {MediaItem} from "../library.component";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatCheckboxChange, MatCheckboxModule} from "@angular/material/checkbox";
import {SelectionModel} from "@angular/cdk/collections";
import {ProgressCellComponent} from "./cell-components/progress-cell/progress-cell.component";
import {AnimeModel} from "../../apis/general/models/anime.model";

@Component({
  selector: 'app-library-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCheckboxModule, ProgressCellComponent],
  templateUrl: './library-list.component.html',
  styleUrls: ['./library-list.component.scss']
})
export class LibraryListComponent implements OnChanges {
  @Input() items: AnimeModel[] = [];
  dataSource?: MatTableDataSource<AnimeModel>;
  displayedColumns = [
    'select',
    'title',
    'progress',
    'rating',
    'avgRating',
    'mediaType',
    'season',
    'started',
    'completed',
    'lastUpdated',
  ];
  selection = new SelectionModel<AnimeModel>(true, []);

  lastSelectionIndex?: number;
  lastSelectionMode?: boolean;
  activeRow?: AnimeModel;

  private isShiftPressed= false;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['items']) {
      this.dataSource = new MatTableDataSource<AnimeModel>(this.items);
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource?.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    this.lastSelectionIndex = undefined;
    this.lastSelectionMode = undefined;

    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...(this.dataSource?.data ?? []));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: AnimeModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} ${row.meta?.canonicalTitle}`;
  }

  selectRow(row: AnimeModel, change: MatCheckboxChange) {
    console.log('CHANGE: ', {
      change: change,
      isShiftPressed: this.isShiftPressed,
      lastSelectionMode: this.lastSelectionMode,
      lastSelectionIndex: this.lastSelectionIndex
    });
    if(!change) return;

    this.selection.toggle(row);

    if(this.isShiftPressed && change.checked === this.lastSelectionMode && this.lastSelectionIndex !== undefined) {
      const newSelectionIndex = this.dataSource?.data.indexOf(row) ?? 0;
      const minIndex = Math.min(newSelectionIndex, this.lastSelectionIndex) + 1;
      const maxIndex = Math.max(newSelectionIndex, this.lastSelectionIndex) - 1;

      if(maxIndex >= minIndex) {
        const toSelect = this.dataSource?.data.filter((x, i) => i >= minIndex && i <= maxIndex) ?? [];

        if(change.checked) {
          this.selection.select(...toSelect);
        } else {
          this.selection.deselect(...toSelect);
        }
      }
    }

    this.lastSelectionIndex = this.dataSource?.data.indexOf(row);
    this.lastSelectionMode = change.checked;
  }

  // Track the Shift Button
  @HostListener('window:keydown.shift', ['$event'])
  @HostListener('window:keyup.shift', ['$event'])
  onShiftUpOrDown(event: KeyboardEvent) {
    this.isShiftPressed = event.shiftKey;
  }
}
