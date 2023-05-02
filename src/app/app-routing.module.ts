import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './shared/components';

import {HomeRoutingModule} from './home/home-routing.module';
import {LibraryComponent} from "./library/library.component";
import {SettingsComponent} from "./settings/settings.component";
import {StatisticsComponent} from "./statistics/statistics.component";
import {SearchComponent} from "./search/search.component";
import {NewReleasesComponent} from "./new-releases/new-releases.component";
import {DiscoverComponent} from "./discover/discover.component";
import {DevComponent} from "./dev/dev.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
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

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {}),
    HomeRoutingModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
