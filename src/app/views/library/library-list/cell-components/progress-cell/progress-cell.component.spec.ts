import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProgressCellComponent} from './progress-cell.component';
import {initMatIconsForSpec} from "../../../../../../test.util";

describe('ProgressCellComponent', () => {

  let component: ProgressCellComponent;
  let fixture: ComponentFixture<ProgressCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressCellComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProgressCellComponent);
    component = fixture.componentInstance;
    component.item = {id: {kitsu: '123456'}};

    fixture.detectChanges();
  });
  initMatIconsForSpec();

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
