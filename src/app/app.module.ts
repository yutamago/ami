import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';

import {AppRoutingModule} from './app-routing.module';

// NG Translate
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {HomeModule} from './home/home.module';

import {AppComponent} from './app.component';
import {WindowHandleBarComponent} from "./window/window-handle-bar/window-handle-bar.component";
import {MainNavigationComponent} from "./window/main-navigation/main-navigation.component";
import {MatIconModule, MatIconRegistry} from "@angular/material/icon";
import {OAuthModule, OAuthStorage} from "angular-oauth2-oidc";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import safeStorage = Electron.Main.safeStorage;

// AoT requires an exported function for factories
const httpLoaderFactory = (http: HttpClient): TranslateHttpLoader => new TranslateHttpLoader(http, './assets/i18n/', '.json');

@NgModule({
  declarations: [AppComponent],
  imports: [
    MainNavigationComponent,
    WindowHandleBarComponent,

    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    HomeModule,
    AppRoutingModule,
    MatIconModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    OAuthModule.forRoot({
      resourceServer: {
        sendAccessToken: true,
        allowedUrls: []
      }
    })
  ],
  providers: [
    {provide: OAuthStorage, useFactory: oAuthStorageFactory}
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(iconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    iconRegistry.addSvgIconSet(
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg')
    );
  }
}


export function oAuthStorageFactory(): OAuthStorage {
  return localStorage;
}
