import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-graph',
  templateUrl: './progress-graph.component.html',
  styleUrls: ['./progress-graph.component.scss'],
})
export class ProgressGraphComponent {
  @Input() progress = 0;
  @Input() text = '--';

  constructor() { }
  
}