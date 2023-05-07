import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {provideAnimations} from "@angular/platform-browser/animations";
import {ApplicationConfig} from "@angular/platform-browser";
import {MatIconModule} from "@angular/material/icon";
import {importProvidersFrom} from "@angular/core";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom(
      MatIconModule
    ),
  ]
};
