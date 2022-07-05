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
  numberOfSessions: string;

  constructor(
    private resultsApiService: ResultsApiService
  ) { }

  ngOnInit() {
    this.tendency = 'increment';
    const game = this.gameSession.game.toLowerCase();
    const gameRoute = game.replace(/\s/g, '-');
    const gameIcon = game.replace(/\s/g, '_');
    this.icon = `assets/pictures/${gameIcon}_icon.png`;
    this.getNumberOfSessions();
    this.resultsApiService.getResultsBySessionId(this.gameSession.gameSessionId, gameRoute).subscribe((res) => {
      this.results = res;
    });
    this.formatParamValues();
  }

  /**
   * Crea un texto para mostrar en caso que las sesiones sean ilimitadas.
   */
  getNumberOfSessions() {
    if (this.gameSession.numberOfSession >= 0) {
      this.numberOfSessions = this.gameSession.numberOfSession.toString();
    } else {
      this.numberOfSessions = 'Sin límite';
    }
  }

  /**
   * Formatea los parámetros para que se muestren bien.
   */
  private formatParamValues() {
    this.gameSession.parameters.map(p => {
      if (p.value === "true") {
        p.value = 'Sí';
      } else if (p.value === "false") {
        p.value = 'No';
      } else if (typeof p.value === 'boolean') {
        if (p.value) {
          p.value = 'Sí';
        } else {
          p.value = 'No';
        }
      }

      return p;
    })
  }
}
