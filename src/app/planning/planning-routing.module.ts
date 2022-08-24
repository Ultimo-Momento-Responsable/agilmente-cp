import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanningPage } from './planning.page';

const routes: Routes = [
  {
    path: '',
    component: PlanningPage
  },
  {
    path: 'new-planning',
    loadChildren: () => import('./new-planning/new-planning.module').then( m => m.NewPlanningPageModule)
  },
  {
    path: 'new-planning/:id',
    loadChildren: () => import('./new-planning/new-planning.module').then( m => m.NewPlanningPageModule)
  },
  {
    path: ':id',
    loadChildren: () => import('./specific-planning/specific-planning.module').then( m => m.SpecificPlanningPageModule)
  },
  {
    path: 'edit-planning/:id',
    loadChildren: () => import('./edit-planning/edit-planning.module').then( m => m.EditPlanningPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanningPageRoutingModule {}
