import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {KitsuOAuthService} from "../../kitsu/services/kitsu-o-auth.service";
import {KitsuUsersService} from "../../kitsu/services/kitsu-users.service";
import {provideHttpClient} from "@angular/common/http";

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        KitsuOAuthService,
        KitsuUsersService
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
