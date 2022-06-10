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
  @Input() pointLabelPrefix: string = 'Partida N°';
  @Input() tabs: string[][];
  @Input() hasTabs: boolean = false;
  @Output() clickedPointEvent = new EventEmitter<any>();
  isOnlyOneResult: boolean = false;
  selectedTab: number;
  labels: string[];
  showDatasets: Dataset[];
  graph: Chart;
  constructor() {}

  ngOnInit() {
    Chart.register(...registerables);
    this.labels = this.datasets[0].data.map(
      (d, i) => `${this.pointLabelPrefix}${i + 1}`
    );
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

  getTab() {
    this.showDatasets = this.tabs[this.selectedTab].map((t) =>
      this.datasets.find((d) => d.reference === t)
    );
    this.createGraph(this.showDatasets);
  }

  fixOnlyOnePointGraph() {
    if (this.datasets[0].data.length === 1) {
      this.isOnlyOneResult = true;
      this.datasets.forEach((d) => {
        d.data.push(d.data[0]);
      });
      this.labels.push(this.labels[0]);
    }
  }

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
    });
  }

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
