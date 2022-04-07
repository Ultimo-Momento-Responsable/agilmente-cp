import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { GraphResultsComponent } from './components/graph-results/graph-results.component';
import { ResultCardComponent } from './components/result-card/result-card.component';
import { ResultsDetailParamsCardComponent } from './components/results-detail-params-card/results-detail-params-card.component';
import { TableTBSResultsComponent } from './components/table-tbs-results/table-tbs-results.component';
import { TableMemorillaResultsComponent } from './components/table-memorilla-results/table-memorilla-results.component';

@NgModule({
  imports: [SharedModule],
  declarations: [ResultCardComponent, GraphResultsComponent, TableTBSResultsComponent, ResultsDetailParamsCardComponent, TableMemorillaResultsComponent],
  exports: [SharedModule, ResultCardComponent, GraphResultsComponent, TableTBSResultsComponent, ResultsDetailParamsCardComponent, TableMemorillaResultsComponent],
})
export class SharedResultsModule {}
