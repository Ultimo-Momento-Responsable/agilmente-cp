import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UxDatepickerComponent } from './components/ux-datepicker/ux-datepicker.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { HayUnoRepetidoResultsGeneralTableComponent } from './components/results/hay-uno-repetido/hay-uno-repetido-results-general-table/hay-uno-repetido-results-general-table.component';
import { HayUnoRepetidoResultsPerformanceGraphComponent } from './components/results/hay-uno-repetido/hay-uno-repetido-results-performance-graph/hay-uno-repetido-results-performance-graph.component';
import { HayUnoRepetidoResultsTimeGraphComponent } from './components/results/hay-uno-repetido/hay-uno-repetido-results-time-graph/hay-uno-repetido-results-time-graph.component';
import { DialogsComponent } from './components/dialogs/dialogs.component';

@NgModule({
  declarations: [
    UxDatepickerComponent,
    CustomDatePipe,
    // Resultados de Encuentra al Repetido
    HayUnoRepetidoResultsGeneralTableComponent,
    HayUnoRepetidoResultsPerformanceGraphComponent,
    HayUnoRepetidoResultsTimeGraphComponent,
    DialogsComponent
  ],
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  exports: [
    UxDatepickerComponent,
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    CustomDatePipe,
    // Resultados de Encuentra al Repetido
    HayUnoRepetidoResultsGeneralTableComponent,
    HayUnoRepetidoResultsPerformanceGraphComponent,
    HayUnoRepetidoResultsTimeGraphComponent,
    DialogsComponent
  ],
  providers: [DialogsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
