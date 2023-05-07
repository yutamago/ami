import { TestBed } from '@angular/core/testing';

import { KitsuUsersService } from './kitsu-users.service';
import {provideHttpClient} from "@angular/common/http";

describe('KitsuUsersService', () => {
  let service: KitsuUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
      ]
    });
    service = TestBed.inject(KitsuUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
