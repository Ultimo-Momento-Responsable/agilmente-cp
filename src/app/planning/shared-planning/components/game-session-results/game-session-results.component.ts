import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-session-results',
  templateUrl: './game-session-results.component.html',
  styleUrls: ['./game-session-results.component.scss'],
})
export class GameSessionResultsComponent implements OnInit {
  // results: any[] = [
  //   {
  //     id: 1,
  //     successes: 5,
  //     mistakes: 4,
  //     totalTime: 5,
  //     timeBetweenSuccesses: [1, 2, 2, 1, 2],
  //     completeDatetime: new Date()
  //   },
  //   {
  //     id: 2,
  //     successes: 5,
  //     mistakes: 4,
  //     totalTime: 5,
  //     timeBetweenSuccesses: [1, 2, 2, 1, 2],
  //     completeDatetime: new Date(),
  //   },
  //   {
  //     id: 4,
  //     successes: 5,
  //     mistakes: 4,
  //     totalTime: 5,
  //     timeBetweenSuccesses: [1, 2, 2, 1, 2],
  //     completeDatetime: new Date(),
  //   },
  // ];

  results: any[] = [
    {
      id: 1,
      successesPerLevel: [1, 2, 2, 1, 2],
      mistakesPerLevel: [1, 2, 2, 1, 2],
      totalTime: 5,
      timePerLevel: [1, 2, 2, 1, 2],
      completeDatetime: new Date(),
    },
    {
      id: 1,
      successesPerLevel: [1, 2, 2, 1, 2],
      mistakesPerLevel: [1, 2, 2, 1, 2],
      totalTime: 5,
      timePerLevel: [1, 2, 2, 1, 2],
      completeDatetime: new Date(),
    },
    {
      id: 1,
      successesPerLevel: [1, 2, 2, 1, 2],
      mistakesPerLevel: [1, 2, 2, 1, 2],
      totalTime: 5,
      timePerLevel: [1, 2, 2, 1, 2],
      completeDatetime: new Date(),
    },
  ];

  constructor() {}

  ngOnInit() {
  }
}
