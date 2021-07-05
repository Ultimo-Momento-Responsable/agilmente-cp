import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubresultsPage } from './subresults.page';

const routes: Routes = [
  {
    path: '',
    component: SubresultsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubresultsPageRoutingModule {}
