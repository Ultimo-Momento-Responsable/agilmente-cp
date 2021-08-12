import { NgModule } from '@angular/core';
import { CustomDatePipe } from 'src/app/shared/pipes/custom-date.pipe';
import { SharedModule } from 'src/app/shared/shared.module';
import { ResultCardComponent } from './components/result-card/result-card.component';

@NgModule({
  imports: [SharedModule],
  declarations: [ResultCardComponent],
  exports: [SharedModule, ResultCardComponent],
})
export class SharedResultsModule {}
