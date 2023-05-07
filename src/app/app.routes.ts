import { Routes } from '@angular/router';

import {PageNotFoundComponent} from './views/page-not-found/page-not-found.component';
import {LibraryComponent} from "./views/library/library.component";
import {SettingsComponent} from "./views/settings/settings.component";
import {StatisticsComponent} from "./views/statistics/statistics.component";
import {SearchComponent} from "./views/search/search.component";
import {NewReleasesComponent} from "./views/new-releases/new-releases.component";
import {DiscoverComponent} from "./views/discover/discover.component";
import {DevComponent} from "./views/dev/dev.component";
import {HomeComponent} from "./views/home/home.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'library',
    component: LibraryComponent
  },
  {
    path: 'discover',
    component: DiscoverComponent
  },
  {
    path: 'new-releases',
    component: NewReleasesComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'statistics',
    component: StatisticsComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'dev',
    component: DevComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
