import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResultsApiService } from '../shared-results/services/results-api/results-api.service';

@Component({
  selector: 'app-subresults',
  templateUrl: './subresults.page.html',
  styleUrls: ['./subresults.page.scss'],
})
export class SubresultsPage {
  resultId: number;
  gameRoute: string;
  result: any;
  totalSuccesses: number;
  totalMistakes: number;
  constructor(
    private resultsApiService: ResultsApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
        this.resultId = params['id'];
        this.gameRoute = params['gameRoute'];
    });
  }

  ionViewWillEnter() {
    this.resultsApiService.getResultById(this.resultId, this.gameRoute).subscribe((res) => {
      this.result = res;
      this.result.totalTime = this.result.totalTime.toFixed(2);
      if (this.result.game === "Memorilla") {
        this.totalSuccesses = this.result.successesPerLevel.reduce((a, b) => a + b, 0);
        this.totalMistakes = this.result.mistakesPerLevel.reduce((a, b) => a + b, 0);
        this.result.timePerLevel = this.result.timePerLevel.map(function(r){
          return Number(r.toFixed(2));
        });
      } else {
        this.result.timeBetweenSuccesses = this.result.timeBetweenSuccesses.map(function(r){
          return Number(r.toFixed(2));
        });
        this.totalSuccesses = this.result.successes;
        this.totalMistakes = this.result.mistakes;
      }
    });
  }
  checkIfDataExists() : boolean {
    return (this.result.timeBetweenSuccesses && this.result.timeBetweenSuccesses?.length > 0) || (this.result.timePerLevel && this.result.timePerLevel?.length > 0);
  }
}
