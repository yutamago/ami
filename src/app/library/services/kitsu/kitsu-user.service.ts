import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {KitsuAuthService} from "./kitsu-auth.service";
import {lastValueFrom} from "rxjs";
import {
  KitsuDataLinks,
  KitsuUserDataAttributes,
  KitsuUserDataRelationships,
  UsersService
} from "../../../api/kitsu-api";

export const KITSU_API_BASE = 'https://kitsu.io/api/edge/';
const ROUTE = KITSU_API_BASE + 'users';


export type KitsuUserData = {
  id: string;
  type: string;
  links?: KitsuDataLinks;
  attributes?: KitsuUserDataAttributes;
  relationships?: KitsuUserDataRelationships;
}

export type KitsuFetchResponse<T> = {
  data: T[],
  links?: {
    first?: string,
    last?: string,
  },
  meta?: {
    count?: number
  }
}

@Injectable({
  providedIn: 'root'
})
export class KitsuUserService {
  http = inject(HttpClient);
  auth = inject(KitsuAuthService);
  user = inject(UsersService);

  self?: KitsuUserData;

  constructor() {
  }

  async getSelf() {
    const authHeader = this.auth.authorizationHeader;
    if (!authHeader) throw new Error('not logged in');

    const params = new HttpParams()
      .set('filter[self]', true)
      .set('include', 'userRoles.role,userRoles.user');


    return await lastValueFrom(this.http.get<KitsuFetchResponse<KitsuUserData>>(ROUTE, {
      params: params,
      headers: authHeader,
    }));
  }
}
