import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Chart, ChartDataset, registerables } from 'chart.js';
export const COLORS: Color[] = [
  {
    alias: 'blue',
    value: 'rgba(75,192,192,1)',
    valueLight: 'rgba(75,192,192,0.4)',
  },
  {
    alias: 'success',
    value: 'rgba(102, 195, 95, 1)',
    valueLight: 'rgba(102, 195, 95, 0.4)',
  },
  {
    alias: 'danger',
    value: 'rgba(235,68,90,1)',
    valueLight: 'rgba(235,68,90,0.4)',
  },
  {
    alias: 'warning',
    value: 'rgba(255,196,9,1)',
    valueLight: 'rgba(255,196,9,0.4)',
  },
];

export interface Color {
  alias: string;
  value: string;
  valueLight?: string;
}
export interface Dataset {
  data: number[];
  lineColor: Color;
  reference: string;
}

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements AfterViewInit, OnInit {
  @ViewChild('lineGraph')
  graphEl: ElementRef;
  @Input() datasets: Dataset[];
  @Input() withBorders = true;
  @Input() maxHeight;
  @Input() pointLabelPrefix: string = 'Partida N°';
  @Input() unit: string = 'partidas';
  @Input() isUnitFemale = true;
  @Input() tabs: string[][];
  @Input() hasTabs: boolean = false;
  @Input() max = null;
  @Input() min = null;
  @Output() clickedPointEvent = new EventEmitter<any>();
  numberOfPoints: string = 'all';
  isOnlyOneResult: boolean = false;
  selectedTab: number;
  labels: string[];
  showDatasets: Dataset[];
  graph: Chart;
  constructor() {}

  ngOnInit() {
    Chart.register(...registerables);
    this.getLabels();
    this.fixOnlyOnePointGraph();

    if (this.hasTabs) {
      this.selectedTab = 0;
    } else {
      this.showDatasets = this.datasets;
    }
  }

  ngAfterViewInit() {
    if (this.hasTabs) {
      this.getTab();
    } else {
      this.createGraph(this.showDatasets);
    }
  }

  /**
   * Crea los labels para los gráficos.
   */
  private getLabels() {
    if (this.numberOfPoints === 'all' || this.isOnlyOneResult) {
      this.labels = this.datasets[0].data.map(
        (d, i) => `${this.pointLabelPrefix}${i + 1}`
      );
    } else {
      const end = this.datasets[0].data.length;
      const start = end > parseInt(this.numberOfPoints) ? end - parseInt(this.numberOfPoints) : 0;
      this.labels = [];
      for(let i = start; i < end; i ++) {
        this.labels.push(`${this.pointLabelPrefix}${i+1}`);
      }
    }
  }

  /**
   * Actualiza el gráfico cuandos se cambia de tab.
   */
  getTab() {
    this.getLabels();
    this.showDatasets = this.tabs[this.selectedTab].map((t) => {
      if (this.numberOfPoints === 'all' || this.isOnlyOneResult) {
        return this.datasets.find((d) => d.reference === t);
      } else {
        const end = this.datasets[0].data.length;
        const start = end > parseInt(this.numberOfPoints) ? end - parseInt(this.numberOfPoints) : 0;
        const dataset = JSON.parse(JSON.stringify(this.datasets.find((d) => d.reference === t)));
        dataset.data = dataset.data.slice(start, end);
        return dataset;
      }
    });
    this.createGraph(this.showDatasets);
  }

  /**
   * Arregla el gráfico para que se vea bien cuando solamente hay 
   * un resultado.
   */
  fixOnlyOnePointGraph() {
    if (this.datasets[0].data.length === 1) {
      this.isOnlyOneResult = true;
      this.datasets.forEach((d) => {
        d.data.push(d.data[0]);
      });
      this.labels.push(this.labels[0]);
    }
  }

  /**
   * Crea un gráfico a partir de los datasets disponibles.
   * @param datasets Conjunto de datos a mostrar.
   */
  private createGraph(datasets: Dataset[]) {
    if (this.graph) {
      this.graph.destroy();
    }
    this.graph = new Chart(this.graphEl.nativeElement, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: datasets.map(this.mapDatasets),
      },
      options: {
        scales: {
          x: {},
          y: {
            min: this.min,
            max: this.max
          }
        }
      }
    });
  }

  /**
   * Mapea los datasets a datos que pueda procesar chart.js.
   * @param dataset Conjunto de datos a mostrar.
   * @returns Conjunto de datos formateados para chart.js.
   */
  private mapDatasets(dataset: Dataset): ChartDataset<'line', number[]> {
    return {
      label: dataset.reference,
      fill: false,
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: dataset.data,
      spanGaps: false,
      borderColor: dataset.lineColor.value,
      pointBorderColor: dataset.lineColor.value,
      pointBackgroundColor: dataset.lineColor.value,
      pointHoverBackgroundColor: dataset.lineColor.value,
      backgroundColor: dataset.lineColor.valueLight
        ? dataset.lineColor.valueLight
        : dataset.lineColor.value,
      pointHoverBorderColor: dataset.lineColor.valueLight
        ? dataset.lineColor.valueLight
        : dataset.lineColor.value,
    };
  }

  /**
   * Handler de cuando el usuario hace click en el gráifico.
   * Emite un evento cuando se hace click en un punto.
   */
  onChartClick() {
    const point = this.graph.getActiveElements()[0];
    if (point) {
      if (this.isOnlyOneResult) {
        this.clickedPointEvent.emit(0);
      } else {
        this.clickedPointEvent.emit(point.index);
      }
    }
  }
}
