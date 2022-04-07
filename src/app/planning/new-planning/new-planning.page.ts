import { Component, OnInit } from '@angular/core';
import { PatientsApiService } from '../../patients/shared-patients/services/patients-api/patients-api.service';
import { GamesApiService } from 'src/app/games/services/games-api.service';
import { PlanningApiService } from '../services/planning-api.service';
import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';
import { encuentraAlNuevo } from '../shared-planning/constants/difficulty-level';
import { encuentraAlRepetido } from '../shared-planning/constants/difficulty-level';
import { memorilla } from '../shared-planning/constants/difficulty-level';
import { CustomDifficultComponent } from '../shared-planning/components/custom-difficulty/custom-difficulty.component';

@Component({
  selector: 'app-new-planning',
  templateUrl: './new-planning.page.html',
  styleUrls: ['./new-planning.page.scss'],
})
export class NewPlanningPage implements OnInit {
  

  constructor(
    private patientsApiService: PatientsApiService,
    private gamesApiService: GamesApiService,
    private planningApiService: PlanningApiService,
    public modalCtrl: ModalController,
    public alertController: AlertController,
    private router: Router) { }

  patients: any [];
  patientsSearch: any [] = [];
  datePickerStart: any = {};
  datePickerFinish: any = {};
  myForm: FormGroup;
  assignedGames: any [] = [];
  planningGames: any [] = [];
  games: any [] = [];
  gamesSearch: any [] = [];
  isAdding: boolean = true;
  patientBlur = false;
  isClicked: boolean;
  currentGame: any;
  patientSelected: boolean = false;

  ngOnInit() {
    this.patientsApiService.getActivePatientsListed().subscribe(res=>{
      this.patients = res;
    });
    let i = 0;
    this.gamesApiService.getGames().subscribe(res=>{
      res.forEach(g => {
        this.games.push(g);
        let contType0 = 0;
        let contActivatable = 0;
        this.games[i].gameParam.forEach(p => {
          p.isActive = false;
          if (p.param.type == 0) {
            contType0++;
          }
          if (p.param.type == 1) {
            contActivatable++;
            p.value=false;
          }
          if (p.param.type == 2) {
            contActivatable++;
            p.value=1;
          }
          if (p.param.type == 3) {
            p.value=((p.minValue + p.maxValue) / 2).toFixed(0);
          }
        });
        this.games[i].maxNumberOfSessions = 5;
        this.games[i].hasLimit = false;
        this.games[i].index = null;
        if (contType0==1) {
          this.games[i].index = 0;
          this.games[i].gameParam.find(p => p.param.type === 0).isActive = true;
        }
        this.games[i].done = false;
        this.games[i].hasActivatable = (contActivatable > 0);
        i++;
      });
    });
    this.datePickerStart = {
      showTodayButton: false,
      closeOnSelect: true,
      setLabel: 'Ok',
      closeLabel: 'Cerrar',
      titleLabel: 'Selecciona una fecha', 
      dateFormat: 'DD-MM-YYYY',
      clearButton : false,
      monthsList: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      weeksList: ["D", "L", "M", "X", "J", "V", "S"],
      fromDate: new Date(),
      inputDate: new Date()
    };
    this.datePickerFinish = {
      showTodayButton: false,
      closeOnSelect: true,
      setLabel: 'Ok',
      closeLabel: 'Cerrar',
      titleLabel: 'Selecciona una fecha', 
      dateFormat: 'DD-MM-YYYY',
      clearButton : false,
      monthsList: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      weeksList: ["D", "L", "M", "X", "J", "V", "S"]
    };
    

    this.myForm = new FormGroup({
      patient: new FormControl('', Validators.required),
      planningName: new FormControl(''),
      startDate: new FormControl('', Validators.required),
      finishDate: new FormControl('', Validators.required),
      games: new FormControl('', Validators.required)
    });
    this.myForm.patchValue({"games": null});

  }

