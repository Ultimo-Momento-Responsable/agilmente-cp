import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UxDatepickerComponent } from './components/ux-datepicker/ux-datepicker.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';



@NgModule({
  declarations: [UxDatepickerComponent],
  imports: [
    CommonModule
  ],
  exports: [UxDatepickerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { 

}