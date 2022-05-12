import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent implements OnInit {
  @Input() game: any;
  constructor(private navController: NavController) { }
  imgSrc: string = "";

  ngOnInit() {
    let gameNameFormatted : string = this.game.name.toLowerCase();
    gameNameFormatted = gameNameFormatted.replace(/\s/g, '_');
    this.imgSrc = "../../../../../assets/pictures/" + gameNameFormatted + "_thumbnail.png";

  }

  /**
   * Redirije al usuario a la página de detalle paciente.
   */
   goToGameDetail() {
    this.navController.navigateForward(['/games/', this.game.id]);
  }
}