  // Chequea que el paciente que se está buscando existe
  patientExists(){

    let flag = false;
    this.patients?.forEach(p => {
      if ((p.firstName.toLowerCase() + " " + p.lastName.toLowerCase())==this.myForm.value.patient.toLowerCase()){
        flag = true;
      }
    });
    return flag
  }

  // Cambia el valor mínimo que puede tener el datepicker del fin de la planning  
  setFinishMinDate(){
    var dateSplit = this.myForm.value.startDate.split('-');
    let date = new Date(parseInt(dateSplit[2]), parseInt(dateSplit[1]) - 1, parseInt(dateSplit[0]) + 1);
    this.datePickerFinish.fromDate = date;
    this.datePickerFinish.inputDate = date;
    this.myForm.patchValue({"finishDate": moment(date).format('DD-MM-YYYY')})
  }
  // Filtra pacientes según la búsqueda
  filterPatient(evt){
    const removeAccents = (str) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    } 
    const search = removeAccents(evt.srcElement.value);
    this.patientsSearch = this.patients.filter((p)=> {
      if (search && this.patientsSearch){
        return ((p.firstName.toLowerCase() + " " + p.lastName.toLowerCase()).normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(search.toLowerCase()) > -1)
      }
    })
  }

  // Filtra juegos según la búsqueda
  // @param evt Evento de formulario input que se convertira en String para buscar juegos
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

  // Abre el datepicker
  async openDatePicker() {
    const datePickerModal = await this.modalCtrl.create({
      component: Ionic4DatepickerModalComponent,
      cssClass: 'li-ionic4-datePicker'
    });
    await datePickerModal.present();
  }

  // llena el campo del paciente cuando clickeas el que deseas en la lista
  fillSearchBar(name: string) {
    this.myForm.patchValue({"patient": name})
    this.patientsSearch = null
    this.myForm.patchValue({"planningName": "Planificación de " + this.myForm.value.patient})
  }

  // Añade el juego seleccionado a la lista de juegos asignados.
  addGame(game) {
    this.gamesSearch = [];
    this.planningGames.push(JSON.parse(JSON.stringify(game)));
    this.isAdding = false;
    this.myForm.patchValue({"games": null});
    this.switchTab (this.planningGames.length-1);
  }

  // Abre el modal para personalizar la dificultad.
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
        game.difficulty = "custom";
        game.difficultDescription = "Este juego posee una dificultad personalizada";
      }
    });
  }

  // Agrega el juego a la lista de juegos asignados
  gameAdded(game,j) {
    if (game.done){
      this.assignedGames[j] = JSON.parse(JSON.stringify(game));
    } else {
      game.done = true;
      this.assignedGames.push(JSON.parse(JSON.stringify(game)));
    } 
  }

  // borra un juego de la lista de los juegos planificados hasta el momento
  deleteGame(game) {
    this.planningGames.splice(this.planningGames.indexOf(game),1);
    if (game.done){
      this.assignedGames.splice(this.assignedGames.indexOf(game),1);
    }
  }

  // Asegura que maxNumberOfSessions ingresado es mayor que 0
  checkMNoSLimit(game){
    if (parseInt(game.maxNumberOfSessions) < 1) {
      game.maxNumberOfSessions = "1";
    }
  }

  // Muestra la alerta.
  async presentAlert(subHeader: string, message: string, reset: boolean, css: string) {
    const alert = await this.alertController.create({
      message: message,
      header: 'Cargar Planificación',
      subHeader: subHeader,
      cssClass: 'centerh3',
      buttons: [{
        text: 'OK',
        cssClass: css
      }],
    });

    await alert.present(); 
    if (await alert.onDidDismiss()){
      if (reset){
        this.router.navigateByUrl('/planning')
      }
    }
  }
  
  // Se formatea y se envía la planificación al back
  save(myForm: FormGroup) {
    this.isClicked = true;
    let patientId: number;
    this.patients.forEach(p=>{
      if ((p.firstName.toLowerCase() + " " + p.lastName.toLowerCase()) == this.myForm.value.patient.toLowerCase()){
        patientId = p.id;
      }
    });
    let gamesPost: any[] = [];
    this.assignedGames.forEach(g => {
      let gamePost = {
        gameId: g.id,
        maxNumberOfSessions: g.hasLimit?g.maxNumberOfSessions:-1,
        params: undefined
      };
      
      let params: any = {};

      g.gameParam.forEach(p => {
        if (p.isActive) {
          let newParam = {[p.param.className]: p.value}
          params = {...params,...newParam}
        }
      });
      gamePost.params = params;
      gamesPost.push(gamePost);

    })
    if (myForm.valid) {
      let jsonPost = {
        patientId: patientId,
        planningName: myForm.value.planningName,
        stateId: 1,
        professionalId: window.localStorage.getItem('professionalId'),
        startDate: myForm.value.startDate,
        dueDate: myForm.value.finishDate,
        games: gamesPost
      }
      this.planningApiService.postPlanning(jsonPost).subscribe(res =>{
        this.presentAlert('¡Planificación creada!','<p>La planificación ha sido registrada correctamente. </p>', true, 'alertSuccess'); 
      }, (err) => {
        this.presentAlert('Error','Un error ha ocurrido, por favor inténtelo de nuevo más tarde.', false, 'alertError');
        this.isClicked = false;
      });
    };
  }

  // Cambia si el juego puede jugarse ilimitadamente o no
  changeLimit(game:any, j: number) {
    if (game.done) {
      this.assignedGames[j].hasLimit = !this.assignedGames[j].hasLimit;
    }
    game.hasLimit=!game.hasLimit;
  }

  // Setea el número máximo de sesiones de juego
  changeLimitGamesValue(game,evt,j){
    if (game.done) {
      this.assignedGames[j].maxNumberOfSessions = evt.srcElement.value;
    }
    game.maxNumberOfSessions = evt.srcElement.value;
  }

  // habilita o desabilita el botón de submit
  submitDisabled(){
    let gamesAreDone = true;
    if (this.planningGames.length == 0){
      gamesAreDone = false;
    }
    this.planningGames.forEach(g => {
      if (!g.done){
        gamesAreDone = false;
      }
    })
    if (gamesAreDone){
      this.myForm.patchValue({"games": "ok"});
    } else {
      this.myForm.patchValue({"games": null});
    }
    return !this.myForm.valid || !this.patientExists()
  }

  // Descubre que juego esta activo en este momento
  // @param index Índice de la pestaña activa en la página
  switchTab(index) {
    this.currentGame = index;
    this.filterGameByString('');
  }

  // Verifica que la tab actual sea la del juego correspondiente
  checkTab(index) {
    if (index == this.currentGame) {
      return true;
    }
  }

  //Setea la dificultad seleccionada para el juego seleccionado.
  setDifficulty(event, game:any, j: number) {
    let dif: any;
    game.difficulty = event.target.value
    if (game.difficulty != "custom"){
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
      this.openCustomDifficult(game,j);
    }
  }
  // Filtra juegos mediante el nombre a través del parámetro recibido
  // @param search String del nombre de juego que se busca
  filterGameByString(search) {
    this.gamesSearch = this.games.filter((g)=> {
      if (this.gamesSearch){
        return ((g.name.toLowerCase()).indexOf(search.toLowerCase()) > -1 )
      }
    })
  }

  // Ejecuta una busqueda vacía para traer la lista completa de juegos
  // al cargar la pagina
  ionViewDidEnter() {
    this.filterGameByString('');
  }

  // Obtiene un juego y devuelve el nombre del archivo PNG del ícono
  // @param game Objeto juego
  getGameThumb(game) {
    let gameNameFormatted : string = game.name.toLowerCase();
    gameNameFormatted = gameNameFormatted.replace(/\s/g, '_');
    return( "../../../assets/pictures/" + gameNameFormatted + "_icon.png");
  }
}
