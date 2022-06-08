import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.scss'],
})
export class ResultsTableComponent implements OnInit {
  @Input() results: any[];
  filteredResults: any[];
  columns: string[];

  constructor() { }

  ngOnInit() {
    this.getColumnsForTable();
  }

  getColumnsForTable() {
    this.filteredResults = this.results.map(this.mapResults);
    this.columns = Object.keys(this.filteredResults[0]);
  }

  private mapResults({id, completeDatetime, canceled, mistakesPerLevel, successesPerLevel, timePerLevel, timeBetweenSuccesses, ...result}) {
    if (mistakesPerLevel) {
      result.mistakes = mistakesPerLevel.reduce((partialSum, mistakes) => partialSum + mistakes, 0); 
      result.successes = successesPerLevel.reduce((partialSum, successes) => partialSum + successes, 0); 
    }
    
    return result;
  }
}
