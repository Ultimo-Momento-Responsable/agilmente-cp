import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-custom-difficulty',
  templateUrl: './custom-difficulty.component.html',
  styleUrls: ['./custom-difficulty.component.scss'],
})
export class CustomDifficultComponent implements OnInit {
  @Input() game: any;
  @Input() planningGames: any[];
  @Input() assignedGames: any[];
  @Input() j: number;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.game.gameParam.forEach(p => {
      if (p.param.type==0 && p.isActive){
        this.game.index = p.param.id - 1;
      }
    })
  }

  // Para los params tipo 0, activa uno, en caso de que se haya tildado
  setActiveParam(game, p, index){
    game.index = index;
    game.gameParam.forEach(param => {
      if (param.id == p.id) {
        if (!param.isActive) {
          param.isActive = true;
        }
      } else {
        param.isActive = false;
      }
    });
  }

  changeParamType2(event,p) {
    p.value=event.target.value+1;
  }

  // Actualiza el valor del Param
  changeParamValue(game,p,evt){
    let gameChanged = this.planningGames[this.planningGames.indexOf(game)];
    if (gameChanged.gameParam[gameChanged.gameParam.indexOf(p)].isActive) {
      gameChanged.gameParam[gameChanged.gameParam.indexOf(p)].value = evt.srcElement.value;
    }

    // Define la máxima cantidad de estímulos para Memorilla
    if (p.param.name == "Número de filas" || p.param.name == "Número de columnas") {
      let nOfRows = 3;
      let nOfColumns = 3;
      game.gameParam.forEach(p => {
        if (p.param.name == "Número de filas"){
          nOfRows = p.value;
        }
        if (p.param.name == "Número de columnas"){
          nOfColumns = p.value;
        }
        if (p.param.name == "Cantidad Máxima de Estímulos") {
          let maxValue = Math.round((nOfColumns*nOfRows)/2)
          if (maxValue < 15){
            p.maxValue = maxValue;
          } else {
            p.maxValue = 15;
          }
          p.value=((p.minValue + p.maxValue) / 2).toFixed(0);
        }
      });
    }

    // Define la máxima cantidad de estímulos para EAR
    if (game.name == "Encuentra al Repetido") {
      let maxLvl : number = 3;
      let currentValue : number = 3;
      game.gameParam.forEach(p => {
        if (p.param.name == "Nivel Máximo"){
          maxLvl = +p.value;
        }

        if (p.param.name == "Cantidad Máxima de Estímulos") {
          let upperBound = maxLvl+3;
          if (maxLvl < 17) {
            p.maxValue = upperBound;
          } else {
            p.maxValue = 20;
          }
          
          currentValue = +p.value;
          if (currentValue > upperBound) {
            p.value = upperBound;
          }
        }
      });
    }
  }

  // Checkea que el valor máximo en el parámetro no sea negativo y si no lo es, se 
  checkMaxValue(p) : number {
    if (p.maxValue <= -1){
      return undefined
    } else{
      return p.maxValue
    }
  }

  // Asegura que el param ingresado respeta los valores mínimos y máximos y si no es así lo cambia
  checkParamLimit(p){
    if (parseInt(p.value) < p.minValue) {
      p.value = p.minValue.toString();
    }
    if (p.maxValue != -1) {
      if (parseInt(p.value) > p.maxValue) {
        p.value = p.maxValue.toString();
      }
    }
  }

  // Setea el número máximo de sesiones de juego
  changeParamsType1(game,p,evt) {
    let gameChanged = this.planningGames[this.planningGames.indexOf(game)];
    gameChanged.gameParam[gameChanged.gameParam.indexOf(p)].value = !gameChanged.gameParam[gameChanged.gameParam.indexOf(p)].value;
  }

  // Checkea que el juego esté correctamente cargado
  checkIfCorrect(game) : boolean{
    let flag = false;
    game.gameParam.forEach(p => {
      if (p.param.type == 0){
        if (p.isActive){
          if (p.value){
            flag = true;
          }
        }
      } else{
        p.isActive = true;
      }
    });
    if (flag){
      this.assignedGames.forEach(g => {
        if (JSON.stringify(g.gameParam) == JSON.stringify(game.gameParam) 
              && g.name == game.name
              && game.hasLimit == g.hasLimit 
              && game.maxNumberOfSessions == g.maxNumberOfSessions) {
          flag = false;
        }
      })
    }
    return flag;
  }

  // Cierra el modal para agregar el juego.
  closeModal() { 
    this.modalCtrl.dismiss(true);
  }
}
