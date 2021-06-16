import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ResultsApiService } from '../services/results-api.service';
Chart.register(...registerables);

export interface Result {
    id: string;
    name: string;
    patient: string;
    aciertos: string;
}

export interface RootObject {
    results: Result[];
}

@Component({
    selector: 'app-results-graphs',
    templateUrl: './results-graphs.page.html',
    styleUrls: ['./results-graphs.page.scss'],
})



export class ResultsGraphsPage {
    @ViewChild('lineCumulativeCanvas') private lineCumulativeCanvas: ElementRef;
    @ViewChild('lineTimeBetweenSuccessesCanvas') private lineTimeBetweenSuccessesCanvas: ElementRef;
    id: number = 1;
    result: any;
    resultsSuccesses: number[];
    resultsMistakes: number[];
    resultsLabels: string[];
    lineCumulative: any;
    lineTimeBetweenSuccesses: any;
    constructor(private resultsApiService: ResultsApiService) { }

    ionViewWillEnter() {
        this.resultsApiService.getResultById(this.id).subscribe(res => {
            this.result = res.content;
            this.createLineCumulative();
        });

        this.resultsApiService.getResults().subscribe(res => {
            this.resultsSuccesses = res.content.map(r => r.successes);
            this.resultsMistakes = res.content.map(r => r.mistakes);
            this.resultsLabels = res.content.map((r, i) => `Partida ${i}`);
            this.createLineTimeBetweenSuccesses();
        });
    }


    createLineCumulative() {
        this.lineCumulative = new Chart(this.lineCumulativeCanvas.nativeElement, {
            type: 'line',
            data: {
                labels: this.resultsLabels,
                datasets: [{
                    label: ' Aciertos',
                    fill: false,
                    backgroundColor: 'rgba(102, 195, 95, 0.4)',
                    borderColor: 'rgba(102, 195, 95, 1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: 'rgba(102, 195, 95, 1)',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(102, 195, 95, 1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.resultsSuccesses,
                    spanGaps: false,
                }, {
                    label: 'Errores',
                    fill: false,
                    backgroundColor: 'rgba(195, 95, 95, 0.4)',
                    borderColor: 'rgba(195, 95, 95, 1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: 'rgba(195, 95, 95, 1)',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.resultsMistakes,
                    spanGaps: false,
                }
                ]
            }
        });
    }

    createLineTimeBetweenSuccesses() {
        this.lineTimeBetweenSuccesses = new Chart(this.lineTimeBetweenSuccessesCanvas.nativeElement, {
            type: 'line',
            data: {
                labels: this.result.map((r, i) => `Nivel ${i}`),
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