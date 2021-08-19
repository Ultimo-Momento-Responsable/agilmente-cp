import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
    path: 'results',
    loadChildren: () =>
        import('./results/results.module').then((m) => m.ResultsPageModule),
    },
    {
    path: 'results/:gameRoute/:id',
    loadChildren: () =>
        import('./subresults/subresults.module').then(
        (m) => m.SubresultsPageModule
        ),
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultsRoutingModule {}
