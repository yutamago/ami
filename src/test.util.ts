import {inject} from "@angular/core/testing";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

export function initMatIconsForSpec() {
  beforeEach(inject([MatIconRegistry, DomSanitizer], (mir: MatIconRegistry, sanitizer: DomSanitizer) => {
    // The `MatIconRegistry` will make GET requests to fetch any SVG icons that are in the registry. More on this below...
    const sanitizedUrl = sanitizer.bypassSecurityTrustResourceUrl('../assets/mdi.svg');
    // Make sure that the icon name matches the icon name your component would be looking up.
    mir.addSvgIcon("icon-name", sanitizedUrl);
  }));
}
