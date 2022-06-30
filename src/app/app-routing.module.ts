import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GuardGuard } from './login/guard.guard';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: 'patients',
    loadChildren: () => import('./patients/patients/patients-page.module').then( m => m.PatientsPageModule),
    canLoad: [GuardGuard]
  },
  {
    path: 'planning',
    loadChildren: () => import('./planning/planning.module').then((m) => m.PlanningPageModule),
    canLoad: [GuardGuard]
  },
  {
    path: 'planning/edit-planning/:id',
    loadChildren: () => import('./planning/edit-planning/edit-planning.module').then( m => m.EditPlanningPageModule)
  },
  {
  path: 'results/:gameRoute/:id',
  loadChildren: () =>
      import('./results/subresults/subresults.module').then(
      (m) => m.SubresultsPageModule
      ),
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canLoad: [GuardGuard]
  },
  {
    path: 'new-patient',
    loadChildren: () => import('./patients/new-patient/new-patient.module').then( m => m.NewPatientPageModule),
    canLoad: [GuardGuard]
  },
  {
    path: 'edit-patient/:id',
    loadChildren: () => import('./patients/edit-patient/edit-patient.module').then( m => m.EditPatientPageModule),
    canLoad: [GuardGuard]
  },
  {
    path: 'patients/:id',
    loadChildren: () => import('./patients/specific-patient/specific-patient.module').then( m => m.SpecificPatientPageModule),
    canLoad: [GuardGuard]
  },
  {
    path: 'games',
    loadChildren: () => import('./games/games.module').then( m => m.GamesPageModule),
    canLoad: [GuardGuard]
  },
  {
    path: 'games/:id',
    loadChildren: () => import('./games/specific-game/specific-game.module').then( m => m.SpecificGamePageModule),
    canLoad: [GuardGuard]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
