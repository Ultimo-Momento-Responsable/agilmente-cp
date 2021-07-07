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
    path: 'results-graphs',
    loadChildren: () => import('./results/results-graphs/results-graphs.module').then( m => m.ResultsGraphsPageModule)
  },
  {
    path: 'new-patient',
    loadChildren: () => import('./patients/new-patient/new-patient.module').then( m => m.NewPatientPageModule)
  },
  {
    path: 'edit-patient/:id',
    loadChildren: () => import('./patients/edit-patient/edit-patient.module').then( m => m.EditPatientPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
