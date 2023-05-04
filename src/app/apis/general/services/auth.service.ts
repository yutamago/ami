import {Injectable} from '@angular/core';
import {KitsuOAuthService} from "../../kitsu/services/kitsu-o-auth.service";
import {KitsuUsersService} from "../../kitsu/services/kitsu-users.service";
import {BehaviorSubject} from "rxjs";
import {AmiMainProfileType, AmiUserProfileModel} from "../models/user.model";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userProfile$ = new BehaviorSubject<AmiUserProfileModel>(new AmiUserProfileModel());
  isLoggedInKitsu$ = new BehaviorSubject<boolean>(false);

  constructor(private kitsuAuthService: KitsuOAuthService, private kitsuUserService: KitsuUsersService) {
    this.init().then();
  }

  private async init() {

    if (this.kitsuAuthService.hasValidAccessToken) {
      this.userProfile$.value.profiles.kitsu = (await this.kitsuUserService.getSelf()).data[0];
      this.userProfile$.value.mainProfileType ??= AmiMainProfileType.Kitsu;

      this.isLoggedInKitsu$.next(true);
      notify(this.userProfile$);
    }
  }

  get isLoggedIn(): boolean {
    return this.kitsuAuthService.hasValidAccessToken;
  }

  async loginKitsu(username: string, password: string) {
    try {
      await this.kitsuAuthService.fetchAccessToken(username, password);
      this.userProfile$.value.profiles.kitsu = (await this.kitsuUserService.getSelf()).data[0];
      this.userProfile$.value.mainProfileType ??= AmiMainProfileType.Kitsu;

      notify(this.userProfile$);
      this.isLoggedInKitsu$.next(true);
    } catch (err) {
      console.log('couldnt login to Kitsu', err);
    }
  }

  logoutKitsu() {
    this.kitsuAuthService.clearToken();
    this.userProfile$.value.profiles.kitsu = undefined;

    this.isLoggedInKitsu$.next(false);
    notify(this.userProfile$);
  }
}

/**
 * Sends the same value again, to notify all subscribers of a change within the value object.
 * @param subject
 */
function notify(subject: BehaviorSubject<any>) {
  subject.next(subject.value);
}
