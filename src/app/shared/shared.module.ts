import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteButtonComponent } from './delete-button/delete-button.component';

@NgModule({
  declarations: [DeleteButtonComponent],
  imports: [
    CommonModule
  ],
  exports: [DeleteButtonComponent]
})
export class SharedModule { }
