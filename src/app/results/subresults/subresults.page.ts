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
        res.timeBetweenSuccesses = [12, 24, 25, 23, 23, 12];
      this.result = res;
      this.changeDetector.detectChanges();
    });
  }
}
