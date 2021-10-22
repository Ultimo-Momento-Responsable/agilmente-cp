import { Component, OnInit } from '@angular/core';
import { PatientsApiService } from '../../patients/shared-patients/services/patients-api/patients-api.service';
import { GamesApiService } from 'src/app/games/services/games-api.service';
import { PlanningApiService } from '../services/planning-api.service';
import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';
import { AlertController, ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogsComponent } from '../../shared/components/dialogs/dialogs.component';
import moment from 'moment';

export interface Planning {
  id: number;
  patientId: number;
  patientFirstName: string;
  patientLastName: string;
  professionalId: number;
  professionalFirstName: string;
  professionalLastName: string;
  state: string;
  startDate: string;
  dueDate: string;
  planningList: any[];
}

@Component({
  selector: 'app-specific-planning',
  templateUrl: './specific-planning.page.html',
  styleUrls: ['./specific-planning.page.scss'],
})
export class SpecificPlanningPage implements OnInit {
  id: number;
  patients: any [];
  patientId: number;
  patientsSearch: any [];
  datePickerStart: any = {};
  datePickerFinish: any = {};
  myForm: FormGroup;
  assignedGames: any [] = [];
  planningGames: any [] = [];
  auxGames: any [] = [];
  games: any [] = [];
  gamesSearch: any [];
  isAdding: boolean = false;
  patientBlur=false;
  state: string;
  planningList: any[];
  isEditing: boolean = false;
  auxStartDate: Date;
  auxFinishDate: Date;
  planningName: string;

  constructor(
    private patientsApiService: PatientsApiService,
    private gamesApiService: GamesApiService,
    private planningApiService: PlanningApiService,
    public modalCtrl: ModalController,
    public alertController: AlertController,
    private router: Router,
    private route: ActivatedRoute,
    private dialogsComponent: DialogsComponent
  ) { }
  
