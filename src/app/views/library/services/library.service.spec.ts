import { TestBed } from '@angular/core/testing';

import { LibraryService } from './library.service';
import {KitsuLibraryEntriesService} from "../../../apis/kitsu/services/kitsu-library-entries.service";
import {provideHttpClient} from "@angular/common/http";

describe('LibraryService', () => {
  let service: LibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KitsuLibraryEntriesService, provideHttpClient()]
    });
    service = TestBed.inject(LibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
