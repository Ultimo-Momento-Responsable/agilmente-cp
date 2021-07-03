import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientsPage } from './patients.page';

const routes: Routes = [
  {
    path: '',
    component: PatientsPage
  },  {
    path: 'new-patient',
    loadChildren: () => import('./new-patient/new-patient.module').then( m => m.NewPatientPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientsPageRoutingModule {}
