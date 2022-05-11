import { Component, OnInit, ViewChild } from '@angular/core';
import { GamesApiService } from '../services/games-api.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { IonSlides} from '@ionic/angular';

export interface Game {
  id: number;
  name: string;
  description: string;
  paramDescription: string;
  cognitiveDomain: any[];
  gameParam: any[];
  params: any[];
}

export interface SlideImg {
  img: String;
}

@Component({
  selector: 'app-specific-game',
  templateUrl: './specific-game.page.html',
  styleUrls: ['./specific-game.page.scss'],
})
export class SpecificGamePage implements OnInit {
  id: number;
  specificGame: Game;
  gameThumb: String;
  gameDescription: String;
  hasActivatable: any;
  hasType3: any;

  slideImg = [];

  constructor(
    private gamesApiService: GamesApiService,
    private route: ActivatedRoute,
    private httpClient: HttpClient
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.gamesApiService.getGameById(this.id).subscribe((res) => {
        this.specificGame = res;
        this.gameThumb = this.getGameThumb(res);
        this.getGameDescription(res);
        this.findActivatable(res);
        this.findType3(res);
        this.getGameScreenshot(res);
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

  // Obtiene un juego y devuelve la explicación detallada desde el JSON
  // ubicada en la carpeta assets.
  // @param game Objeto juego
  getGameDescription(game) {
    let gameData: any [];
    let URL = "../../../assets/games.json";
    this.httpClient.get(URL).subscribe(data =>{
        gameData = JSON.parse(JSON.stringify(data));;
        this.gameDescription = gameData[this.id-1].description;
    })
  }

  // Obtiene un juego y guarda en una variable si tiene parámetros del tipo 1
  // @param game Objeto juego
  findActivatable(game) {
    this.hasActivatable = this.specificGame.params.find( result => {
      return result.type === 1;
    })
  }

  // Obtiene un juego y guarda en una variable si tiene parámetros del tipo 3
  // @param game Objeto juego
  findType3(game) {
    this.hasType3 = this.specificGame.params.find( result => {
      return result.type === 3;
    })
  }
  
  @ViewChild('Slides') slides: IonSlides;
  // Mueve los slides un espacio hacia atras
  slidePrev() {
    this.slides.getActiveIndex().then((index: number) => {
      this.slides.slideTo(index -= 1)
    });
  }

  // Mueve los slides un espacio hacia adelante
  slideNext() {
    this.slides.getActiveIndex().then((index: number) => {
      this.slides.slideTo(index += 1)
    });
  }

  // Obtiene un juego y llena el array de screenshots para el slides
  // @param game Objeto juego
  getGameScreenshot(game) {
    let gameNameFormatted : string = game.name.toLowerCase();
    gameNameFormatted = gameNameFormatted.replace(/\s/g, '_');
    for (let i = 1; i < 6; i++) {
      const img: SlideImg = {
        img: `../../../assets/pictures/${gameNameFormatted}/SS${i}.png`
      }
      this.slideImg.push(img);
    }
  }
}
