import { Component, OnInit } from '@angular/core';
import { PatientsApiService } from '../../patients/shared-patients/services/patients-api/patients-api.service';
import { GamesApiService } from 'src/app/games/services/games-api.service';
import { PlanningApiService } from '../services/planning-api.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogsComponent } from '../../shared/components/dialogs/dialogs.component';
import moment from 'moment';
import { ResultsApiService } from 'src/app/results/shared-results/services/results-api/results-api.service';

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
  patientAge: number;
  patientsSearch: any [];
  datePickerStart: any = {};
  datePickerFinish: any = {};
  myForm: FormGroup;
  assignedGames: any [] = [];
  planningGames: any [] = [];
  results: any [] = [];
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
  isLoading: boolean;
  isClicked: boolean;
  professionalName: string;
  currentTab: string = "summary";
  uniqueGameList: any[] = [];

  constructor(
    private patientsApiService: PatientsApiService,
    private resultsApiService: ResultsApiService,
    private planningApiService: PlanningApiService,
    public modalCtrl: ModalController,
    public alertController: AlertController,
    private route: ActivatedRoute,
    private dialogsComponent: DialogsComponent,
    private router: Router
  ) { }
  
  ngOnInit() {
    // Recibe el id de la planificación específica
    this.isLoading = true;
    this.route.params.subscribe(params => {
      this.id = +params['id']; 
      this.resultsApiService.getResultsFromPlanning(this.id).subscribe(res => {
        this.results = res.content;
      });
    });
    
    this.patientsApiService.getPatientsListed().subscribe(res=>{
      this.patients = res;
    });
    let i = 0;
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
      professionalName: new FormControl(''),
      startDate: new FormControl('', Validators.required),
      finishDate: new FormControl('', Validators.required),
      games: new FormControl('', Validators.required)
    });
    this.myForm.patchValue({"games": null});

    this.loadPlanning();
  }

  /**
   * Chequea que el paciente exista
   * @returns true o false si el paciente existe
   */
  patientExists(){
    let exist = false;
    this.patients?.forEach(p => {
      if ((p.firstName.toLowerCase() + " " + p.lastName.toLowerCase())==this.myForm.value.patient.toLowerCase()){
        exist = true;
      }
    });
    return exist
  }

  /**
   * Redirige al usuario a la página del detalle
   * del resultado.
   * @param id Id del resultado.
   */
   goToSubresults(result: any) {
    this.router.navigateByUrl("results/" + result.game.toLowerCase().replace(/\s/g, '-') + "/" + result.id);
  }

  /** 
   * Cambia el valor mínimo que puede tener el datepicker del fin de la planning 
   */ 
  setFinishMinDate(){
    var dateSplit = this.myForm.value.startDate.split('-');
    let date = new Date(parseInt(dateSplit[2]), parseInt(dateSplit[1]) - 1, parseInt(dateSplit[0]) + 1);
    this.datePickerFinish.fromDate = date;
    this.datePickerFinish.inputDate = date;
    this.myForm.patchValue({"finishDate": date})
    this.myForm.patchValue({"finishDate": moment(date).format('DD-MM-YYYY')})
  }

  /**
   * llena el campo del paciente cuando clickeas el que deseas en la lista
   * @param name nombre del paciente
   */
  fillSearchBar(name: string) {
    this.myForm.patchValue({"patient": name})
    this.patientsSearch = null
  }

  /**
   * Obtiene los datos de una planning y precarga los datos
   */
  loadPlanning(){
    this.planningApiService.getPlanningById(this.id).subscribe(res => {
      this.patientId = res.patientId;
      this.planningName = res.planningName;
      this.state = res.stateName;
      this.planningList = res.planningList;
      this.patientAge = this.calculateAge(res.patientBornDate);
      console.log(this.patientAge);
      this.myForm.setValue({
        patient: res.patientFirstName + " " + res.patientLastName,
        planningName: res.planningName,
        professionalName: res.professionalFirstName + " " + res.professionalLastName,
        startDate: res.startDate,
        finishDate: res.dueDate,
        games: null
      })
      this.auxStartDate = res.startDate;
      this.auxFinishDate = res.dueDate;
      this.uniqueGameList = this.getUniqueGameName(this.planningList);
      this.isLoading = false;
    })
  }

  /**
   * Cancela la planning actual
   */
  async cancelPlanning(){
    const confirm = await this.dialogsComponent.presentAlertConfirm('Planificación',
    '¿Desea cancelar la planificación? Esta acción no puede deshacerse')
    if (confirm) {
      this.planningApiService.cancelPlanningById(this.id).subscribe(res => {
        this.dialogsComponent.presentAlert('Planificación eliminada',"",'La planificación ha sido eliminada correctamente.',"/planning",false);
      }, (err) => {
        this.dialogsComponent.presentAlert('Error',"",'Un error ha ocurrido, por favor inténtelo de nuevo más tarde.',"", false);
      });
    }
  }  

  editPlanning(){
    this.router.navigateByUrl("planning/edit-planning/" + this.id)
  }

  /**
   * Calcula la edad actual de un paciente.
   * @param birthdate Fecha de nacimiento del paciente.
   * @returns Edad en un numero.
   */
  public calculateAge(birthdate: Date): number {
    return moment().diff(moment(birthdate, 'DD-MM-YYYY'), 'years');
  }

  /**
   * Genera una lista de nombres de juegos unicos dada una planificacion.
   * @param planningList Planificacion del detalle.
   * @returns array de nombres de juegos, ordenado alfabeticamente.
   */
  public getUniqueGameName(planningList: any[]) {
    let uniqueGameArray: string[] = [];
    for (let index = 0; index < planningList.length; index++) {
      const element = planningList[index].game;
      if (!uniqueGameArray.includes(element))
      {
        uniqueGameArray.push(element);
      }
    }
    uniqueGameArray.sort((a, b) => a.localeCompare(b))
    return uniqueGameArray
  }
}