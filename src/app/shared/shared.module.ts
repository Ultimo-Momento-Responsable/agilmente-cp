import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UxDatepickerComponent } from './components/ux-datepicker/ux-datepicker.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { ResultCardComponent } from './components/result-card/result-card.component';
import { HayUnoRepetidoResultsGeneralTableComponent } from './components/results/hay-uno-repetido/hay-uno-repetido-results-general-table/hay-uno-repetido-results-general-table.component';
import { HayUnoRepetidoResultsPerformanceGraphComponent } from './components/results/hay-uno-repetido/hay-uno-repetido-results-performance-graph/hay-uno-repetido-results-performance-graph.component';
import { HayUnoRepetidoResultsTimeGraphComponent } from './components/results/hay-uno-repetido/hay-uno-repetido-results-time-graph/hay-uno-repetido-results-time-graph.component';
import { DialogsComponent } from './components/dialogs/dialogs.component';
import { EncuentraAlNuevoResultsGeneralTableComponent } from './components/results/encuentra-al-nuevo/encuentra-al-nuevo-results-general-table/encuentra-al-nuevo-results-general-table.component';
import { EncuentraAlNuevoResultsPerformanceGraphComponent } from './components/results/encuentra-al-nuevo/encuentra-al-nuevo-results-performance-graph/encuentra-al-nuevo-results-performance-graph.component';
import { EncuentraAlNuevoResultsTimeGraphComponent } from './components/results/encuentra-al-nuevo/encuentra-al-nuevo-results-time-graph/encuentra-al-nuevo-results-time-graph.component';
import { PlanningSearchComponent } from './components/planning-search/planning-search.component';
import { PlanningCardComponent } from './components/planning-card/planning-card.component';
import { ResultsTableComponent } from './components/results/results-table/results-table.component';
import { ResultTranslatePipe } from './pipes/result-translate/result-translate.pipe';
import { TableComponent } from './components/table/table.component';
import { GraphComponent } from './components/graph/graph.component';
import { HttpHeadersService } from './services/http-header.service';
import { ResultsGraphComponent } from './components/results/results-graph/results-graph.component';
import { ElipsisPipe } from './pipes/elipsis/elipsis.pipe';

@NgModule({
  declarations: [
    UxDatepickerComponent,
    CustomDatePipe,
    // Resultados de Encuentra al Repetido
    HayUnoRepetidoResultsGeneralTableComponent,
    HayUnoRepetidoResultsPerformanceGraphComponent,
    HayUnoRepetidoResultsTimeGraphComponent,
    //Resultados de Encuentra al Nuevo
    EncuentraAlNuevoResultsGeneralTableComponent,
    EncuentraAlNuevoResultsPerformanceGraphComponent,
    EncuentraAlNuevoResultsTimeGraphComponent,
    ResultsTableComponent,
    DialogsComponent,
    ResultCardComponent,
    PlanningSearchComponent,
    PlanningCardComponent,
    ResultTranslatePipe,
    ResultsGraphComponent,
    TableComponent,
    GraphComponent,
    ElipsisPipe
  ],
  imports: [CommonModule, IonicModule, ReactiveFormsModule, FormsModule],
  exports: [
    UxDatepickerComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    CustomDatePipe,
    // Resultados de Encuentra al Repetido
    HayUnoRepetidoResultsGeneralTableComponent,
    HayUnoRepetidoResultsPerformanceGraphComponent,
    HayUnoRepetidoResultsTimeGraphComponent,
    // Resultado de Encuentra al Nuevo
    EncuentraAlNuevoResultsGeneralTableComponent,
    EncuentraAlNuevoResultsPerformanceGraphComponent,
    EncuentraAlNuevoResultsTimeGraphComponent,
    ResultsTableComponent,
    DialogsComponent,
    PlanningSearchComponent,
    PlanningCardComponent,
    ResultCardComponent,
    ResultTranslatePipe,
    ResultsGraphComponent,
    TableComponent,
    GraphComponent,
    ElipsisPipe
  ],
  providers: [ResultTranslatePipe,DialogsComponent,HttpHeadersService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
