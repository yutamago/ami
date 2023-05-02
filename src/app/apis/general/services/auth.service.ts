import {Injectable} from '@angular/core';
import {KitsuOAuthService} from "../../kitsu/services/kitsu-o-auth.service";
import {KitsuUsersService} from "../../kitsu/services/kitsu-users.service";
import {UsersResource} from "../../kitsu/schemas/resources/users.resource";
import {BehaviorSubject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  kitsuProfile$ = new BehaviorSubject<UsersResource | null>(null);

  constructor(private kitsuAuthService: KitsuOAuthService, private kitsuUserService: KitsuUsersService) {
    this.init().then();
  }

  private async init() {

    if (this.isLoggedIn) {

      this.kitsuProfile$.next((await this.kitsuUserService.getSelf()).data[0]);
    }
  }

  get isLoggedIn(): boolean {
    return this.kitsuAuthService.hasValidAccessToken;
  }

  async loginKitsu(username: string, password: string) {
    try {
      await this.kitsuAuthService.fetchAccessToken(username, password);
      this.kitsuProfile$.next((await this.kitsuUserService.getSelf()).data[0]);
    } catch (err) {
      console.log('couldnt login to Kitsu', err);
    }

  }

  logoutKitsu() {
    this.kitsuAuthService.clearToken();
    this.kitsuProfile$.next(null);
  }
}
