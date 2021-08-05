import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'patients',
    pathMatch: 'full'
  },
  {
    path: 'results',
    loadChildren: () => import('./results/results.module').then( m => m.ResultsPageModule)
  },
  {
    path: 'subresults/:id',
    loadChildren: () => import('./results/subresults/subresults.module').then( m => m.SubresultsPageModule)
  },
  {
    path: 'patients',
    loadChildren: () => import('./patients/patients.module').then( m => m.PatientsPageModule)
  },
  {
    path: 'new-patient',
    loadChildren: () => import('./patients/new-patient/new-patient.module').then( m => m.NewPatientPageModule)
  },
  {
    path: 'edit-patient/:id',
    loadChildren: () => import('./patients/edit-patient/edit-patient.module').then( m => m.EditPatientPageModule)
  },
  {
    path: 'patients/:id',
    loadChildren: () => import('./patients/specific-patient/specific-patient.module').then( m => m.SpecificPatientPageModule)
  },  {
    path: 'planning',
    loadChildren: () => import('./planning/planning.module').then( m => m.PlanningPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
