import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {lastValueFrom} from "rxjs";

const RefreshTokenNSecondsBeforeExpiry = 60;

const KitsuOauthStorageBase = 'kitsu_';

const KitsuOAuthConfig = {
  accessTokenStorageKey: KitsuOauthStorageBase + 'accessToken',
  accessTokenCreatedAtStorageKey: KitsuOauthStorageBase + 'accessTokenCreatedAt',
  accessTokenExpirationStorageKey: KitsuOauthStorageBase + 'accessTokenExpiration',
  refreshTokenStorageKey: KitsuOauthStorageBase + 'refreshToken',

  tokenEndpoint: 'https://kitsu.io/api/oauth/token',
  clientId: 'dd031b32d2f56c990b1425efe6c42ad847e7fe3ab46bf1299f05ecd856bdb7dd',
}

type KitsuLoginResponse = {
  access_token: string, // Token used in Authorization header
  created_at: number,
  expires_in: number, // Seconds until the access_token expires (30 days default)
  refresh_token: string, // Token used to get a new access_token
  scope?: string,
  token_type: 'bearer'
}

type KitsuLoginErrorResponseType = 'invalid_request' |
  'invalid_client' |
  'invalid_grant' |
  'invalid_scope' |
  'unauthorized_client' |
  'unsupported_grant_type';

type KitsuLoginErrorResponse = {
  error: KitsuLoginErrorResponseType,
  error_description: string
}

@Injectable({
  providedIn: 'root'
})
export class KitsuAuthService {
  private readonly http = inject(HttpClient);

  protected accessToken: string | null = null;
  protected accessTokenCreatedAt: number | null = null;
  protected accessTokenExpiration: number | null = null;
  protected refreshToken: string | null = null;

  protected refreshTimeout?: string | number | NodeJS.Timeout;

  public get authorizationHeader(): HttpHeaders | null {
    if (!this.accessToken) return null;

    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.accessToken,
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    });
  }

  constructor() {
    this.loadAccessTokenFromStorage();
    this.setupAutoRefresh();
  }

  protected get accessTokenRefreshTime(): number | null {
    if (this.accessTokenExpiration === null)
      return null;

    return this.accessTokenExpiration - RefreshTokenNSecondsBeforeExpiry;
  }

  protected get now() {
    return Date.now() / 1000;
  }

  public get hasValidAccessToken() {
    return this.accessToken &&
      this.accessToken.length > 0 &&
      this.accessTokenExpiration &&
      this.accessTokenExpiration > this.now
  }

  public get canRefreshAccessToken() {
    return this.refreshToken && this.refreshToken.length > 0;
  }


  protected loadAccessTokenFromStorage() {
    this.accessToken = localStorage.getItem(KitsuOAuthConfig.accessTokenStorageKey);
    this.refreshToken = localStorage.getItem(KitsuOAuthConfig.refreshTokenStorageKey);

    const accessTokenCreatedAt = localStorage.getItem(KitsuOAuthConfig.accessTokenCreatedAtStorageKey);
    this.accessTokenCreatedAt = accessTokenCreatedAt !== null ? Number.parseInt(accessTokenCreatedAt) : null;

    const accessTokenExpiration = localStorage.getItem(KitsuOAuthConfig.accessTokenExpirationStorageKey);
    this.accessTokenExpiration = accessTokenExpiration !== null ? Number.parseInt(accessTokenExpiration) : null;
  }

  protected saveAccessTokenToStorage(loginResponse: KitsuLoginResponse) {
    const expirationDate = this.now + loginResponse.expires_in;

    localStorage.setItem(KitsuOAuthConfig.accessTokenStorageKey, loginResponse.access_token);
    localStorage.setItem(KitsuOAuthConfig.refreshTokenStorageKey, loginResponse.refresh_token);
    localStorage.setItem(KitsuOAuthConfig.accessTokenCreatedAtStorageKey, String(loginResponse.created_at));
    localStorage.setItem(KitsuOAuthConfig.accessTokenExpirationStorageKey, String(expirationDate));
  }
  protected resetAccessTokenToStorage() {
    localStorage.removeItem(KitsuOAuthConfig.accessTokenStorageKey);
    localStorage.removeItem(KitsuOAuthConfig.refreshTokenStorageKey);
    localStorage.removeItem(KitsuOAuthConfig.accessTokenCreatedAtStorageKey);
    localStorage.removeItem(KitsuOAuthConfig.accessTokenExpirationStorageKey);
  }

  /**
   * Login
   * @param username
   * @param password
   */
  async fetchAccessToken(username: string, password: string) {
    try {
      const loginResponse = await lastValueFrom(this.http.post<KitsuLoginResponse>(KitsuOAuthConfig.tokenEndpoint, {
          grant_type: 'password',
          username: username,
          password: password,
        },
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        }
      ));
      console.log('Successfully logged in: ', loginResponse);
      this.saveAccessTokenToStorage(loginResponse);
      this.loadAccessTokenFromStorage();
      this.setupAutoRefresh();
    } catch (err) {
      console.log('Error while trying to login: ', err);

      const httpError = err as HttpErrorResponse;
      try {
        const kitsuError = JSON.parse(httpError.message) as KitsuLoginErrorResponse;
        console.log('KITSU Error: ', kitsuError);
      } catch(err2) {
        // ignore
      }

      throw err;
    }
  }

  /**
   * Refresh login. Normally not necessary, because the service refreshes automatically.
   */
  public async refreshAccessToken() {
    if (!this.canRefreshAccessToken) return;

    this.clearAutoRefresh();

    try {
      const refreshResponse = await lastValueFrom(this.http.post<KitsuLoginResponse>(KitsuOAuthConfig.tokenEndpoint, {
          grant_type: 'refresh_token',
          refresh_token: this.refreshToken,
        },
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        }
      ));
      console.log('Successfully logged in: ', refreshResponse);
      this.saveAccessTokenToStorage(refreshResponse);
      this.loadAccessTokenFromStorage();
      this.setupAutoRefresh();
    } catch (err) {
      console.log('Error while trying to refresh token: ', err);

      const httpError = err as HttpErrorResponse;
      try {
        const kitsuError = JSON.parse(httpError.message) as KitsuLoginErrorResponse;
        console.log('KITSU Error: ', kitsuError);
      } catch(err2) {
        // ignore
      }

    }
  }

  protected setupAutoRefresh() {
    if (!this.canRefreshAccessToken) return;

    this.clearAutoRefresh();

    const refreshTime = this.accessTokenRefreshTime;
    if (refreshTime === null) return;

    const timeoutTime = (refreshTime - this.now) * 1000;
    this.refreshTimeout = setTimeout(() => {
      this.refreshAccessToken().then();
    }, timeoutTime)
  }

  protected clearAutoRefresh() {
    if (!this.refreshTimeout) return;

    clearTimeout(this.refreshTimeout);
    this.refreshTimeout = undefined;
  }

  public clearToken() {
    this.clearAutoRefresh();
    this.resetAccessTokenToStorage();
    this.accessToken = null;
    this.accessTokenCreatedAt = null;
    this.accessTokenExpiration = null;
    this.refreshToken = null;
  }
}
