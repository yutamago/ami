import {inject, Injectable} from '@angular/core';
import {KitsuLibraryEntriesService} from "../../apis/kitsu/services/kitsu-library-entries.service";
import {AuthService} from "../../apis/general/services/auth.service";
import {BehaviorSubject} from "rxjs";
import {LibraryEntriesResource} from "../../apis/kitsu/schemas/resources/library-entry.resource";
import {AnimeResource} from "../../apis/kitsu/schemas/resources/anime.resource";
import {ResourceTypesEnum} from "../../apis/kitsu/schemas/resource-types.enum";


@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  kitsuLibraryEntriesService = inject(KitsuLibraryEntriesService);
  authService = inject(AuthService);

  public libraryEntries$ = new BehaviorSubject<LibraryEntriesResource[] | null>(null);
  public libraryEntriesAnime$ = new BehaviorSubject<AnimeResource[] | null>(null);

  public async load(): Promise<void> {
    if(!this.authService.isLoggedIn || !this.authService.kitsuProfile$.value)
      console.log('not logged in yet');

    const libraryEntries = await this.kitsuLibraryEntriesService.getMany({
      filter: {
        userId: this.authService.kitsuProfile$.value?.id ?? 0
      },
      include: 'anime'
    });

    this.libraryEntries$.next(libraryEntries.data);
    this.libraryEntriesAnime$.next(libraryEntries.included?.filter(x => x.type === ResourceTypesEnum.anime) as AnimeResource[]);
    console.log('Loaded Animes: ', this.libraryEntriesAnime$.value)
  }

}