  ngOnInit() {
    // Recibe el id de la planificación específica
    this.route.params.subscribe(params => {
      this.id = +params['id']; 
    });
    
    this.patientsApiService.getPatientsListed().subscribe(res=>{
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
        this.games[i].done = true;
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

    this.loadPlanning();
  }

  patientExists(){
    let exist = false;
    this.patients?.forEach(p => {
      if ((p.firstName.toLowerCase() + " " + p.lastName.toLowerCase())==this.myForm.value.patient.toLowerCase()){
        exist = true;
      }
    });
    return exist
  }

  // Cambia el valor mínimo que puede tener el datepicker del fin de la planning  
  setFinishMinDate(){
    var dateSplit = this.myForm.value.startDate.split('-');
    let date = new Date(parseInt(dateSplit[2]), parseInt(dateSplit[1]) - 1, parseInt(dateSplit[0]) + 1);
    this.datePickerFinish.fromDate = date;
    this.datePickerFinish.inputDate = date;
    this.myForm.patchValue({"finishDate": date})
    this.myForm.patchValue({"finishDate": moment(date).format('DD-MM-YYYY')})
  }

  // Filtra pacientes según la búsqueda
  async filterPatient(evt){
    const search = evt.srcElement.value;
    this.patientsSearch = this.patients.filter((p)=> {
      if (search && this.patientsSearch){
        return ((p.firstName.toLowerCase() + " " + p.lastName.toLowerCase()).indexOf(search.toLowerCase()) > -1)
      }
    })
  }

  // Filtra juegos según la búsqueda
  async filterGame(evt){
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
    console.log(this.planningGames[0].index + " ag " + this.assignedGames[0].index)
    console.log(this.planningGames[1].index + " ag " + this.assignedGames[1].index)
    console.log(this.planningGames[2].index + " ag " + this.assignedGames[2].index)
    let isCorrect = false;
    game.gameParam.forEach(p => {
      if (p.param.type == 0){
        if (p.isActive){
          if (p.value){
            isCorrect = true;
          }
        }
      } else{
        p.isActive = true;
      }
    });
    if (isCorrect){
      this.assignedGames.forEach(g => {
        if (JSON.stringify(g.gameParam) == JSON.stringify(game.gameParam) 
              && g.name == game.name
              && game.hasLimit == g.hasLimit 
              && game.maxNumberOfSessions == g.maxNumberOfSessions) {
          isCorrect = false;
        }
      })
    }
    return isCorrect;
  }

  // Borra un juego de la lista de los juegos planificados hasta el momento
  deleteGame(game) {
    let ind = this.planningGames.indexOf(game);
    this.planningGames.splice(ind,1);
    if (this.assignedGames[ind]){
      this.assignedGames.splice(ind,1);
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
      header: 'Editar Planificación',
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
  edit(myForm: FormGroup) {
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
        stateId: 1,
        professionalId: 1,
        startDate: myForm.value.startDate,
        dueDate: myForm.value.finishDate,
        games: gamesPost
      }
      this.planningApiService.cancelPlanningById(this.id).subscribe(res => {
        this.planningApiService.postPlanning(jsonPost).subscribe(res =>{
          this.presentAlert('¡Planificación Editada!','<p>La planificación ha sido editada correctamente. </p>', true, 'alertSuccess'); 
        }, (err) => {
          this.presentAlert('Error','Un error ha ocurrido, por favor inténtelo de nuevo más tarde.', false, 'alertError');
        });
      }, (err) => {
        this.presentAlert('Error','Un error ha ocurrido, por favor inténtelo de nuevo más tarde.', false, 'alertError');
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
    if (gamesAreDone && this.assignedGames.length > 0){
      this.myForm.patchValue({"games": "ok"});
    } else {
      this.myForm.patchValue({"games": null});
    }
    
    return !this.myForm.valid 
      || !this.patientExists() 
      || (JSON.stringify(this.assignedGames)==JSON.stringify(this.auxGames) 
        && this.planningName==this.myForm.value.planningName
        && this.auxFinishDate==this.myForm.value.finishDate
        && this.auxStartDate==this.myForm.value.startDate);
  }

  // Obtiene los datos de una planning y precarga los datos
  loadPlanning(){
    this.planningApiService.getPlanningById(this.id).subscribe(res => {
      this.patientId = res.patientId;
      this.planningName = res.planningName;
      this.state = res.stateName;
      this.planningList = res.planningList;
      this.myForm.setValue({
        patient: res.patientFirstName + " " + res.patientLastName,
        planningName: res.planningName,
        startDate: res.startDate,
        finishDate: res.dueDate,
        games: null
      })
      this.auxStartDate = res.startDate;
      this.auxFinishDate = res.dueDate;
    })
  }

  // Cancela la planning actual
  async cancelPlanning(){
    const confirm = await this.dialogsComponent.presentAlertConfirm('Planificación',
    '¿Desea cancelar la planificación? Esta acción no puede deshacerse')
    if (confirm) {
      this.planningApiService.cancelPlanningById(this.id).subscribe(res => {
        this.dialogsComponent.presentAlert('Planificación eliminada','','<p>La planificación ha sido eliminado correctamente.','/planning');
      }, (err) => {
        this.dialogsComponent.presentAlert('Error','','Un error ha ocurrido, por favor inténtelo de nuevo más tarde.','/planning');
      });
    }
  }

  // Edita la planning actual
  editPlanning(){
    this.isEditing=true;
    for (let i=0; i<this.planningList.length; i++){
      this.assignedGames.push(JSON.parse(JSON.stringify(this.games.find(game => game.name == this.planningList[i].game))));
      let index = 1;
      this.assignedGames[i].gameParam.forEach(p => {
        let planningParam = this.planningList[i].parameters.find(param => param.spanishName == p.param.name);
        if (planningParam){
          if (p.param.type==0){
            if (p.param.id==1){
              index = 0;
            }
          }
          p.isActive = true;
          if (!isNaN(parseFloat(planningParam.value)) && isFinite(planningParam.value)){
            p.value = Math.floor(planningParam.value).toString();
          }else{
            if (planningParam.value=="false"){
              p.value = false;
            }else if (planningParam.value=="true"){
              p.value = true;
            }else{
              p.value = planningParam.value;
            }
          }
        }
      });
      this.assignedGames[i].index = index;
      this.assignedGames[i].done = true;
      this.assignedGames[i].accordion = false;
    }
    var dateSplit = this.myForm.value.startDate.split('-');
    let startDate = new Date(parseInt(dateSplit[2]), parseInt(dateSplit[1]) - 1, parseInt(dateSplit[0]) + 1);
    let date = new Date();
    if (date>startDate){
      this.datePickerFinish.fromDate = date;
    } else{
      this.datePickerFinish.fromDate = startDate;
    }
    
    this.planningGames = JSON.parse(JSON.stringify(this.assignedGames));
    this.auxGames = JSON.parse(JSON.stringify(this.assignedGames));
  }
}