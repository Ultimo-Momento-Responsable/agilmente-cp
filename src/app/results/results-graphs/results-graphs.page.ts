import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ResultsPage } from '../results.page';
import { Chart, registerables } from 'chart.js';
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
  results: any;
  lineCumulative: any;
  lineTimeBetweenSuccesses: any;
  constructor(private http: HttpClient) {}

  ionViewWillEnter() {
    this.getResults().subscribe(res =>{
      this.results = res;
      this.createLineCumulative();
      this.createLineTimeBetweenSuccesses();
    });
  }

  getResults(){
    return this.http
    .get("assets/results.json")
    .pipe(
      map((res:any) => {
        return res.results[this.id];
      })
    )
  }

    createLineCumulative() {
      this.lineCumulative = new Chart(this.lineCumulativeCanvas.nativeElement, {
        type: 'line',
        data: {
          labels: ['Partida 1', 'Partida 2', 'Partida 3', 'Partida 4', 'Partida 5', 'Partida 6', 'Partida 7'],
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
              data: [16, 16, 24, 24, 24, 24, 32],
              spanGaps: false,
            },{
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
              data: this.results.timeBetweenSuccesses,
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
          labels: ['Nivel 1', 'Nivel 2'],
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
              data: this.results.timeBetweenSuccesses,
              spanGaps: false,
            }
          ]
        }
      });
    }
  }