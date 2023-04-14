import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationLeftComponent } from './navigation-left.component';

describe('NavigationLeftComponent', () => {
  let component: NavigationLeftComponent;
  let fixture: ComponentFixture<NavigationLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationLeftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
