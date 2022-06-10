import { Component, Input, OnInit } from '@angular/core';
import { ResultsApiService } from 'src/app/results/shared-results/services/results-api/results-api.service';

interface Param {
  id: number;
  maxLevel: number;
  name: string;
  value: string;
  spanishName: string;
  unit: string;
  contextualHelp: string;
};

interface PlanningItem {
  gameSessionId: number;
  game: string;
  numberOfSession: number;
  parameters: Param[];
};
@Component({
  selector: 'app-game-session-card',
  templateUrl: './game-session-card.component.html',
  styleUrls: ['./game-session-card.component.scss'],
})
export class GameSessionCardComponent implements OnInit {
  @Input() gameSession: PlanningItem;
  icon: string;
  results: any[];
  tendency: string;

  constructor(
    private resultsApiService: ResultsApiService
  ) { }

  ngOnInit() {
    this.tendency = 'increment';
    const game = this.gameSession.game.toLowerCase();
    const gameRoute = game.replace(/\s/g, '-');
    const gameIcon = game.replace(/\s/g, '_');
    this.icon = `assets/pictures/${gameIcon}_icon.png`;
    this.resultsApiService.getResultsBySessionId(this.gameSession.gameSessionId, gameRoute).subscribe((res) => {
      this.results = res;
    });
  }

}