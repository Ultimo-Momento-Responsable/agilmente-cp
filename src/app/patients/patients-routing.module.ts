import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'patients',
        loadChildren: () => import('./patients/patients-page.module').then( m => m.PatientsPageModule)
    },
    {
        path: 'new-patient',
        loadChildren: () => import('./new-patient/new-patient.module').then( m => m.NewPatientPageModule)
    },
    {
        path: 'edit-patient/:id',
        loadChildren: () => import('./edit-patient/edit-patient.module').then( m => m.EditPatientPageModule)
    },
    {
        path: 'patients/:id',
        loadChildren: () => import('./specific-patient/specific-patient.module').then( m => m.SpecificPatientPageModule)
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientsRoutingModule {}
