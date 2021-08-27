import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlanningCardComponent } from './components/planning-card/planning-card.component';

@NgModule({
  imports: [SharedModule],
  declarations: [PlanningCardComponent],
  exports: [SharedModule, PlanningCardComponent],
})
export class SharedPlanningModule {}
