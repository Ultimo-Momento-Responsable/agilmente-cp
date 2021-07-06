import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientsPage } from './patients.page';

const routes: Routes = [
  {
    path: '',
    component: PatientsPage
  },
  {
    path: 'new-patient',
    loadChildren: () => import('./new-patient/new-patient.module').then( m => m.NewPatientPageModule)
  },
  {
    path: 'edit-patient/:id',
    loadChildren: () => import('./edit-patient/edit-patient.module').then( m => m.EditPatientPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientsPageRoutingModule {}
