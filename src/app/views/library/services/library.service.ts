import {inject, Injectable} from '@angular/core';
import {KitsuLibraryEntriesService} from "../../../apis/kitsu/services/kitsu-library-entries.service";
import {AuthService} from "../../../apis/general/services/auth.service";
import {BehaviorSubject} from "rxjs";
import {AnimeResource} from "../../../apis/kitsu/schemas/resources/anime.resource";
import {ResourceTypesEnum} from "../../../apis/kitsu/schemas/resource-types.enum";
import {AmiMainProfileType} from "../../../apis/general/models/user.model";
import {AnimeModel, AnimeModelTransformer} from "../../../apis/general/models/anime.model";
import {KitsuIdTypeSchema} from "../../../apis/kitsu/schemas/kitsu-id-type.schema";


@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  kitsuLibraryEntriesService = inject(KitsuLibraryEntriesService);
  authService = inject(AuthService);

  public anime$ = new BehaviorSubject<AnimeModel[]>([]);
  // public libraryEntries$ = new BehaviorSubject<LibraryEntriesResource[] | null>(null);
  // public libraryEntriesAnime$ = new BehaviorSubject<AnimeResource[] | null>(null);

  public async load(): Promise<void> {
    switch (this.authService.userProfile$.value.mainProfileType) {
      case AmiMainProfileType.AniList:
        return await this.loadAniList();
      case AmiMainProfileType.Kitsu:
        return await this.loadKitsu();
      case AmiMainProfileType.MyAnimeList:
        return await this.loadMyAnimeList();
    }
  }

  private async fetchKitsuLibraryEntriesMapArray(limit: number, offset: number) {
    const libraryEntries = await this.kitsuLibraryEntriesService.getMany({
      filter: {
        userId: this.authService.userProfile$.value.profiles.kitsu?.id ?? 0
      },
      sort: 'status,-progressed_at',
      page: {
        offset: offset,
        limit: limit
      },
      include: 'anime'
    });

    const libraryEntriesResources = libraryEntries.data;

    const animeResourcesArray = (libraryEntries.included?.filter((x: KitsuIdTypeSchema<ResourceTypesEnum>) => x.type === ResourceTypesEnum.anime) ?? []) as AnimeResource[];
    const animeResources = new Map(animeResourcesArray?.map(x => [x.id ?? 'null', x]) ?? []);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return libraryEntriesResources.filter((x: any) => animeResources.get(x.relationships?.anime?.data?.id ?? 0)).map((x: any) => AnimeModelTransformer.fromKitsu(animeResources.get(x.relationships?.anime?.data?.id ?? 0)!, x));
  }

  private async loadKitsu() {
    if(!this.authService.isLoggedInKitsu$.value || !this.authService.userProfile$.value.profiles.kitsu?.id) {
      console.log('not logged in yet');
      return;
    }

    const entries = [
      ...(await this.fetchKitsuLibraryEntriesMapArray(20, 0)),
      ...(await this.fetchKitsuLibraryEntriesMapArray(20, 20)),
      ...(await this.fetchKitsuLibraryEntriesMapArray(20, 40)),
      ...(await this.fetchKitsuLibraryEntriesMapArray(20, 60)),
    ];

    this.anime$.next(entries);
    // console.log('Loaded Animes: ', this.anime$.value)
  }

  private async loadAniList() {
    throw new Error('Not implemented')
  }

  private async loadMyAnimeList() {
    throw new Error('Not implemented')
  }
}
