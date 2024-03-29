import { Component, OnInit } from '@angular/core';
import {
  Patient,
  PatientsApiService,
} from '../../patients/shared-patients/services/patients-api/patients-api.service';
import { GamesApiService } from 'src/app/games/services/games-api.service';
import { PlanningApiService } from '../services/planning-api.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { DifficultyCalcService } from '../services/difficulty-calc.service';

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
    private difficultyService: DifficultyCalcService,
    public modalCtrl: ModalController,
    public alertController: AlertController,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  patients: Patient[];
  patientSelected: boolean = false;
  planningForm: UntypedFormGroup;
  games: any[] = [];
  assignedGames: any[] = [];
  planningGames: any[] = [];
  isClicked: boolean;
  patientId: number;
  patient: string;
  planningName: string;

  ngOnInit() {
    this.patientsApiService.getActivePatients().subscribe((res) => {
      this.patients = res;
    });
    let i = 0;
    this.gamesApiService.getGames().subscribe((res) => {
      res.forEach((g) => {
        this.games.push(g);
        let contType0 = 0;
        let contActivatable = 0;
        this.games[i].gameParam.forEach((p) => {
          p.isActive = false;
          if (p.param.type == 0) {
            contType0++;
          }
          if (p.param.type == 1) {
            contActivatable++;
            p.value = false;
          }
          if (p.param.type == 2) {
            contActivatable++;
            p.value = 1;
          }
          if (p.param.type == 3) {
            p.value = ((p.minValue + p.maxValue) / 2).toFixed(0);
          }
        });
        this.games[i].maxNumberOfSessions = 5;
        this.games[i].hasLimit = false;
        this.games[i].index = null;
        if (contType0 == 1) {
          this.games[i].index = 0;
          this.games[i].gameParam.find((p) => p.param.type === 0).isActive =
            true;
        }
        this.games[i].done = false;
        this.games[i].hasActivatable = contActivatable > 0;
        i++;
      });
    });
    this.planningForm = new UntypedFormGroup({
      patient: new UntypedFormControl('', Validators.required),
      planningName: new UntypedFormControl(''),
      startDate: new UntypedFormControl('', Validators.required),
      finishDate: new UntypedFormControl('', Validators.required),
      games: new UntypedFormControl('', Validators.required),
    });
    this.planningForm.patchValue({ games: null });
    this.route.params.subscribe((params) => {
      this.patientId = +params['id'];
      if (this.patientId) {
        this.patientsApiService.getPatientById(this.patientId).subscribe((res) => {
          this.patient = res.firstNameLastName;
          this.planningName = "Planificación de " + res.firstNameLastName;
          this.fillPatient(res.firstNameLastName);
          this.fillPlanningName(`Planificación de ${res.firstNameLastName}`);
        });
      }
    });
  }

  /**
   * llena el paciente traido del componente hijo
   * @param name nombre del paciente
   */
  fillPatient(name: string) {
    this.patientSelected = true;
    this.planningForm.patchValue({ patient: name });
  }

  /**
   * llena el nombre de planificación traido del componente hijo
   * @param name nombre de la planificación
   */
  fillPlanningName(name: string) {
    this.planningForm.patchValue({ planningName: name });
  }

  /**
   * llena la fecha de inicio de la planning
   * @param startDate fecha de inicio de la planning
   */
  fillStartDate(startDate: string) {
    this.planningForm.patchValue({ startDate: startDate });
  }

  /**
   * llena la fecha de fin de la planning
   * @param finishDate fecha de fin de la planning
   */
  fillFinishDate(finishDate: string) {
    this.planningForm.patchValue({ finishDate: finishDate });
  }

  /**
   * pone en null a games.
   */
  fillWithNullGames() {
    this.planningForm.patchValue({ games: null });
  }

  /**
   * Trae los juegos asignados del componente hijo
   * @param games juegos asignados
   */
  fillAssignedGames(games: any[]) {
    this.assignedGames = games;
  }

  /**
   * Trae los juegos planeados del componente hijo
   * @param games juegos planeados
   */
  fillPlanningGames(games: any[]) {
    this.planningGames = games;
  }

  /**
   * Chequea que el paciente que se está buscando existe
   * @returns true o false si existe o no.
   */
  patientExists() {
    let exists = false;
    this.patients?.forEach((p) => {
      if (
        p.firstName.toLowerCase() + ' ' + p.lastName.toLowerCase() ==
        this.planningForm.value.patient.toLowerCase()
      ) {
        exists = true;
      }
    });
    return exists;
  }

  /**
   * Muestra la alerta.
   */
  async presentAlert(
    subHeader: string,
    message: string,
    reset: boolean,
    css: string
  ) {
    const alert = await this.alertController.create({
      message: message,
      header: 'Cargar Planificación',
      subHeader: subHeader,
      cssClass: 'centerh3',
      buttons: [
        {
          text: 'OK',
          cssClass: css,
        },
      ],
    });

    await alert.present();
    if (await alert.onDidDismiss()) {
      if (reset) {
        this.router.navigateByUrl('/planning');
      }
    }
  }

  /**
   * Se formatea y se envía la planificación al back
   */
  save(myForm: UntypedFormGroup) {
    this.isClicked = true;
    let patientId: number;
    this.patients.forEach((p) => {
      if (
        p.firstName.toLowerCase() + ' ' + p.lastName.toLowerCase() ==
        this.planningForm.value.patient.toLowerCase()
      ) {
        patientId = p.id;
      }
    });
    let gamesPost: any[] = [];
    this.assignedGames.forEach((g) => {
      let gamePost = {
        gameId: g.id,
        maxNumberOfSessions: g.hasLimit ? g.maxNumberOfSessions : -1,
        params: undefined,
        difficulty: undefined,
      };

      let params: any = {};

      g.gameParam.forEach((p) => {
        if (p.isActive) {
          let newParam = { [p.param.className]: p.value };
          params = { ...params, ...newParam };
        }
      });
      gamePost.params = params;
      gamePost.difficulty = this.difficultyService.getDifficulty(g);
      gamesPost.push(gamePost);
    });
    if (myForm.valid) {
      let jsonPost = {
        patientId: patientId,
        planningName: myForm.value.planningName,
        stateId: 1,
        professionalId: window.localStorage.getItem('professionalId'),
        startDate: myForm.value.startDate,
        dueDate: myForm.value.finishDate,
        games: gamesPost,
      };
      this.planningApiService.postPlanning(jsonPost).subscribe(
        (res) => {
          this.presentAlert(
            '¡Planificación creada!',
            '<p>La planificación ha sido registrada correctamente. </p>',
            true,
            'alertSuccess'
          );
        },
        (err) => {
          this.presentAlert(
            'Error',
            'Un error ha ocurrido, por favor inténtelo de nuevo más tarde.',
            false,
            'alertError'
          );
          this.isClicked = false;
        }
      );
    }
  }

  /**
   * Habilita o desabilita el botón de submit
   * @returns true o false según corresponda.
   */
  submitDisabled() {
    let gamesAreDone = true;
    if (this.planningGames.length == 0) {
      gamesAreDone = false;
    }
    this.planningGames.forEach((g) => {
      if (!g.done) {
        gamesAreDone = false;
      }
    });
    if (gamesAreDone) {
      this.planningForm.patchValue({ games: 'ok' });
    } else {
      this.planningForm.patchValue({ games: null });
    }
    return !this.planningForm.valid || !this.patientExists();
  }
}
