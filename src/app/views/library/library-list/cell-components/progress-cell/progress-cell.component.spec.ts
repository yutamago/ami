import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressCellComponent } from './progress-cell.component';

describe('ProgressCellComponent', () => {
  let component: ProgressCellComponent;
  let fixture: ComponentFixture<ProgressCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ProgressCellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
