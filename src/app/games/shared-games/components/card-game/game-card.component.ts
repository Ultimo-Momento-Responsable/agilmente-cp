import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent implements OnInit {
  @Input() game: any;
  constructor() { }
  imgSrc: string = "";

  ngOnInit() {
    let gameNameFormatted : string = this.game.name.toLowerCase();
    gameNameFormatted = gameNameFormatted.replace(/\s/g, '_');
    this.imgSrc = "../../../../../assets/pictures/" + gameNameFormatted + "_thumbnail.png";

  }
}
