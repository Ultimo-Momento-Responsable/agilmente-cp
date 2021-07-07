import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpecificPatientPage } from './specific-patient.page';

const routes: Routes = [
  {
    path: '',
    component: SpecificPatientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpecificPatientPageRoutingModule {}
