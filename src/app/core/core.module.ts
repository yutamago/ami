import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WindowHandleBarComponent} from '../window/window-handle-bar/window-handle-bar.component';
import {MainNavigationComponent} from '../window/main-navigation/main-navigation.component';
import {RouterLink, RouterLinkActive} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ]
})
export class CoreModule {
}
