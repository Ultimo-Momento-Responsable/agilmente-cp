import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
  lineMemorilla: Chart;
  title: string;
  constructor(private changeDetector : ChangeDetectorRef) {}

  ngOnInit() {}

  ngOnChanges() {
    this.changeDetector.detectChanges();
    if (this.result.timeBetweenSuccesses){
      this.title = "Tiempo entre aciertos";
      this.createLineTimeBetweenSuccesses();
    }
    if (this.result.game==="Memorilla"){
      this.title = "Estadísticas por nivel";
      this.createLineMemorilla();
    }
  }

  /**
   * Crea un gráfico con el tiempo entre aciertos.
   */
   createLineTimeBetweenSuccesses() {
    Chart.register(...registerables);
    let graphResults = JSON.parse(JSON.stringify(this.result.timeBetweenSuccesses));
    let label = graphResults.map((r, i) => `Nivel ${i + 1}`);
    if (this.result.timeBetweenSuccesses.length == 1) {
      graphResults.push(JSON.parse(JSON.stringify(this.result.timeBetweenSuccesses[0])));
      label.push("");
    }
    this.lineTimeBetweenSuccesses = new Chart(
      this.lineTimeBetweenSuccessesCanvas.nativeElement,
      {
        type: 'line',
        data: {
          labels: label,
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
              data: graphResults,
              spanGaps: false,
            },
          ],
        },
      }
    );
  }

  /**
   * Crea un gráfico con el tiempo entre aciertos.
   */
  createLineMemorilla() {
    Chart.register(...registerables);
    let graphTimePerLevel = JSON.parse(JSON.stringify(this.result.timePerLevel));
    let graphSuccessesPerLevel = JSON.parse(JSON.stringify(this.result.successesPerLevel));
    let graphMistakesPerLevel = JSON.parse(JSON.stringify(this.result.mistakesPerLevel));
    let label = graphTimePerLevel.map((r, i) => `Nivel ${i + 1}`);
    this.lineMemorilla = new Chart(
      this.lineTimeBetweenSuccessesCanvas.nativeElement,
      {
        type: 'line',
        data: {
          labels: label,
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
              data: graphTimePerLevel,
              spanGaps: false,
            },
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
              data: graphSuccessesPerLevel,
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
              data: graphMistakesPerLevel,
              spanGaps: false,
            },
          ],
        },
      }
    );
  }
}
