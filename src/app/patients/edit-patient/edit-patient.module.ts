import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { EditPatientPage } from './edit-patient.page';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import { RouterModule, Routes } from '@angular/router';
import { SharedPatientsModule } from '../shared-patients/shared-patients.module';

const routes: Routes = [
  {
    path: '',
    component: EditPatientPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    Ionic4DatepickerModule,
    IonicModule,
    RouterModule.forChild(routes), 
    SharedPatientsModule
  ],
  declarations: [EditPatientPage]
})
export class EditPatientPageModule {}
