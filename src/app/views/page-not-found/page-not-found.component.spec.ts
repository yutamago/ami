import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PageNotFoundComponent} from './page-not-found.component';
import {initMatIconsForSpec} from "../../../test.util";

describe('PageNotFoundComponent', () => {

  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageNotFoundComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  initMatIconsForSpec();

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
