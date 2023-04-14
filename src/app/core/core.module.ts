import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WindowHandleBarComponent} from './components/window-handle-bar/window-handle-bar.component';
import {NavigationLeftComponent} from './components/navigation-left/navigation-left.component';

@NgModule({
  declarations: [
    WindowHandleBarComponent,
    NavigationLeftComponent
  ],
  exports: [
    WindowHandleBarComponent,
    NavigationLeftComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule {
}
