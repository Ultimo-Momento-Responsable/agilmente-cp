import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpecificPatientPageRoutingModule } from './specific-patient-routing.module';

import { SpecificPatientPage } from './specific-patient.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SpecificPatientPageRoutingModule
  ],
  declarations: [SpecificPatientPage]
})
export class SpecificPatientPageModule {}
