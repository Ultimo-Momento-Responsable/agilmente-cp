import { Component, Input, OnInit } from '@angular/core';
import { PlanningItem } from 'src/app/planning/specific-planning/specific-planning.page';

@Component({
  selector: 'app-planning-mgp-card',
  templateUrl: './planning-mgp-card.component.html',
  styleUrls: ['./planning-mgp-card.component.scss'],
})
export class PlanningMgpCardComponent implements OnInit {
  @Input() results: any[];
  currentMGP: number;
  currentTendency: number;
  constructor() { }

  ngOnInit() {
    this.calculateMGP();
  }

  /**
   * Calcula el MGP y la tendencia en base a los resultados.
   */
  calculateMGP() {
    const partialSumMGP = this.results.map(r => r.mgp)
      .reduce((previous, current) => previous + current);
    const n = this.results.length;

    this.currentMGP = 1/n * partialSumMGP;

    const previousMGP = 1/(n -1) * (partialSumMGP-this.results[n-1].mgp);
    this.currentTendency = this.currentMGP - previousMGP;
  }
}
