import { Routes } from '@angular/router';

import {PageNotFoundComponent} from './shared/components/page-not-found/page-not-found.component';
import {LibraryComponent} from "./library/library.component";
import {SettingsComponent} from "./settings/settings.component";
import {StatisticsComponent} from "./statistics/statistics.component";
import {SearchComponent} from "./search/search.component";
import {NewReleasesComponent} from "./new-releases/new-releases.component";
import {DiscoverComponent} from "./discover/discover.component";
import {DevComponent} from "./dev/dev.component";
import {HomeComponent} from "./home/home.component";

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
