import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMediaRowComponent } from './home-media-row.component';

describe('HomeMediaRowComponent', () => {
  let component: HomeMediaRowComponent;
  let fixture: ComponentFixture<HomeMediaRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HomeMediaRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeMediaRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
