import {inject, Injectable, OnInit} from '@angular/core';
import {KitsuAnimeService} from "../../apis/kitsu/services/kitsu-anime.service";


@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  kitsuAnimeService = inject(KitsuAnimeService);


  constructor() {
    this.init().then();
  }

  private async init(): Promise<void> {
    const anime = await this.kitsuAnimeService.getMany();
    console.log('Loaded Animes: ', anime.data.map(x => x.attributes?.canonicalTitle))
  }


}
