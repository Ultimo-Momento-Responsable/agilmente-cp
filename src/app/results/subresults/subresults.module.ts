import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedResultsModule } from '../shared-results/shared-results.module';
import { SubresultsPage } from './subresults.page';

const routes: Routes = [
  {
    path: '',
    component: SubresultsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedResultsModule],
  declarations: [SubresultsPage],
})
export class SubresultsPageModule {}
