import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedPatientsModule } from '../shared-patients/shared-patients.module';
import { SpecificPatientPage } from './specific-patient.page';

const routes: Routes = [
  {
    path: '',
    component: SpecificPatientPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedPatientsModule, ReactiveFormsModule, FormsModule],
  declarations: [SpecificPatientPage],
})
export class SpecificPatientPageModule {}
