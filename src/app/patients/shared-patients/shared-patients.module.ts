import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardHayUnoRepetidoResultComponent } from './components/card-hay-uno-repetido-result/card-hay-uno-repetido-result.component';

@NgModule({
  imports: [SharedModule],
  declarations: [CardHayUnoRepetidoResultComponent],
  exports: [SharedModule, CardHayUnoRepetidoResultComponent],
})
export class SharedPatientsModule {}
