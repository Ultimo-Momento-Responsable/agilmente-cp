import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardGameResultComponent } from './components/card-game-result/card-game-result.component';

@NgModule({
  imports: [SharedModule],
  declarations: [CardGameResultComponent],
  exports: [SharedModule, CardGameResultComponent],
})
export class SharedPatientsModule {}
