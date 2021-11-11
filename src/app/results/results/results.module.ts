import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedResultsModule } from '../shared-results/shared-results.module';
import { ResultsPage } from './results.page';

const routes: Routes = [
  {
    path: '',
    component: ResultsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedResultsModule],
  declarations: [ResultsPage],
})
export class ResultsPageModule {}
