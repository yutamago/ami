// export type UserModel = {
//   username: string;
//   displayName: string;
//   avatarSmall?: string;
// }

import {UsersResource} from "../../kitsu/schemas/resources/users.resource";

export enum AmiMainProfileType {
  AniList = 'AniList',
  Kitsu = 'Kitsu',
  MyAnimeList = 'MyAnimeList'
}

const AmiUserProfile_MainProfileType_StorageKey = 'AmiUserProfile_MainProfileType';
const AmiUserProfile_Profiles_Kitsu_StorageKey = 'AmiUserProfile_Profiles_Kitsu';
const AmiUserProfile_Profiles_MyAnimeList_StorageKey = 'AmiUserProfile_Profiles_MyAnimeList';
const AmiUserProfile_Profiles_AniList_StorageKey = 'AmiUserProfile_Profiles_AniList';

export class AmiUserProfileModel {

  mainProfileType: AmiMainProfileType = AmiMainProfileType.Kitsu;
  readonly profiles: {
    kitsu?: UsersResource,
    myAnimeList?: null,
    aniList?: null
  } = {};

  constructor() {
    this.loadFromStorage();
  }

  loadFromStorage() {
    this.mainProfileType = (localStorage.getItem(AmiUserProfile_MainProfileType_StorageKey) as AmiMainProfileType) ?? AmiMainProfileType.Kitsu;
    this.profiles.kitsu = JSON.parse(localStorage.getItem(AmiUserProfile_Profiles_Kitsu_StorageKey) ?? 'null') as UsersResource;
    this.profiles.aniList = JSON.parse(localStorage.getItem(AmiUserProfile_Profiles_AniList_StorageKey) ?? 'null');
    this.profiles.myAnimeList = JSON.parse(localStorage.getItem(AmiUserProfile_Profiles_MyAnimeList_StorageKey) ?? 'null');
  }

  saveToStorage() {
    if(this.mainProfileType) {
      localStorage.setItem(AmiUserProfile_MainProfileType_StorageKey, this.mainProfileType);
    } else {
      localStorage.removeItem(AmiUserProfile_MainProfileType_StorageKey)
    }

    if(this.profiles.kitsu) {
      localStorage.setItem(AmiUserProfile_Profiles_Kitsu_StorageKey, JSON.stringify(this.profiles.kitsu));
    } else {
      localStorage.removeItem(AmiUserProfile_Profiles_Kitsu_StorageKey)
    }

    if(this.profiles.aniList) {
      localStorage.setItem(AmiUserProfile_Profiles_AniList_StorageKey, JSON.stringify(this.profiles.aniList));
    } else {
      localStorage.removeItem(AmiUserProfile_Profiles_AniList_StorageKey)
    }

    if(this.profiles.myAnimeList) {
      localStorage.setItem(AmiUserProfile_Profiles_MyAnimeList_StorageKey, JSON.stringify(this.profiles.myAnimeList));
    } else {
      localStorage.removeItem(AmiUserProfile_Profiles_MyAnimeList_StorageKey)
    }
  }

  get mainProfile(): UsersResource | null {
    switch (this.mainProfileType) {
      case AmiMainProfileType.AniList:
        return this.profiles.aniList ?? null;
      case AmiMainProfileType.Kitsu:
        return this.profiles.kitsu ?? null;
      case AmiMainProfileType.MyAnimeList:
        return this.profiles.myAnimeList ?? null;
      default:
        return null;
    }
  }

  get displayName(): string | null {
    switch (this.mainProfileType) {
      case AmiMainProfileType.AniList:
        return null;
      case AmiMainProfileType.Kitsu:
        return this.profiles.kitsu?.attributes?.name ?? null;
      case AmiMainProfileType.MyAnimeList:
        return null;
      default:
        return null;
    }
  }
  get username(): string | null {
    switch (this.mainProfileType) {
      case AmiMainProfileType.AniList:
        return null;
      case AmiMainProfileType.Kitsu:
        return this.profiles.kitsu?.attributes?.email ?? null;
      case AmiMainProfileType.MyAnimeList:
        return null;
      default:
        return null;
    }
  }

  get avatar(): {
    tiny?: string,
    large?: string,
  } | null {
    switch (this.mainProfileType) {
      case AmiMainProfileType.AniList:
        return null;
      case AmiMainProfileType.Kitsu: {
        const avatar = this.profiles.kitsu?.attributes?.avatar;
        if (!avatar) return null;

        return {
          tiny: avatar.tiny,
          large: avatar.large
        }
      }
      case AmiMainProfileType.MyAnimeList:
        return null;
      default:
        return null;
    }
  }

}
