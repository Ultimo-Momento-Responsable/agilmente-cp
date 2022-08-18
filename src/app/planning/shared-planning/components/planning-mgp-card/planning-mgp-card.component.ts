import { Component, Input, OnInit } from '@angular/core';
import { PlanningItem } from 'src/app/planning/specific-planning/specific-planning.page';
import { SessionMGPCalculator } from '../../models/session-mgp-calculator.model';

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
    const calculator = new SessionMGPCalculator(this.results.map(r => r.mgp));
    this.currentMGP = calculator.currentMGP();
    this.currentTendency = calculator.currentTendency();
  }
}
