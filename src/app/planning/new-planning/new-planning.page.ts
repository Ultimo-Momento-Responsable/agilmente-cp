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
  games: any [];
  gamesSearch: any [];
  isAdding: boolean = false;

  ngOnInit() {
    this.patientsApiService.getPatientsListed().subscribe(res=>{
      this.patients = res;
    });

    this.games = this.gamesApiService.getGames();
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
      finishDate: new FormControl('', Validators.required)
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

  save(myForm: FormGroup) {
    if (myForm.valid) {
    }
  }

  // llena el campo del paciente cuando clickeas el que deseas en la lista
  fillSearchBar(name: string) {
    this.myForm.patchValue({"patient": name})
    this.patientsSearch = null
  }

  // añade el juego seleccionado a la lista de juegos asignados.
  addGame(game: any) {
    this.gamesSearch = [];
    this.assignedGames.push(game);
    this.isAdding = false;
  }

  //
  async changeMode(pm: any, p: any){
    p.mode.forEach(paramMode => {
      if (paramMode.isActive){
        if (pm==paramMode){
          console.log("ASD");
          paramMode.isActive = true
        }else{
          paramMode.isActive = false;
        }
      }
    });
  }

  //
  async setParamValue(evt,pm){
    pm.value = evt.srcElement.value
  }
}
