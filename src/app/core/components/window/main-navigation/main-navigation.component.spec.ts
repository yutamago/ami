import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MainNavigationComponent} from './main-navigation.component';
import {AuthService} from "../../../../apis/general/services/auth.service";
import {KitsuOAuthService} from "../../../../apis/kitsu/services/kitsu-o-auth.service";
import {provideHttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {of} from "rxjs";
import {RouterTestingModule} from "@angular/router/testing";
import {initMatIconsForSpec} from "../../../../../test.util";

describe('MainNavigationComponent', () => {

  let component: MainNavigationComponent;
  let fixture: ComponentFixture<MainNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [AuthService, KitsuOAuthService, provideHttpClient()],
      imports: [ MainNavigationComponent, RouterTestingModule.withRoutes([]) ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  initMatIconsForSpec();

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
