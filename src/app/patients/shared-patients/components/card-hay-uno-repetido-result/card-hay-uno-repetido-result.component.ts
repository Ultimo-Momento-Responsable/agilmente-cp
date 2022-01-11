import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HayUnoRepetidoResultsPerformanceGraphComponent } from 'src/app/shared/components/results/hay-uno-repetido/hay-uno-repetido-results-performance-graph/hay-uno-repetido-results-performance-graph.component';
import { HayUnoRepetidoResultsTimeGraphComponent } from 'src/app/shared/components/results/hay-uno-repetido/hay-uno-repetido-results-time-graph/hay-uno-repetido-results-time-graph.component';
@Component({
  selector: 'app-card-hay-uno-repetido-result',
  templateUrl: './card-hay-uno-repetido-result.component.html',
  styleUrls: ['./card-hay-uno-repetido-result.component.scss'],
})
export class CardHayUnoRepetidoResultComponent implements OnInit {
    @Input() results;
    @ViewChild(HayUnoRepetidoResultsPerformanceGraphComponent) pGraph : HayUnoRepetidoResultsPerformanceGraphComponent;
    @ViewChild(HayUnoRepetidoResultsTimeGraphComponent) tGraph : HayUnoRepetidoResultsTimeGraphComponent;

  constructor() { }
  resultsSelected: number = -1;
  finalResults: [];
  selectedValue: number;
  ngOnInit() {
    this.selectedValue = -1;
    this.finalResults = this.results.results;
  }
  optionsFn(event) {
    this.selectedValue = parseInt(event.target.value);
    if (this.selectedValue != -1) {
      this.finalResults = this.results.results.slice(this.selectedValue * -1)
    } else {
      this.finalResults = this.results.results
    }
    this.pGraph.lineCumulative.destroy();
    this.pGraph.results = this.finalResults;
    this.pGraph.createLineCumulative();
    this.tGraph.lineCumulative.destroy();
    this.tGraph.results = this.finalResults;
    this.tGraph.createLineCumulative();
  }
}
