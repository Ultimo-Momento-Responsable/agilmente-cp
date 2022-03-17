import { Component, OnInit } from '@angular/core';
import { PatientsApiService } from '../../patients/shared-patients/services/patients-api/patients-api.service';
import { GamesApiService } from 'src/app/games/services/games-api.service';
import { PlanningApiService } from '../services/planning-api.service';
import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';

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

  ngOnInit() {
    this.patientsApiService.getActivePatientsListed().subscribe(res=>{
      this.patients = res;
    });
    let i = 0;
    this.gamesApiService.getGames().subscribe(res=>{
      res.forEach(g => {
        this.games.push(g);
        this.games[i].gameParam.forEach(p => {
          p.isActive = false;
          if (p.param.type == 1) {
            p.value=false;
          }
          if (p.param.type == 2) {
            p.value=1;
          }
          if (p.param.type == 3) {
            p.value=((p.minValue + p.maxValue) / 2).toFixed(0);
          }
        });
        this.games[i].maxNumberOfSessions = 5;
        this.games[i].hasLimit = false;
        this.games[i].index = null;
        this.games[i].done = false;
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
  filterGame(evt){
    const search = evt.srcElement.value;
    this.gamesSearch = this.games.filter((g)=> {
      if (search && this.gamesSearch){
        return ((g.name.toLowerCase()).indexOf(search.toLowerCase()) > -1 )
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
    this.planningGames[this.planningGames.length - 1].accordion = true;
    this.isAdding = false;
    this.myForm.patchValue({"games": null});
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

  // Actualiza el valor del Param
  changeParamValue(game,p,evt){
    let gameChanged = this.planningGames[this.planningGames.indexOf(game)];
    if (gameChanged.gameParam[gameChanged.gameParam.indexOf(p)].isActive) {
      gameChanged.gameParam[gameChanged.gameParam.indexOf(p)].value = evt.srcElement.value;
    }
  }

  // Setea el número máximo de sesiones de juego
  changeLimitGamesValue(game,evt){
    this.planningGames[this.planningGames.indexOf(game)].maxNumberOfSessions = evt.srcElement.value;
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

  // borra un juego de la lista de los juegos planificados hasta el momento
  deleteGame(game) {
    this.planningGames.splice(this.planningGames.indexOf(game),1);
    if (game.done){
      this.assignedGames.splice(this.assignedGames.indexOf(game),1);
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

  // Asegura que maxNumberOfSessions ingresado es mayor que 0
  checkMNoSLimit(game){
    if (parseInt(game.maxNumberOfSessions) < 1) {
      game.maxNumberOfSessions = "1";
    }
  }

  // Cuando el juego se haya cargado, da como válido el formulario
  gameAdded(game,j) {
    game.accordion = false;
    if (game.done){
      this.assignedGames[j] = JSON.parse(JSON.stringify(game));
    } else {
      game.done = true;
      this.assignedGames.push(JSON.parse(JSON.stringify(game)));
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
  switchTab(index) {
    this.currentGame = index;
    console.log(this.currentGame);
  }

  checkTab(index) {
    if (index == this.currentGame) {
      return true;
    }
  }
}
