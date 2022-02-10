import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { GameCardComponent } from './components/card-game/game-card.component';

@NgModule({
  imports: [SharedModule],
  declarations: [GameCardComponent],
  exports: [SharedModule, GameCardComponent],
})
export class SharedGamesModule {}
