import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryComponent } from './library.component';
import {LibraryService} from "./services/library.service";
import {KitsuLibraryEntriesService} from "../../apis/kitsu/services/kitsu-library-entries.service";
import {provideHttpClient} from "@angular/common/http";
import {initMatIconsForSpec} from "../../../test.util";

describe('AnimeListComponent', () => {

  let component: LibraryComponent;
  let fixture: ComponentFixture<LibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        LibraryService,
        KitsuLibraryEntriesService,
        provideHttpClient()
      ],
      imports: [ LibraryComponent ]
    })
    .compileComponents();
  });
  initMatIconsForSpec(() => {
    fixture = TestBed.createComponent(LibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
