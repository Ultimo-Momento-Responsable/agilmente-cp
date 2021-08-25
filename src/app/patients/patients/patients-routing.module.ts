import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedPatientsModule } from '../shared-patients/shared-patients.module';

import { PatientsPage } from './patients.page';

const routes: Routes = [
  {
    path: '',
    component: PatientsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedPatientsModule],
  exports: [RouterModule],
})
export class PatientsPageRoutingModule {}
