import { TestBed } from '@angular/core/testing';

import { KitsuAuthService } from './kitsu-auth.service';

describe('KitsuAuthService', () => {
  let service: KitsuAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KitsuAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
