import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryListComponent } from './library-list.component';
import {initMatIconsForSpec} from "../../../../test.util";

describe('LibraryListComponent', () => {

  let component: LibraryListComponent;
  let fixture: ComponentFixture<LibraryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ LibraryListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  initMatIconsForSpec();

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
