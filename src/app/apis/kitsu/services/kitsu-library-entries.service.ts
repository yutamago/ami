import {Injectable} from '@angular/core';
import {KitsuConfig} from "../kitsu.config";
import {ResourceTypesEnum} from "../schemas/resource-types.enum";
import {KitsuCrudService} from "./kitsu-crud.service";
import {LibraryEntriesResource, LibraryEntriesResourceAttributes} from "../schemas/resources/library-entry.resource";

@Injectable({
  providedIn: 'root'
})
export class KitsuLibraryEntriesService extends KitsuCrudService<LibraryEntriesResource, ResourceTypesEnum.libraryEntries, LibraryEntriesResourceAttributes> {
  constructor() {
    super(KitsuConfig.ApiBaseUrl + 'library-entries');
  }

}
