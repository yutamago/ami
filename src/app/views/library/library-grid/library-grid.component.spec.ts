import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryGridComponent } from './library-grid.component';
import {AuthService} from "../../../apis/general/services/auth.service";
import {KitsuOAuthService} from "../../../apis/kitsu/services/kitsu-o-auth.service";
import {provideHttpClient} from "@angular/common/http";

describe('LibraryGridComponent', () => {
  let component: LibraryGridComponent;
  let fixture: ComponentFixture<LibraryGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [AuthService, KitsuOAuthService, provideHttpClient()],
      imports: [ LibraryGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
