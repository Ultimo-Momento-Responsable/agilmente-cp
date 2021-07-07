import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ViewChild, ElementRef } from '@angular/core';
import { ResultsApiService } from '../services/results-api.service';

import { ActivatedRoute } from "@angular/router";

Chart.register(...registerables);

@Component({
  selector: 'app-subresults',
  templateUrl: './subresults.page.html',
  styleUrls: ['./subresults.page.scss'],
})

export class SubresultsPage {
  @ViewChild('lineTimeBetweenSuccessesCanvas') private lineTimeBetweenSuccessesCanvas: ElementRef;

  id: any;
  result: any;
  lineTimeBetweenSuccesses: any;

  name: string;
  mistakes: number;
  successes: number;
  totalTime: number;
  dateTime: string;
  canceled: boolean;
  timeBetweenSuccesses: number[];
  private sub: any;

  constructor(private resultsApiService: ResultsApiService, private route: ActivatedRoute) { }

  ngOnInit() { }
  
  ionViewWillEnter() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; 
    });

    this.resultsApiService.getResultById(this.id).subscribe(res => {
        this.result = res;
        this.name = this.result.name;
        this.mistakes = this.result.mistakes;
        this.successes = this.result.successes;
        this.totalTime = this.result.totalTime;
        this.canceled = this.result.canceled;
        this.dateTime = this.result.dateTime;
        this.timeBetweenSuccesses = this.result.timeBetweenSuccesses;
        this.createLineTimeBetweenSuccesses();
    });
    
  }

  createLineTimeBetweenSuccesses() {
    this.lineTimeBetweenSuccesses = new Chart(this.lineTimeBetweenSuccessesCanvas.nativeElement, {
        type: 'line',
        data: {
            labels: this.result.timeBetweenSuccesses.map((r, i) => `Nivel ${i + 1}`),
            datasets: [{
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
            }
            ]
        }
    });
  }
}
