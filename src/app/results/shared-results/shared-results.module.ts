import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { GraphResultsComponent } from './components/graph-results/graph-results.component';
import { ResultCardComponent } from './components/result-card/result-card.component';
import { ResultsDetailParamsCardComponent } from './components/results-detail-params-card/results-detail-params-card.component';
import { TableResultsComponent } from './components/table-results/table-results.component';

@NgModule({
  imports: [SharedModule],
  declarations: [ResultCardComponent, GraphResultsComponent, TableResultsComponent, ResultsDetailParamsCardComponent],
  exports: [SharedModule, ResultCardComponent, GraphResultsComponent, TableResultsComponent, ResultsDetailParamsCardComponent],
})
export class SharedResultsModule {}
