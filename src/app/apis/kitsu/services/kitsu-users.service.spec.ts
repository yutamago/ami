import { TestBed } from '@angular/core/testing';

import { KitsuUsersService } from './kitsu-users.service';

describe('KitsuUsersService', () => {
  let service: KitsuUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KitsuUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
