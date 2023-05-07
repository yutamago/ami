import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReleasesComponent } from './new-releases.component';
import {initMatIconsForSpec} from "../../../test.util";

describe('NewReleasesComponent', () => {

  let component: NewReleasesComponent;
  let fixture: ComponentFixture<NewReleasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ NewReleasesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewReleasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  initMatIconsForSpec();

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
