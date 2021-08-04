import { Component, OnInit } from '@angular/core';
import { PatientsApiService } from '../../patients/services/patients-api.service';
import { GamesApiService } from 'src/app/games/services/games-api.service';
import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-planning',
  templateUrl: './new-planning.page.html',
  styleUrls: ['./new-planning.page.scss'],
})
export class NewPlanningPage implements OnInit {
  

  constructor(
    private patientsApiService: PatientsApiService,
    private gamesApiService: GamesApiService,
    public modalCtrl: ModalController,
    public alertController: AlertController,
    private router: Router) { }

  patients: any [];
  patientsSearch: any [];
  datePickerObj: any = {};
  myForm: FormGroup;
  assignedGames: any [] = [];
  games: any [] = [];
  gamesSearch: any [];
  isAdding: boolean = false;

  ngOnInit() {
    this.patientsApiService.getPatientsListed().subscribe(res=>{
      this.patients = res;
    });
    let i = 0;
    this.gamesApiService.getGames().forEach(g=>{
      this.games.push(g);
      this.games[i].params.forEach(p => {
        p.isActive = false;
      });
      this.games[i].maxNumberOfSessions = 5;
      this.games[i].hasLimit = false;
      i++;
    });
    // this.games = this.gamesApiService.getGames();
    // this.games.forEach()
    // this.gamesApiService.getGames().subscribe(res=>{
    //   this.games = res;
    // })

    this.datePickerObj = {
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
      startDate: new FormControl('', Validators.required),
      finishDate: new FormControl('', Validators.required),
      games: new FormControl('', Validators.required)
    });
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
        return ((g.name.toLowerCase()).indexOf(search.toLowerCase()) > -1 && this.assignedGames.indexOf(g) == -1)
      }
    })
  }

  // Abre el datepicker
  async openDatePicker() {
    const datePickerModal = await this.modalCtrl.create({
      component: Ionic4DatepickerModalComponent,
      cssClass: 'li-ionic4-datePicker',
      componentProps: { 
         'objConfig': this.datePickerObj
      }
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
    this.assignedGames.push(game);
    this.assignedGames[this.assignedGames.length - 1].accordion = true;
    this.isAdding = false;
    this.myForm.patchValue({"games": null});
  }

  // Para los params tipo 0, activa uno, en caso de que se haya tildado
  setActiveParam(game, p){
    this.assignedGames.forEach(g=>{
      if (g.id == game.id){
        g.params.forEach(param => {
          if (param.id == p.id) {
            if (!param.isActive) {
              param.isActive = true;
            }
          } else {
            param.isActive = false;
          }
        });
      }
    })
  }

  // Actualiza el valor del Param
  changeParamValue(game,p,evt){
    this.assignedGames[this.assignedGames.indexOf(game)].params[this.assignedGames[this.assignedGames.indexOf(game)].params.indexOf(p)].value = evt.srcElement.value;
  }

  // Setea el número máximo de sesiones de juego
  changeLimitGamesValue(game,evt){
    this.assignedGames[this.assignedGames.indexOf(game)].maxNumberOfSessions = evt.srcElement.value;
  }

  // Checkea que el juego esté correctamente cargado
  checkIfCorrect(game) : boolean{
    let band = false;
    game.params.forEach(p => {
      if (p.type == 0){
        if (p.isActive){
          if (p.value){
            band = true;
          }
        }
      }
    });
    return band
  }

  // Cuando el juego se haya cargado, da como válido el formulario
  gameAdded(game) {
    game.accordion = false;
    this.myForm.patchValue({"games": "ok"});
    console.log(this.assignedGames);
  }


  save(myForm: FormGroup) {
    let patientId: number;
    this.patients.forEach(p=>{
      if (p.name == this.myForm.value.patient){
        patientId = p.id;
      }
    })
    
    if (myForm.valid) {
      let jsonPost = {
        patientId: patientId,
        professionalId: 5,
        startDate: myForm.value.startDate,
        dueDate: myForm.value.finishDate,
        games: {

        }
      //   {
      //     "patientId": 1,
      //     "professionalId": 5,
      //     "startDate": "01-08-2021",
      //     "dueDate": "08-08-2021",
      //     "games": [
      //         {
      //             "gameId": 2,
      //             "maxNumberOfSessions": 5,
      //             "params": {
      //                 "FigureQuantity": "12"
      //             }
      //         }
      //     ]
      // }
      }
    }
  }
}
