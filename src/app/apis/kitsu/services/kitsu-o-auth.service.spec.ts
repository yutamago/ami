import {TestBed} from '@angular/core/testing';

import {KitsuOAuthService} from './kitsu-o-auth.service';

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
  const username = '';
  const password = '';
  let service: KitsuOAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KitsuOAuthService);
    service.clearToken();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not be logged in', () => {
    logoutTest(service);
  });

  it('should login', async () => {
    await login(service, username, password);
    expect(service.authorizationHeader/*, 'authorizationHeader set'*/).toBeTruthy();
    expect(service.hasValidAccessToken/*, 'has valid AccessToken'*/).toBeTruthy();
    expect(service.accessToken$.value/*, 'accessToken$ set'*/).toBeTruthy();
    expect(service.refreshToken$.value/*, 'refreshToken$ set'*/).toBeTruthy();
    expect(service.accessTokenExpiration$.value/*, 'accessTokenExpiration$ set'*/).toBeTruthy();
    expect(service.accessTokenCreatedAt$.value/*, 'accessTokenCreatedAt$ set'*/).toBeTruthy();
    expect(service.canRefreshAccessToken/*, 'can refresh AccessToken'*/).toBeTruthy();

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const header = service.authorizationHeader!;

    expect(header.keys().length/*, 'has exactly one header'*/).toBe(1);
    expect(header.get(header.keys()[0])?.trim()?.length/*, 'the header is longer than 0 characters'*/).toBeGreaterThan(0);
    expect(header.get(header.keys()[0])?.length).toBeGreaterThan(0);

    expect(service.accessTokenExpiration$.value/*, 'Access Token Expiration is in the future'*/).toBeGreaterThan(0);
    expect(service.accessTokenCreatedAt$.value/*, 'Access Token CreatedAt is in the past'*/).toBeLessThan(Date.now() / 1000);

    describe('KitsuOAuthService:Logout', () => {
      it('should logout', () => {
        service.clearToken();
        logoutTest(service);
      });
    });

  })
});
