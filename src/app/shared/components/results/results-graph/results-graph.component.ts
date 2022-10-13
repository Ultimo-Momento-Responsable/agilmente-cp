import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IResult } from 'src/app/shared/interfaces/result.interface';
import { ResultTranslatePipe } from 'src/app/shared/pipes/result-translate/result-translate.pipe';
import { COLORS, Dataset, Color } from '../../graph/graph.component';

const COLORS_FOR_COLUMNS = {
  successes: 'success',
  mistakes: 'danger',
  streak: 'warning',
};
@Component({
  selector: 'app-results-graph',
  templateUrl: './results-graph.component.html',
  styleUrls: ['./results-graph.component.scss'],
})
export class ResultsGraphComponent implements OnInit {
  @Input() results: IResult[];
  @Output() clickedResultEvent = new EventEmitter<number>();
  filteredResults: Dataset[];
  tabs: string[][];

  constructor(private resultTranslate: ResultTranslatePipe) {}

  ngOnInit() {
    this.getDatasetsForGraph();
  }

  /**
   * Obtiene y formatea los datos para el gráfico.
   */
  getDatasetsForGraph() {
    const mappedResults = this.results.map(this.mapResults);
    this.filteredResults = Object.keys(mappedResults[0]).map((key) => {
      return {
        data: mappedResults.map((r) => r[key]),
        lineColor: this.getColor(COLORS_FOR_COLUMNS[key]),
        reference: this.resultTranslate.transform(key),
      };
    });

    this.tabs = Object.keys(mappedResults[0]).sort().map(key => {
      const tab = [this.resultTranslate.transform(key)];

      if (key === 'successes') {
        tab.push(this.resultTranslate.transform('mistakes'))
      }
      return tab;
    });
    
    this.tabs = this.tabs.filter(tab => !(tab.includes(this.resultTranslate.transform('mistakes')) && tab.length == 1));
  }

  /**
   * Obtiene un color a partir del alias.
   * @param alias Alias del color.
   *  - success
   *  - danger
   *  - warning
   *  - blue
   * @returns Color.
   */
  private getColor(alias: string): Color {
    const color = COLORS.find((c) => c.alias === alias);
    return color ? color : COLORS[0];
  }

  /**
   * Mapea los datos de los resultados para que se puedan meter en la tabla.
   */
  private mapResults({
    id,
    completeDatetime,
    canceled,
    mistakesPerLevel,
    successesPerLevel,
    timePerLevel,
    timeBetweenSuccesses,
    game,
    mgp,
    ...result
  }) {
    if (mistakesPerLevel) {
      result.mistakes = mistakesPerLevel.reduce(
        (partialSum, mistakes) => partialSum + mistakes,
        0
      );
      result.successes = successesPerLevel.reduce(
        (partialSum, successes) => partialSum + successes,
        0
      );
    }

    return result;
  }

  /**
   * Devuelve el id del resultado que se clickeó.
   */
  clickedResult(row: number) {
    let inverseResult = JSON.parse(JSON.stringify(this.results));
    const id = inverseResult.reverse()[row].id;
    this.clickedResultEvent.emit(id);
  }
}
