import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumirPipe } from './pipes/resumir.pipe';
import { CardLoadComponent } from './base/card-load/card-load.component';



@NgModule({
  declarations: [
    ResumirPipe,
    CardLoadComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ResumirPipe,
    CardLoadComponent
  ]
})
export class CoreModule { }
