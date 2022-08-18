import { Component, Input, OnInit } from '@angular/core';
import { SessionMGPCalculator } from '../../models/session-mgp-calculator.model';

@Component({
  selector: 'app-planning-mgp-card',
  templateUrl: './planning-mgp-card.component.html',
  styleUrls: ['./planning-mgp-card.component.scss'],
})
export class PlanningMgpCardComponent implements OnInit {
  @Input() results: any[];
  tendencyColor: string;
  currentMGP: number;
  currentTendency: number;
  constructor() { }

  ngOnInit() {
    this.calculateMGP();
    this.tendencyColor = this.currentTendency >= 0 ? 'increment' : 'decrement';
  }

  /**
   * Calcula el MGP y la tendencia en base a los resultados.
   */
  calculateMGP() {
    const calculator = new SessionMGPCalculator(this.results);
    this.currentMGP = calculator.currentMGP();
    this.currentTendency = calculator.currentTendency();
  }
}
