import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteButtonComponent } from './delete-button/delete-button.component';
import { EditButtonComponent } from './edit-button/edit-button.component';

@NgModule({
  declarations: [
    DeleteButtonComponent,
    EditButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DeleteButtonComponent,
    EditButtonComponent
  ]
})
export class SharedModule { }
