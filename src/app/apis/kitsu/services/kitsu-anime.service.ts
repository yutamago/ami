import {Injectable} from '@angular/core';
import {KitsuConfig} from "../kitsu.config";
import {ResourceTypesEnum} from "../schemas/resource-types.enum";
import {KitsuCrudService} from "./kitsu-crud.service";
import {AnimeResource, AnimeResourceAttributes} from "../schemas/resources/anime.resource";

@Injectable({
  providedIn: 'root'
})
export class KitsuAnimeService extends KitsuCrudService<AnimeResource, ResourceTypesEnum.anime, AnimeResourceAttributes> {
  constructor() {
    super(KitsuConfig.ApiBaseUrl + 'anime');
  }

}
