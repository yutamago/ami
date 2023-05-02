import { TestBed } from '@angular/core/testing';

import { KitsuOAuthService } from './kitsu-o-auth.service';

describe('KitsuOAuthService', () => {
  let service: KitsuOAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KitsuOAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
