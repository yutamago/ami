import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TranslateModule} from '@ngx-translate/core';

import {PageNotFoundComponent} from './components/';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [CommonModule, TranslateModule, FormsModule, PageNotFoundComponent],
  exports: [TranslateModule, FormsModule]
})
export class SharedModule {}
