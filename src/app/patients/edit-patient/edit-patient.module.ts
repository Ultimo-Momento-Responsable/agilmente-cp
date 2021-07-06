import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPatientPageRoutingModule } from './edit-patient-routing.module';

import { EditPatientPage } from './edit-patient.page';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    Ionic4DatepickerModule,
    IonicModule,
    EditPatientPageRoutingModule
  ],
  declarations: [EditPatientPage]
})
export class EditPatientPageModule {}
