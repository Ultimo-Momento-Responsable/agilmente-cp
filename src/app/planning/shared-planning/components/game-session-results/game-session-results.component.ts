import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IResult } from 'src/app/shared/interfaces/result.interface';

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
  selector: 'app-game-session-results',
  templateUrl: './game-session-results.component.html',
  styleUrls: ['./game-session-results.component.scss'],
})
export class GameSessionResultsComponent implements OnInit {
  @Input() gameSession: PlanningItem;
  @Input() results: IResult[];
  get gameRoute(): string {
    return this.gameSession.game
    .toLowerCase()
    .replace(/\s/g, '-');
  }

  constructor(private navController: NavController) {}

  ngOnInit() {
    this.formatParamValues();
  }

  /**
   * Formatea los parámetros para que se muestren bien.
   */
  formatParamValues() {
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

  /**
   * Redirige al usuario a un resultado específico.
   */
  goToResult(id: number) {
    this.navController.navigateForward([`/results/${this.gameRoute}/${id}`]);
  }
}
