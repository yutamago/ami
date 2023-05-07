import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DevComponent} from './dev.component';
import {AuthService} from "../../apis/general/services/auth.service";
import {KitsuOAuthService} from "../../apis/kitsu/services/kitsu-o-auth.service";
import {provideHttpClient} from "@angular/common/http";
import {provideNoopAnimations} from "@angular/platform-browser/animations";

describe('DevComponent', () => {
  let component: DevComponent;
  let fixture: ComponentFixture<DevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [AuthService, KitsuOAuthService, provideHttpClient(), provideNoopAnimations()],
      imports: [DevComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
