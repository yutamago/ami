import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { AnimeService } from './api/anime.service';
import { CategoriesService } from './api/categories.service';
import { CharactersService } from './api/characters.service';
import { CommentsService } from './api/comments.service';
import { GroupsService } from './api/groups.service';
import { MangaService } from './api/manga.service';
import { MediaFollowsService } from './api/mediaFollows.service';
import { MediaRelationsService } from './api/mediaRelations.service';
import { PostsService } from './api/posts.service';
import { ProducersStaffService } from './api/producersStaff.service';
import { ReactionsService } from './api/reactions.service';
import { ReportsService } from './api/reports.service';
import { SiteAnnouncementsService } from './api/siteAnnouncements.service';
import { StreamersService } from './api/streamers.service';
import { UserLibrariesService } from './api/userLibraries.service';
import { UsersService } from './api/users.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    AnimeService,
    CategoriesService,
    CharactersService,
    CommentsService,
    GroupsService,
    MangaService,
    MediaFollowsService,
    MediaRelationsService,
    PostsService,
    ProducersStaffService,
    ReactionsService,
    ReportsService,
    SiteAnnouncementsService,
    StreamersService,
    UserLibrariesService,
    UsersService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
