import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UxDatepickerComponent } from './components/ux-datepicker/ux-datepicker.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomDatePipe } from './pipes/custom-date.pipe';

@NgModule({
  declarations: [UxDatepickerComponent, CustomDatePipe],
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  exports: [
    UxDatepickerComponent,
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    CustomDatePipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
