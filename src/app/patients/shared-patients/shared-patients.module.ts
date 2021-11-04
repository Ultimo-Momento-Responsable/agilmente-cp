import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardEncuentraAlNuevoResultComponent } from './components/card-encuentra-al-nuevo-result/card-encuentra-al-nuevo-result.component';
import { CardHayUnoRepetidoResultComponent } from './components/card-hay-uno-repetido-result/card-hay-uno-repetido-result.component';

@NgModule({
  imports: [SharedModule],
  declarations: [CardHayUnoRepetidoResultComponent, CardEncuentraAlNuevoResultComponent],
  exports: [SharedModule, CardHayUnoRepetidoResultComponent, CardEncuentraAlNuevoResultComponent],
})
export class SharedPatientsModule {}
