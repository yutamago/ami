import {inject} from "@angular/core/testing";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

export function initMatIconsForSpec(after?: () => (void | Promise<void>)) {
  beforeEach(inject([MatIconRegistry, DomSanitizer], (mir: MatIconRegistry, sanitizer: DomSanitizer) => {
    mir.addSvgIconSet(
      sanitizer.bypassSecurityTrustResourceUrl('../assets/mdi.svg')
    );

    if(after) after();
  }));
}
