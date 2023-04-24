import {inject, Injectable} from '@angular/core';
import {AuthConfig} from "angular-oauth2-oidc";
import {HttpHeaders} from "@angular/common/http";
import {KitsuAuthService} from "./kitsu/kitsu-auth.service";
import {UsersService} from "../../api/kitsu-api";
import {KitsuFetchResponse, KitsuUserData, KitsuUserService} from "./kitsu/kitsu-user.service";

const KitsuOAuthConfig: AuthConfig = {
  tokenEndpoint: 'https://kitsu.io/api/oauth/token',
  clientId: 'dd031b32d2f56c990b1425efe6c42ad847e7fe3ab46bf1299f05ecd856bdb7dd',
  scope: '',
  showDebugInformation: true,
  oidc: false,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  kitsuAuthService = inject(KitsuAuthService);
  kitsuUserService = inject(KitsuUserService);

  kitsuProfile?: KitsuUserData;

  constructor() {
    this.init().then();
  }

  private async init() {

    if(this.isLoggedIn) {
      this.kitsuProfile = (await this.kitsuUserService.getSelf()).data[0];
    }
  }

  get isLoggedIn() {
    return this.kitsuAuthService.hasValidAccessToken;
  }

  async loginKitsu(username: string, password: string) {
    try {
      await this.kitsuAuthService.fetchAccessToken(username, password);
      this.kitsuProfile = (await this.kitsuUserService.getSelf()).data[0];
    } catch(err) {
      console.log('couldnt login to Kitsu', err);
    }

  }

  logoutKitsu() {
    this.kitsuAuthService.clearToken();
  }
}
