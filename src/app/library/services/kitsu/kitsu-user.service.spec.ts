import { TestBed } from '@angular/core/testing';

import { KitsuUserService } from './kitsu-user.service';

describe('KitsuUserService', () => {
  let service: KitsuUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KitsuUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
