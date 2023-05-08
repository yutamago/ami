import {Component, inject, OnInit} from '@angular/core';
import {MatTabsModule} from "@angular/material/tabs";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatRippleModule} from "@angular/material/core";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {LibraryGridComponent} from "./library-grid/library-grid.component";
import {LibraryListComponent} from "./library-list/library-list.component";
import {LibraryService} from "./services/library.service";
import {AuthService} from "../../apis/general/services/auth.service";

enum TabState {
  All,
  CurrentlyWatching,
  PlanToWatch,
  Completed,
  OnHold,
  Dropped
}

export enum AnimeMangaToggle {
  Anime,
  Manga
}

enum ViewMode {
  Grid,
  List
}

// enum MediaType {
//   TV,
//   Movie
// }

// export type MediaItem = {
//   id: string;
//   title: string;
//   thumbnail?: string;
//   progress: { current: number, max?: number, available?: number, downloaded?: number };
//   rating?: number,
//   avgRating?: number,
//   mediaType?: MediaType,
//   season?: string,
//   started?: Date,
//   completed?: Date,
//   lastUpdated?: Date,
// }

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
  imports: [
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    NgForOf,
    LibraryGridComponent,
    LibraryListComponent,
    NgIf,
    AsyncPipe
  ],
  standalone: true
})
export class LibraryComponent implements OnInit {
  libraryService = inject(LibraryService);
  authService = inject(AuthService);

  tabState: TabState = TabState.All;
  animeMangaToggle: AnimeMangaToggle = AnimeMangaToggle.Anime;
  viewMode: ViewMode = ViewMode.List;

  TabState = TabState;
  AnimeMangaToggle = AnimeMangaToggle;
  ViewMode = ViewMode;

  tabStateList = [
    {id: TabState.All, label: 'All'},
    {id: TabState.CurrentlyWatching, label: 'Currently Watching'},
    {id: TabState.PlanToWatch, label: 'Plan to Watch'},
    {id: TabState.Completed, label: 'Completed'},
    {id: TabState.OnHold, label: 'On Hold'},
    {id: TabState.Dropped, label: 'Dropped'},
  ];

  ngOnInit(): void {
    this.authService.isLoggedInKitsu$.subscribe(x => {
      if(!x) return;

      this.libraryService.load().then().catch();
    });
  }
}
