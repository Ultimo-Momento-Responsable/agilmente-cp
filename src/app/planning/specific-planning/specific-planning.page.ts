import { Component, OnInit } from '@angular/core';
import {
  Patient,
  PatientsApiService,
} from '../../patients/shared-patients/services/patients-api/patients-api.service';
import { PlanningApiService } from '../services/planning-api.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogsComponent } from '../../shared/components/dialogs/dialogs.component';
import moment from 'moment';
import { ResultsApiService } from 'src/app/results/shared-results/services/results-api/results-api.service';
interface Param {
  id: number;
  maxLevel: number;
  name: string;
  value: string;
  spanishName: string;
  unit: string;
  contextualHelp: string;
}

export interface PlanningItem {
  gameSessionId: number;
  game: string;
  numberOfSession: number;
  maxNumberOfSession: number;
  parameters: Param[];
}

export interface Planning {
  id: number;
  planningName: string;
  patientId: number;
  patientFirstName: string;
  patientLastName: string;
  professionalId: number;
  professionalFirstName: string;
  professionalLastName: string;
  state: string;
  startDate: Date;
  dueDate: Date;
  stateName: string;
  patientBornDate: Date;
  planningList: PlanningItem[];
}

@Component({
  selector: 'app-specific-planning',
  templateUrl: './specific-planning.page.html',
  styleUrls: ['./specific-planning.page.scss'],
})
export class SpecificPlanningPage implements OnInit {
  id: number;
  patients: Patient[];
  patientId: number;
  patientAge: number;
  myForm: FormGroup;
  results: any[];
  state: string;
  planningList: PlanningItem[];
  auxStartDate: Date;
  auxFinishDate: Date;
  planningName: string;
  isLoading: boolean;
  currentTab: string = 'summary';
  uniqueGameList: any[] = [];
  filteredResults: any[] = [];
  filteredGame: string = '';
  filteredState: string = '';
  totalNOS = 0;
  leftNOS = 0;
  daysLeft: any;

  constructor(
    private patientsApiService: PatientsApiService,
    private resultsApiService: ResultsApiService,
    private planningApiService: PlanningApiService,
    public modalCtrl: ModalController,
    public alertController: AlertController,
    private route: ActivatedRoute,
    private dialogsComponent: DialogsComponent,
    private router: Router
  ) {}

  ngOnInit() {
    // Recibe el id de la planificación específica
    this.isLoading = true;
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.resultsApiService
        .getResultsFromPlanning(this.id)
        .subscribe((res) => {
          this.results = res;
          this.filteredResults = JSON.parse(JSON.stringify(this.results));
        });
    });
    this.patientsApiService.getAll().subscribe((res) => {
      this.patients = res;
    });
    let i = 0;
    this.myForm = new FormGroup({
      patient: new FormControl('', Validators.required),
      planningName: new FormControl(''),
      professionalName: new FormControl(''),
      startDate: new FormControl('', Validators.required),
      finishDate: new FormControl('', Validators.required),
      games: new FormControl('', Validators.required),
    });
    this.myForm.patchValue({ games: null });

    this.loadPlanning();
  }

  /**
   * Chequea que el paciente exista
   * @returns true o false si el paciente existe
   */
  patientExists() {
    let exist = false;
    this.patients?.forEach((p) => {
      if (
        p.firstName.toLowerCase() + ' ' + p.lastName.toLowerCase() ==
        this.myForm.value.patient.toLowerCase()
      ) {
        exist = true;
      }
    });
    return exist;
  }

  /**
   * Redirige al usuario a la página del detalle
   * del resultado.
   * @param id Id del resultado.
   */
  goToSubresults(result: any) {
    this.router.navigateByUrl(
      'results/' +
        result.game.toLowerCase().replace(/\s/g, '-') +
        '/' +
        result.id
    );
  }

  /**
   * Obtiene los datos de una planning y precarga los datos
   */
  loadPlanning() {

    this.planningApiService
      .getPlanningById(this.id)
      .subscribe((res: Planning) => {
        this.patientId = res.patientId;
        this.planningName = res.planningName;
        this.state = res.stateName;
        this.planningList = res.planningList;
        this.patientAge = this.calculateAge(res.patientBornDate);
        this.myForm.setValue({
          patient: res.patientFirstName + ' ' + res.patientLastName,
          planningName: res.planningName,
          professionalName:
            res.professionalFirstName + ' ' + res.professionalLastName,
          startDate: res.startDate,
          finishDate: res.dueDate,
          games: null,
        });
        this.auxStartDate = res.startDate;
        this.auxFinishDate = res.dueDate;
        this.uniqueGameList = this.getUniqueGameName(this.planningList);
        this.isLoading = false;
        this.planningList.forEach(pl=>{
          if (pl.maxNumberOfSession>0){
            this.totalNOS+=pl.maxNumberOfSession;
            this.leftNOS+=(pl.maxNumberOfSession - pl.numberOfSession);
          }
        })
        moment.locale('es');
        this.daysLeft = moment(this.auxFinishDate, 'DD-MM-yyyy').fromNow(true)
      });
  }

  /**
   * Cancela la planning actual
   */
  async cancelPlanning() {
    const confirm = await this.dialogsComponent.presentAlertConfirm(
      'Planificación',
      '¿Desea cancelar la planificación? Esta acción no puede deshacerse'
    );
    if (confirm) {
      this.planningApiService.cancelPlanningById(this.id).subscribe(
        (res) => {
          this.dialogsComponent.presentAlert(
            'Planificación eliminada',
            '',
            'La planificación ha sido eliminada correctamente.',
            '/planning',
            false
          );
        },
        (err) => {
          this.dialogsComponent.presentAlert(
            'Error',
            '',
            'Un error ha ocurrido, por favor inténtelo de nuevo más tarde.',
            '',
            false
          );
        }
      );
    }
  }

  /**
   * Redirige a la página de edición de la planning
   */
  editPlanning() {
    this.router.navigateByUrl('planning/edit-planning/' + this.id);
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
      if (!uniqueGameArray.includes(element)) {
        uniqueGameArray.push(element);
      }
    }
    uniqueGameArray.sort((a, b) => a.localeCompare(b));
    return uniqueGameArray;
  }

  /**
   * Filtra la lista de resultados segun el juego elegido
   * @param game Nombre del juego a filtrar (o todos)
   */
  filterByGame(game: any) {
    this.filteredGame = game.target.value;
    this.filterResults();
  }

  /**
   * Filtra la lista de resultados segun si el juego fue abandonado o completado
   * @param state Nombre del estado a filtrar (o todos)
   */
  filterByState(state: any) {
    this.filteredState = state.target.value;
    this.filterResults();
  }

  /**
   * Filtra resultados segun que filtros esten aplicandose actualmente en la tab.
   * Actualmente recibe el nombre del juego y un booleano para el estado.
   */
  filterResults() {
    if (this.filteredGame != '') {
      this.filteredResults = JSON.parse(
        JSON.stringify(this.results.filter((r) => r.game == this.filteredGame))
      );
    } else {
      this.filteredResults = JSON.parse(JSON.stringify(this.results));
    }

    if (this.filteredState != '') {
      this.filteredResults = JSON.parse(
        JSON.stringify(
          this.filteredResults.filter(
            (r) => r.canceled.toString() == this.filteredState
          )
        )
      );
    }

    if (this.filteredGame === '' && this.filteredState === '') {
      this.filteredResults = JSON.parse(JSON.stringify(this.results));
    }
  }
}
