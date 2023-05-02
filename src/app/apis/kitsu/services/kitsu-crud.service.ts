import {inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {KitsuOAuthService} from "./kitsu-o-auth.service";
import {lastValueFrom} from "rxjs";
import {KitsuFetchManyResponse} from "../models/responses/kitsu-fetch-many.response";
import {KitsuApiUtil} from "./kitsu-api.util";
import {ResourceTypesEnum} from "../schemas/resource-types.enum";
import {CommonParameters} from "./common.parameters";
import {KitsuIdTypeSchema} from "../schemas/kitsu-id-type.schema";

export abstract class KitsuCrudService<DataType extends KitsuIdTypeSchema<ResourceType>, ResourceType extends ResourceTypesEnum, AttributesType> {
  // protected readonly ROUTE: string = '';

  http = inject(HttpClient);
  auth = inject(KitsuOAuthService);

  protected constructor(protected readonly ROUTE: string) {
  }

  public async getMany(parameters?: CommonParameters) {
    const authHeader = this.auth.authorizationHeader;
    if (!authHeader) throw new Error('not logged in');

    const params = KitsuApiUtil.ToHttpParams(parameters);

    return await lastValueFrom(this.http.get<KitsuFetchManyResponse<DataType, ResourceType>>(this.ROUTE, {
      params: params,
      headers: authHeader,
    }));
  }

  public async getSingle(id: string, parameters?: CommonParameters) {
    const authHeader = this.auth.authorizationHeader;
    if (!authHeader) throw new Error('not logged in');

    const params = KitsuApiUtil.ToHttpParams(parameters);

    return await lastValueFrom(this.http.get<KitsuFetchManyResponse<DataType, ResourceType>>(`${this.ROUTE}/${encodeURIComponent(id)}`, {
      params: params,
      headers: authHeader,
    }));
  }

  public async create(body: AttributesType, parameters?: CommonParameters) {
    const authHeader = this.auth.authorizationHeader;
    if (!authHeader) throw new Error('not logged in');

    const params = KitsuApiUtil.ToHttpParams(parameters);

    return await lastValueFrom(this.http.post<KitsuFetchManyResponse<DataType, ResourceType>>(this.ROUTE, body, {
      params: params,
      headers: authHeader,
    }));
  }

  public async update(id: string, body: AttributesType, parameters?: CommonParameters) {
    const authHeader = this.auth.authorizationHeader;
    if (!authHeader) throw new Error('not logged in');

    const params = KitsuApiUtil.ToHttpParams(parameters);

    return await lastValueFrom(this.http.patch<KitsuFetchManyResponse<DataType, ResourceType>>(`${this.ROUTE}/${encodeURIComponent(id)}`, body, {
      params: params,
      headers: authHeader,
    }));
  }

  public async delete(id: string, body: AttributesType, parameters?: CommonParameters) {
    const authHeader = this.auth.authorizationHeader;
    if (!authHeader) throw new Error('not logged in');

    const params = KitsuApiUtil.ToHttpParams(parameters);

    return await lastValueFrom(this.http.delete<KitsuFetchManyResponse<DataType, ResourceType>>(`${this.ROUTE}/${encodeURIComponent(id)}`, {
      params: params,
      headers: authHeader,
    }));
  }
}
