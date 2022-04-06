import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlanningCardComponent } from './components/planning-card/planning-card.component';
import { CustomDifficultComponent } from './components/custom-difficulty/custom-difficulty.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [SharedModule, NgbModule],
  declarations: [PlanningCardComponent, CustomDifficultComponent],
  exports: [SharedModule, PlanningCardComponent, CustomDifficultComponent],
})
export class SharedPlanningModule {}
