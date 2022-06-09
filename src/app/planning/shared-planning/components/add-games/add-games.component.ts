import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { encuentraAlNuevo } from '../../constants/difficulty-level';
import { encuentraAlRepetido } from '../../constants/difficulty-level';
import { memorilla } from '../../constants/difficulty-level';
import { CustomDifficultComponent } from '../custom-difficulty/custom-difficulty.component';


@Component({
  selector: 'app-add-games',
  templateUrl: './add-games.component.html',
  styleUrls: ['../../../new-planning/new-planning.page.scss'],
})
export class AddGamesComponent {
  @Input() games: any[];
  @Input() gamesSearch: any[];
  @Input() assignedGames: any [] = [];
  @Input() planningGames: any [] = [];
  @Output() effectiveGames = new EventEmitter<any[]>();
  @Output() intermediateGames = new EventEmitter<any[]>();
  @Output() nullGames = new EventEmitter();

  currentGame: any;
  shouldOpenModal: boolean = true;
  isAdding: boolean = true;

  constructor(public modalCtrl: ModalController) {}

  /**
   * Descubre que juego esta activo en este momento
   * @param index Índice de la pestaña activa en la página
   */
  switchTab(index) {
    this.currentGame = index;
    this.filterGameByString('');
  }

  /**
   * Verifica que la tab actual sea la del juego correspondiente
   * @param index número de tab
   * @returns true o false según corresponda
   */
  checkTab(index) {
    if (index == this.currentGame) {
      return true;
    }
    return false;
  }

  /**
   * Setea la dificultad seleccionada para el juego seleccionado.
   * @param event dificultad seleccionada.
   * @param game juego
   * @param j índice de juego.
   */
  setDifficulty(event, game:any, j: number) {
    let dif: any;
    game.difficulty = event.target.value
    if (game.difficulty != "custom"){
      this.shouldOpenModal = true;
      switch (game.name){
        case "Encuentra al Nuevo":
          dif = encuentraAlNuevo[game.difficulty];
          break;
        case "Encuentra al Repetido":
          dif = encuentraAlRepetido[game.difficulty];
          break;
        case "Memorilla":
          dif = memorilla[game.difficulty];
          break;
      }
      game.difficultDescription = dif?.description
      game.gameParam.forEach(p => {
        for (let pDif of dif.params) {
          if (p.param.className==pDif.name){
            p.isActive = true;
            p.value = pDif.value;
            break;
          }
        }
      });
      this.gameAdded(game,j);
    } else{
      if (this.shouldOpenModal){
        this.openCustomDifficult(game,j);
      }
    }
  }
  
  /**
   * Filtra juegos mediante el nombre a través del parámetro recibido
   * @param search String del nombre de juego que se busca
   */
  filterGameByString(search) {
    this.gamesSearch = this.games.filter((g)=> {
      if (this.gamesSearch){
        return ((g.name.toLowerCase()).indexOf(search.toLowerCase()) > -1 )
      }
    })
  }

  /** 
   * Añade el juego seleccionado a la lista de juegos asignados.
   */ 
  addGame(game) {
    this.gamesSearch = [];
    this.planningGames.push(JSON.parse(JSON.stringify(game)));
    this.intermediateGames.emit(this.planningGames);
    this.isAdding = false;
    this.nullGames.emit();
    this.switchTab (this.planningGames.length-1);
  }

  /**
   * Abre el modal para personalizar la dificultad.
   * @param game Juego seleccionado
   * @param j número de tab
   */
  async openCustomDifficult(game: any, j: number) {
    const customDifficultModal = await this.modalCtrl.create({
      component: CustomDifficultComponent,
      cssClass: "auto-height",
      componentProps: { 
         'game': game,
         'planningGames': this.planningGames,
         'assignedGames': this.assignedGames,
         'j': j
      }
    });
    await customDifficultModal.present();
    return customDifficultModal.onWillDismiss().then((data)=> {
      if (data.data) {
        this.gameAdded(game,j);
        this.shouldOpenModal = false;
        game.difficulty = "custom";
        game.difficultDescription = "Este juego posee una dificultad personalizada";
      }
    });
  }

  /**
   * Agrega el juego a la lista de juegos asignados
   * @param game juego a agregar
   * @param j número de tab
   */
  gameAdded(game,j) {
    if (game.done){
      this.assignedGames[j] = JSON.parse(JSON.stringify(game));
    } else {
      game.done = true;
      this.assignedGames.push(JSON.parse(JSON.stringify(game)));
    } 
    this.effectiveGames.emit(this.assignedGames);
  }

  /**
   * Borra un juego de la lista de los juegos planificados hasta el momento
   * @param game juego a borrar
   */
  deleteGame(game) {
    this.planningGames.splice(this.planningGames.indexOf(game),1);
    if (game.done){
      this.assignedGames.splice(this.assignedGames.indexOf(game),1);
    }
    this.effectiveGames.emit(this.assignedGames);
    this.intermediateGames.emit(this.planningGames);
  }

  /**
   * Asegura que maxNumberOfSessions ingresado es mayor que 0
   * @param game juego a chequear
   */
  checkMNoSLimit(game){
    if (parseInt(game.maxNumberOfSessions) < 1) {
      game.maxNumberOfSessions = "1";
    }
  }

  /**
   * Filtra juegos según la búsqueda
   * @param evt Evento de formulario input que se convertira en String para buscar juegos
   */
  filterGame(evt){
    const search = evt.srcElement.value;
    this.gamesSearch = this.games.filter((g)=> {
      if (this.gamesSearch){
        const gameName = (g.name.toLowerCase()).indexOf(search.toLowerCase()) > -1;
        const gamesCd = (g.cognitiveDomain.some(cd => cd.name.toLowerCase().indexOf(search.toLowerCase()) > -1));
        
        return (gameName + gamesCd)
      }
    })
  }

  /**
   * Cambia si el juego puede jugarse ilimitadamente o no
   * @param game juego
   * @param j índice de juego
   */
  changeLimit(game:any, j: number) {
    if (game.done) {
      this.assignedGames[j].hasLimit = !this.assignedGames[j].hasLimit;
    }
    game.hasLimit=!game.hasLimit;
  }

  /**
   * Setea el número máximo de sesiones de juego
   * @param game juego a setear
   * @param evt cantidad de sesiones
   * @param j índice de juego
   */
  changeLimitGamesValue(game,evt,j){
    if (game.done) {
      this.assignedGames[j].maxNumberOfSessions = evt.srcElement.value;
    }
    game.maxNumberOfSessions = evt.srcElement.value;
  }

  /**
   * Obtiene un juego y devuelve el nombre del archivo PNG del ícono
   * @param game Objeto juego
   * @returns fotito
   */
  getGameThumb(game) {
    let gameNameFormatted : string = game.name.toLowerCase();
    gameNameFormatted = gameNameFormatted.replace(/\s/g, '_');
    return( "../../../assets/pictures/" + gameNameFormatted + "_icon.png");
  }
}
