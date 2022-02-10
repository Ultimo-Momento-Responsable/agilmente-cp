import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SharedResultsModule } from '../shared-results/shared-results.module';
import { ResultsPage } from './results.page';

const routes: Routes = [
  {
    path: '',
    component: ResultsPage,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes), 
    SharedResultsModule,
    NgxSkeletonLoaderModule
  ],
  declarations: [ResultsPage],
})
export class ResultsPageModule {}
