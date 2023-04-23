import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowHandleBarComponent } from './window-handle-bar.component';

describe('WindowHandleBarComponent', () => {
  let component: WindowHandleBarComponent;
  let fixture: ComponentFixture<WindowHandleBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WindowHandleBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WindowHandleBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
