import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResultsGraphsPage } from './results-graphs.page';

const routes: Routes = [
  {
    path: '',
    component: ResultsGraphsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultsGraphsPageRoutingModule {}
