import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-game-result',
  templateUrl: './card-game-result.component.html',
  styleUrls: ['./card-game-result.component.scss'],
})
export class CardGameResultComponent implements OnInit {
    @Input() results;

  constructor() { }

  ngOnInit() {}

}
