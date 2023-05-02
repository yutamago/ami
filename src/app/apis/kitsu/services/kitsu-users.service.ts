import {Injectable} from '@angular/core';
import {UsersResource, UsersResourceAttributes} from "../schemas/resources/users.resource";
import {KitsuConfig} from "../kitsu.config";
import {ResourceTypesEnum} from "../schemas/resource-types.enum";
import {KitsuCrudService} from "./kitsu-crud.service";

@Injectable({
  providedIn: 'root'
})
export class KitsuUsersService extends KitsuCrudService<UsersResource, ResourceTypesEnum.users, UsersResourceAttributes> {
  constructor() {
    super(KitsuConfig.ApiBaseUrl + 'users');
  }

  async getSelf() {
    return await this.getMany({
      filter: {
        self: true
      },
      include: 'userRoles.role,userRoles.user'
    });
  }
}
