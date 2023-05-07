import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {AuthService} from "./apis/general/services/auth.service";
import {KitsuOAuthService} from "./apis/kitsu/services/kitsu-o-auth.service";
import {provideHttpClient} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {initMatIconsForSpec} from "../test.util";


describe('AppComponent', () => {


  beforeEach(() => TestBed.configureTestingModule({
    providers: [AuthService, KitsuOAuthService, provideHttpClient()],
    imports: [AppComponent, RouterTestingModule.withRoutes([])]
  }));
  initMatIconsForSpec();



  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  //
  // it(`should have the 'Ami' title`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('Ami');
  // });
  //
  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('Ami app is running!');
  // });
});
