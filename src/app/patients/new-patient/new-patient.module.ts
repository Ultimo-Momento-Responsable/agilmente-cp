import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NewPatientPageRoutingModule } from './new-patient-routing.module';
import { NewPatientPage } from './new-patient.page';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import { TitleCasePipe } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    Ionic4DatepickerModule,
    IonicModule,
    NewPatientPageRoutingModule,
  ],
  declarations: [NewPatientPage],
  providers: [TitleCasePipe],
})
export class NewPatientPageModule {}
