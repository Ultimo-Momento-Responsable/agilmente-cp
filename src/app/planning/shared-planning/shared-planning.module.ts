import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomDifficultComponent } from './components/custom-difficulty/custom-difficulty.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [SharedModule, NgbModule],
  declarations: [CustomDifficultComponent],
  exports: [SharedModule, CustomDifficultComponent],
})
export class SharedPlanningModule {}
