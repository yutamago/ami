import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowHandleBarComponent } from './window-handle-bar.component';
import {initMatIconsForSpec} from "../../../../../test.util";

describe('WindowHandleBarComponent', () => {

  let component: WindowHandleBarComponent;
  let fixture: ComponentFixture<WindowHandleBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ WindowHandleBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WindowHandleBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  initMatIconsForSpec();

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
