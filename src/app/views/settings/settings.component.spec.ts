import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import {AuthService} from "../../apis/general/services/auth.service";
import {KitsuOAuthService} from "../../apis/kitsu/services/kitsu-o-auth.service";
import {provideHttpClient} from "@angular/common/http";
import {provideNoopAnimations} from "@angular/platform-browser/animations";

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [AuthService, KitsuOAuthService, provideHttpClient(), provideNoopAnimations()],
      imports: [ SettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
