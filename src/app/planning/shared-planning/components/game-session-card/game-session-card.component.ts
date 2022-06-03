import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-session-card',
  templateUrl: './game-session-card.component.html',
  styleUrls: ['./game-session-card.component.scss'],
})
export class GameSessionCardComponent implements OnInit {
  tendency: string;
  params = [
    {
      name: "Nivel Maximo",
      value: 999,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
    },
    {
      name: "Nivel",
      value: 999,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque id egestas dolor. Quisque egestas vehicula turpis, ac maximus ante. Fusce in orci in ligula viverra tempor non porta est. "
    },
    {
      name: "Tu Hermana",
      value: "Oye, si",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque id egestas dolor."
    },
    {
      name: "Nivel Maximo",
      value: 999,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque id egestas dolor. Quisque egestas vehicula turpis, ac maximus ante. Fusce in orci in ligula viverra tempor non porta est. Nulla feugiat ex et convallis sagittis."
    },
  ];
  constructor() { }

  ngOnInit() {
    this.tendency = 'increment';
  }

}
