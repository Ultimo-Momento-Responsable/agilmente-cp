import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-graph-results',
  templateUrl: './graph-results.component.html',
  styleUrls: ['./graph-results.component.scss'],
})
export class GraphResultsComponent implements OnInit {
  @ViewChild('lineTimeBetweenSuccessesCanvas')
  lineTimeBetweenSuccessesCanvas: ElementRef;
  @Input() result: any;
  lineTimeBetweenSuccesses: Chart;

  constructor(private changeDetector : ChangeDetectorRef) {}

  ngOnInit() {}

  ngOnChanges() {
    this.changeDetector.detectChanges();
    this.createLineTimeBetweenSuccesses();
  }

  /**
   * Crea un gráfico con el tiempo entre aciertos.
   */
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
