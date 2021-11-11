import { ChangeDetectorRef, Component } from '@angular/core';
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

  constructor(
    private resultsApiService: ResultsApiService,
    private route: ActivatedRoute,
    private changeDetector : ChangeDetectorRef
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
      this.result.timeBetweenSuccesses = this.result.timeBetweenSuccesses.map(function(r){
        return Number(r.toFixed(2));
      });
      this.changeDetector.detectChanges();
    });
  }
}
