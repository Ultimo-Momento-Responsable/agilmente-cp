import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-session-card',
  templateUrl: './game-session-card.component.html',
  styleUrls: ['./game-session-card.component.scss'],
})
export class GameSessionCardComponent implements OnInit {
  tendency: string;
  constructor() { }

  ngOnInit() {
    this.tendency = 'increment';
  }

}
