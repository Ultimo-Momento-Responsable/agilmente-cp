import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.scss'],
})
export class ResultCardComponent implements OnInit {
  @Input() result: any;

  totalSuccesses: number;
  totalMistakes: number;
  streak: number = null;
  constructor() { }
  
  ngOnInit() {
    if (this.result.game === "Memorilla") {
      this.totalSuccesses = this.result.successesPerLevel.reduce((a, b) => a + b, 0);
      this.totalMistakes = this.result.mistakesPerLevel.reduce((a, b) => a + b, 0);
      this.streak = this.result.streak;
    } else {
      this.totalSuccesses = this.result.successes;
      this.totalMistakes = this.result.mistakes;
    }
    
  }

}
