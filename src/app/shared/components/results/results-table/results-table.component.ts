import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IResult } from 'src/app/shared/interfaces/result.interface';

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.scss'],
})
export class ResultsTableComponent implements OnInit {
  @Input() results: IResult[];
  @Input() reversed: boolean = false;
  @Output() clickedResultEvent = new EventEmitter<number>();
  filteredResults: any[];
  columns: string[];

  constructor() {}

  ngOnInit() {
    if (this.reversed) {
      this.results = this.results.reverse();
    }
    this.getColumnsForTable();
  }

  /**
   * Obtiene y formatea los datos para la tabla.
   */
  getColumnsForTable() {
    this.filteredResults = this.results.map(this.mapResults);
    this.columns = Object.keys(this.filteredResults[0]);
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
  clickedResult(row: any) {
    const id = this.results[row['Nro. partida'] - 1].id;
    this.clickedResultEvent.emit(id);
  }
}