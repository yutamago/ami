import { TestBed } from '@angular/core/testing';

import { KitsuUsersService } from './kitsu-users.service';
import {provideHttpClient} from "@angular/common/http";
import {initMatIconsForSpec} from "../../../../test.util";

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

  initMatIconsForSpec();

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
