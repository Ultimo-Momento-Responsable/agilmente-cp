import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-encuentra-al-nuevo-results-time-graph',
  templateUrl: './encuentra-al-nuevo-results-time-graph.component.html',
  styleUrls: ['./encuentra-al-nuevo-results-time-graph.component.scss'],
})
export class EncuentraAlNuevoResultsTimeGraphComponent implements AfterViewInit {
  @ViewChild('lineCumulativeCanvas') private lineCumulativeCanvas: ElementRef;
  @Input() results;
  lineCumulative: any;
  constructor() { }

  ngOnInit() {}

  ngAfterViewInit(){
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
                data: this.results.map((r) => r.totalTime),
                spanGaps: false,
              },
        ],
      },
    });
  }

}
