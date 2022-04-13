import { Component, OnInit } from '@angular/core';
import { GamesApiService } from '../services/games-api.service';
import { ActivatedRoute, Router } from '@angular/router';

export interface Game {
  id: number;
  name: string;
  description: string;
  paramDescription: string;
  cognitiveDomain: any[];
  gameParam: any[];
  params: any[];
}

@Component({
  selector: 'app-specific-game',
  templateUrl: './specific-game.page.html',
  styleUrls: ['./specific-game.page.scss'],
})
export class SpecificGamePage implements OnInit {
  id: number;
  specificGame: Game;

  constructor(
    private gamesApiService: GamesApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.gamesApiService.getGameById(this.id).subscribe((res) => {
        this.specificGame = res;
      });
    });
  }
  // Obtiene un juego y devuelve el nombre del archivo PNG del ícono
  // @param game Objeto juego
  getGameThumb(game) {
    let gameNameFormatted : string = game.name.toLowerCase();
    gameNameFormatted = gameNameFormatted.replace(/\s/g, '_');
    return( "../../../assets/pictures/" + gameNameFormatted + "_icon.png");
  }
}