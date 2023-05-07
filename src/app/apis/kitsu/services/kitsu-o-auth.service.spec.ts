import {TestBed} from '@angular/core/testing';

import {KitsuLoginResponse, KitsuOAuthConfig, KitsuOAuthService} from './kitsu-o-auth.service';
import {HttpClient, provideHttpClient} from "@angular/common/http";
import {initMatIconsForSpec} from "../../../../test.util";
import {HttpClientTestingModule, HttpTestingController, provideHttpClientTesting} from "@angular/common/http/testing";

function loginTest(service: KitsuOAuthService, httpTestingController: HttpTestingController) {
  login(service, 'spec_username', 'spec_password').then(() => {
    expect(service.authorizationHeader/*, 'authorizationHeader set'*/).toBeTruthy();
    expect(service.hasValidAccessToken/*, 'has valid AccessToken'*/).toBeTruthy();
    expect(service.accessToken$.value/*, 'accessToken$ set'*/).toBeTruthy();
    expect(service.refreshToken$.value/*, 'refreshToken$ set'*/).toBeTruthy();
    expect(service.accessTokenExpiration$.value/*, 'accessTokenExpiration$ set'*/).toBeTruthy();
    expect(service.accessTokenCreatedAt$.value/*, 'accessTokenCreatedAt$ set'*/).toBeTruthy();
    expect(service.canRefreshAccessToken/*, 'can refresh AccessToken'*/).toBeTruthy();

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const header = service.authorizationHeader!;

    expect(header.has('Authorization')/*, 'has exactly one header'*/).toBeTrue();
    expect(header.get(header.keys()[0])?.trim()?.length/*, 'the header is longer than 0 characters'*/).toBeGreaterThan(0);
    expect(header.get(header.keys()[0])?.length).toBeGreaterThan(0);

    expect(service.accessTokenExpiration$.value/*, 'Access Token Expiration is in the future'*/).toBeGreaterThan(0);
    expect(service.accessTokenCreatedAt$.value/*, 'Access Token CreatedAt is in the past'*/).toBeLessThan(Date.now() / 1000);
  });

  const request = httpTestingController.expectOne(KitsuOAuthConfig.tokenEndpoint, 'fetching token');
  expect(request.request.method).toEqual('POST');
  request.flush({
    access_token: 'spec_access_token',
    refresh_token: 'spec_refresh_token',
    created_at: Date.now() / 1000,
    expires_in: 30 * 24 * 60 * 60,
    token_type: 'bearer'
  } as KitsuLoginResponse);
}
function logoutTest(service: KitsuOAuthService) {
  expect(service.authorizationHeader/*, 'authorizationHeader not set'*/).toBeFalsy();
  expect(service.hasValidAccessToken/*, 'has no valid AccessToken'*/).toBeFalsy();
  expect(service.accessToken$.value/*, 'accessToken$ not set'*/).toBeFalsy();
  expect(service.refreshToken$.value/*, 'refreshToken$ not set'*/).toBeFalsy();
  expect(service.accessTokenExpiration$.value/*, 'accessTokenExpiration$ not set'*/).toBeFalsy();
  expect(service.accessTokenCreatedAt$.value/*, 'accessTokenCreatedAt$ not set'*/).toBeFalsy();
  expect(service.canRefreshAccessToken/*, 'can not refresh AccessToken'*/).toBeFalsy();
}

async function login(service: KitsuOAuthService, username: string, password: string) {
  return service.fetchAccessToken(username, password);
}

describe('KitsuOAuthService', () => {
  let service: KitsuOAuthService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });

    service = TestBed.inject(KitsuOAuthService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

    service.clearToken();
  });

  initMatIconsForSpec();

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not be logged in', () => {
    logoutTest(service);
  });

  it('should login', async () => {
    loginTest(service, httpTestingController);
  })

  it('should logout', async () => {
    loginTest(service, httpTestingController);

    service.clearToken();
    logoutTest(service);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });
});
