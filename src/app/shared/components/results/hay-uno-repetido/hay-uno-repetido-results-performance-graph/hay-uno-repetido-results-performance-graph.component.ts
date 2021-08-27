import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-hay-uno-repetido-results-performance-graph',
  templateUrl: './hay-uno-repetido-results-performance-graph.component.html',
  styleUrls: ['./hay-uno-repetido-results-performance-graph.component.scss'],
})
export class HayUnoRepetidoResultsPerformanceGraphComponent
  implements AfterViewInit
{
  @ViewChild('lineCumulativeCanvas') private lineCumulativeCanvas: ElementRef;
  @Input() results;
  lineCumulative: any;
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.createLineCumulative();
  }

  /**
   * Dibuja el gráfico de resultados históricos del paciente.
   */
  createLineCumulative() {
    Chart.register(...registerables);
    this.lineCumulative = new Chart(this.lineCumulativeCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.results.map((r, i) => `Partida ${i + 1}`),
        datasets: [
          {
            label: 'Aciertos',
            backgroundColor: 'rgba(102, 195, 95, 0.4)',
            borderColor: 'rgba(102, 195, 95, 1)',
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
            data: this.results.map((r) => r.successes),
            spanGaps: false,
          },
          {
            label: 'Errores',
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
            data: this.results.map((r) => r.mistakes),
            spanGaps: false,
          },
        ],
      },
    });
  }
}
