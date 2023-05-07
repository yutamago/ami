import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryGridComponent } from './library-grid.component';

describe('LibraryGridComponent', () => {
  let component: LibraryGridComponent;
  let fixture: ComponentFixture<LibraryGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ LibraryGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
