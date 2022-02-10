import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { EncuentraAlNuevoResultsPerformanceGraphComponent } from 'src/app/shared/components/results/encuentra-al-nuevo/encuentra-al-nuevo-results-performance-graph/encuentra-al-nuevo-results-performance-graph.component';
import { EncuentraAlNuevoResultsTimeGraphComponent } from 'src/app/shared/components/results/encuentra-al-nuevo/encuentra-al-nuevo-results-time-graph/encuentra-al-nuevo-results-time-graph.component';

@Component({
  selector: 'app-card-encuentra-al-nuevo-result',
  templateUrl: './card-encuentra-al-nuevo-result.component.html',
  styleUrls: ['./card-encuentra-al-nuevo-result.component.scss'],
})
export class CardEncuentraAlNuevoResultComponent implements OnInit {
    @Input() results; 
    @ViewChild(EncuentraAlNuevoResultsPerformanceGraphComponent) pGraph : EncuentraAlNuevoResultsPerformanceGraphComponent;
    @ViewChild(EncuentraAlNuevoResultsTimeGraphComponent) tGraph : EncuentraAlNuevoResultsTimeGraphComponent;
    
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
