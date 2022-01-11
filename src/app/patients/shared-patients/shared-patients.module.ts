import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardEncuentraAlNuevoResultComponent } from './components/card-encuentra-al-nuevo-result/card-encuentra-al-nuevo-result.component';
import { CardHayUnoRepetidoResultComponent } from './components/card-hay-uno-repetido-result/card-hay-uno-repetido-result.component';
import { PatientCardComponent } from './components/patient-card/patient-card.component';

@NgModule({
  imports: [SharedModule],
  declarations: [CardHayUnoRepetidoResultComponent, CardEncuentraAlNuevoResultComponent, PatientCardComponent],
  exports: [SharedModule, CardHayUnoRepetidoResultComponent, CardEncuentraAlNuevoResultComponent, PatientCardComponent],
})
export class SharedPatientsModule {}
