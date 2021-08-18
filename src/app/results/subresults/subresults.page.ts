import { ChangeDetectorRef, Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ViewChild, ElementRef } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ResultsApiService } from '../shared-results/services/results-api/results-api.service';

@Component({
  selector: 'app-subresults',
  templateUrl: './subresults.page.html',
  styleUrls: ['./subresults.page.scss'],
})
export class SubresultsPage {
  lineTimeBetweenSuccesses: Chart;
  @ViewChild('lineTimeBetweenSuccessesCanvas')
  private lineTimeBetweenSuccessesCanvas: ElementRef;
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
      this.changeDetector.detectChanges();
      this.createLineTimeBetweenSuccesses();
    });
  }

  createLineTimeBetweenSuccesses() {
    Chart.register(...registerables);
    this.lineTimeBetweenSuccesses = new Chart(
      this.lineTimeBetweenSuccessesCanvas.nativeElement,
      {
        type: 'line',
        data: {
          labels: this.result.timeBetweenSuccesses.map(
            (r, i) => `Nivel ${i + 1}`
          ),
          datasets: [
            {
              label: 'Tiempo (segundos)',
              fill: false,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: this.result.timeBetweenSuccesses,
              spanGaps: false,
            },
          ],
        },
      }
    );
  }
}
