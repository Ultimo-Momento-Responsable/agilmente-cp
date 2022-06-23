import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomDifficultComponent } from './components/custom-difficulty/custom-difficulty.component';
import { PatientPlanningNameComponent } from './components/patient-planning-name/patient-planning-name.component';
import { StartFinishDateComponent } from './components/start-finish-date/start-finish-date.component';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddGamesComponent } from './components/add-games/add-games.component';
import { GameSessionResultsComponent } from './components/game-session-results/game-session-results.component';

@NgModule({
  imports: [SharedModule, NgbModule, Ionic4DatepickerModule],
  declarations: [CustomDifficultComponent, AddGamesComponent, PatientPlanningNameComponent, StartFinishDateComponent, GameSessionResultsComponent],
  exports: [SharedModule, CustomDifficultComponent, AddGamesComponent, PatientPlanningNameComponent, StartFinishDateComponent, GameSessionResultsComponent],
})
export class SharedPlanningModule {}
