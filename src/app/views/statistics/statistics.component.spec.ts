import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsComponent } from './statistics.component';
import {initMatIconsForSpec} from "../../../test.util";

describe('StatisticsComponent', () => {

  let component: StatisticsComponent;
  let fixture: ComponentFixture<StatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ StatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  initMatIconsForSpec();

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
