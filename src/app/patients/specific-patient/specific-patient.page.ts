import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import moment from 'moment';
import {
  PlanningApiService,
  PlanningOverview,
  PlanningState,
} from 'src/app/planning/services/planning-api.service';
import { ResultsApiService } from 'src/app/results/shared-results/services/results-api/results-api.service';
import { DialogsComponent } from 'src/app/shared/components/dialogs/dialogs.component';
import { PlanningSearchComponent } from 'src/app/shared/components/planning-search/planning-search.component';
import { CustomDatePipe } from 'src/app/shared/pipes/custom-date.pipe';
import {
  Patient,
  PatientsApiService,
} from '../shared-patients/services/patients-api/patients-api.service';

@Component({
  selector: 'app-specific-patient',
  templateUrl: './specific-patient.page.html',
  styleUrls: ['./specific-patient.page.scss'],
})
export class SpecificPatientPage implements OnInit {
  @ViewChild(PlanningSearchComponent) pSC: PlanningSearchComponent;

  id: any;
  patient: Patient;
  results: any;
  showResults: boolean = true;
  currentTab: string = 'data';
  comment: string = '';
  auxComment: any = null;

  plannings: PlanningOverview[];
  filteredPlannings: PlanningOverview[];
  planningStates: PlanningState[] = [];
  skeletonLoading = true;
  selectedStates: string[] = [];
  search: string = '';
  lastResults: any[] = [];
  ongoingPlannings: any[] = [];
  showMorePlannings: boolean = false;

  constructor(
    private patientsApiService: PatientsApiService,
    private planningApiService: PlanningApiService,
    private route: ActivatedRoute,
    private router: Router,
    public alertController: AlertController,
    private dialogsComponent: DialogsComponent,
    private resultsApiService: ResultsApiService,
    private customDatePipe: CustomDatePipe
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];

      this.patientsApiService.getPatientById(this.id).subscribe((res) => {
        this.patient = res;
        this.patient.comments.forEach((comment) => {
          comment.isEditing = false;
        });
        this.sortById(this.patient.comments);
        this.getLastResults();
        this.getOngoingPlannings();
      });
    });
    
  }

  /**
   * Obtiene las plannings asignadas a ese paciente seg??n los criterios
   * de b??squeda establecidos.
   */
  getInitialPlannings() {
    if (this.pSC)
    {
      this.selectedStates = this.pSC.selectedStates;
    }
    if (this.selectedStates.includes("Completada")) {
      this.selectedStates.push("Completada y Terminada");
    }
    this.planningApiService.getPlanningStates().subscribe((res) => {
      res.pop();
      this.planningStates = res;
      if (this.selectedStates.length == 0) {
        this.selectedStates.push(this.planningStates[0].name);
        this.selectedStates.push(this.planningStates[1].name);
      }
      this.planningApiService
        .getPlanningsOverviewFiltered('', this.selectedStates, this.id)
        .subscribe((res) => {
          this.plannings = res;
          this.filteredPlannings = JSON.parse(JSON.stringify(this.plannings));
          this.skeletonLoading = false;
        });
    });
  }

  /**
   * Toma un array de objetos y los ordena descendientemente por ID
   * @param objectArray Array de objetos.
   */
  sortById(objectArray: any[]) {
    objectArray.sort(function (a, b) {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
      return 0;
    });
  }

  /**
   * Borra y desvincula el paciente (cuando clickea el bot??n de eliminar).
   */
  async deletePatient() {
    const confirm = await this.dialogsComponent.presentAlertConfirm(
      'Eliminar paciente',
      '??Desea eliminar al paciente? Esta acci??n no puede deshacerse'
    );

    if (confirm) {
      this.patientsApiService.deletePatient(this.id).subscribe(
        () => {
          this.dialogsComponent.presentAlert(
            'Paciente eliminado',
            '',
            '<p>El paciente ha sido eliminado correctamente.',
            '/patients'
          );
        },
        (err) => {
          this.dialogsComponent.presentAlert(
            'Error',
            '',
            'Un error ha ocurrido, por favor int??ntelo de nuevo m??s tarde.',
            '/patients'
          );
        }
      );
    }
  }

  /**
   * Agrega un comentario a la caja de comentarios
   */
  addComment() {
    let patientComment = {
      patientId: this.patient.id,
      comment: this.comment,
      professionalFirstName: window.localStorage.getItem('firstName'),
      professionalLastName: window.localStorage.getItem('lastName'),
    };
    this.patientsApiService.addComment(patientComment).subscribe(() => {
      this.comment = '';
      this.patientsApiService.getPatientById(this.id).subscribe((res) => {
        this.patient = res;
        this.sortById(this.patient.comments);
      });
    });
  }

  /**
   * Chequea si el profesional puede editar o eliminar el comentario
   * @param comment comentario
   * @returns verdadero o falso, seg??n si puede o no borrar/editar el comentario
   */
  canEditOrRemoveComment(comment: any): boolean {
    return (
      comment.author.firstName + comment.author.lastName ==
      window.localStorage.getItem('firstName') +
        window.localStorage.getItem('lastName')
    );
  }

  /**
   * Comienza a editar el comentario y se guarda el mismo en caso de que se cancele
   * @param comment comentario
   */
  startEditingComment(comment: any) {
    comment.isEditing = true;
    this.auxComment = comment.comment;
  }

  /**
   * Cancela la edici??n del comentario y vuelve al estado inicial
   * @param comment
   */
  cancelEditingComment(comment: any) {
    comment.isEditing = false;
    comment.comment = this.auxComment;
  }

  /**
   * Edita un comentario de la caja de comentarios
   * @param comment el comentario a editar
   */
  editComment(comment: any) {
    let patientComment = {
      patientId: this.patient.id,
      commentId: comment.id,
      comment: comment.comment,
    };
    this.patientsApiService.editComment(patientComment).subscribe((res) => {
      this.comment = '';
      this.patientsApiService.getPatientById(this.id).subscribe((res) => {
        this.patient = res;
        this.sortById(this.patient.comments);
      });
    });
  }

  /**
   * Borra un comentario
   * @param commentId id del comentario
   */
  async deleteComment(commentId: number) {
    const confirm = await this.dialogsComponent.presentAlertConfirm(
      'Eliminar Comentario',
      '??Desea eliminar este comentario? Esta acci??n no puede deshacerse'
    );
    if (confirm) {
      let patientComment = {
        patientId: this.patient.id,
        commentId: commentId,
      };
      this.patientsApiService.deleteComment(patientComment).subscribe(
        () => {
          this.dialogsComponent.presentAlert(
            'Comentario eliminado',
            '',
            '<p>El comentario ha sido eliminado correctamente.',
            ''
          );
          this.patientsApiService.getPatientById(this.id).subscribe((res) => {
            this.patient = res;
            this.sortById(this.patient.comments);
          });
        },
        (err) => {
          this.dialogsComponent.presentAlert(
            'Error',
            '',
            'Un error ha ocurrido, por favor int??ntelo de nuevo m??s tarde.',
            ''
          );
        }
      );
    }
  }

  /**
   * Desvincula el paciente.
   */
  async unlinkPatient() {
    const confirm = await this.dialogsComponent.presentAlertConfirm(
      'Desvincular paciente',
      '??Desea desvincular a este paciente? Esto no le permitir?? utilizar la aplicaci??n m??vil.'
    );

    if (confirm) {
      this.patient.logged = false;
      this.patient.loginCode = null;
      this.patientsApiService.putPatient(this.patient, this.id).subscribe(
        (res) => {},
        (err) => {
          this.dialogsComponent.presentAlert(
            'Error',
            '',
            'Un error ha ocurrido, por favor int??ntelo de nuevo m??s tarde.',
            ''
          );
        }
      );
    }
  }

  /**
   * Genera un c??digo nuevo para el paciente desvinculado.
   */
  resetCode() {
    let code = Math.floor(Math.random() * 1000000);
    let codeString = code.toString();
    while (codeString.length < 6) {
      codeString = '0' + codeString;
    }
    this.patient.loginCode = codeString;
    this.patientsApiService
      .putPatient(this.patient, this.id)
      .subscribe((res) => {});

    this.dialogsComponent.presentAlert(
      '??C??digo generado!',
      '',
      'Mu??strale este c??digo a tu paciente para que pueda ingresar a la app. \n</p><h3>' +
        codeString +
        '</h3>',
      ''
    );
  }

  /**
   * Redirige al usuario a la p??gina del detalle
   * de la planificacion.
   * @param planning Id de la planificacion.
   */
  goToPlanningDetail(planning: any) {
    this.router.navigateByUrl('/planning/' + planning.planningId);
  }

  /**
   * Obtiene las planificaciones de una pagina especifica, filtra por nombre, nombre y/o apellido de paciente
   * si se provee un valor en el campo de busqueda.
   * Adem??s filtra por los estados seleccionados.
   * @param search texto de b??squeda para filtrar planificaciones.
   * @param statesToFilter estados con los que filtrar
   */
  getPlanningsFiltered(statesToFilter, search) {
    this.planningApiService
      .getPlanningsOverviewFiltered(search, statesToFilter, this.id)
      .subscribe((res) => {
        this.filteredPlannings = res;
        this.skeletonLoading = false;
      });
  }

  /**
   * Obtiene los resultados de todos los juegos de un paciente.
   * los ordena por la fecha m??s reciente primero y muestra los 3 primeros resultados.
   * Adicionalmente calcula cuantos d??as pasaron desde dicha fecha hasta el momento de la consulta.
   */
  getLastResults() {
    moment.locale('es');
    this.resultsApiService.getResultsByPatient(this.id).subscribe((res) => {
      let auxResults: any[] = [];
      const games = Object.keys(res);
      games.forEach((game) => {
        const mappedResults = res[game].results.map((r) => {
          r.game = res[game].gameName;
          r.gameLink = r.game.toLowerCase().replace(/\s/g, '-');
          r.lastPlayed = moment(
            this.customDatePipe.parseDate(r.completeDatetime)
          ).fromNow();
          return r;
        });
        auxResults = [...auxResults, ...mappedResults];
      });
      auxResults = auxResults.sort((a, b) => {
        return (
          this.customDatePipe.parseDate(b.completeDatetime).getTime() -
          this.customDatePipe.parseDate(a.completeDatetime).getTime()
        );
      });
      this.lastResults = auxResults.splice(0, 3);
    });
  }

  /**
   * Cambia a la tab "Planificaciones" llamando los metodos correspondientes.
   */
  goToPlannings() {
    this.getInitialPlannings()
    this.currentTab = "plannings"
  }

  /**
   * Obtiene las planificaciones vigentes del paciente.
   * muestra los 3 primeros resultados.
   * formatea los datos para mostrar en la tarjeta de informacion del paciente.
   */
  getOngoingPlannings() {
    this.planningApiService.getPlanningsOverviewFiltered('', ['Vigente'], this.id). subscribe((res) => {
      let patientPlannings = res
      this.ongoingPlannings = patientPlannings.splice(0,3)
      
      if (patientPlannings.length != 0) {
        for (let i = 0; i < patientPlannings.length; i++) {
          patientPlannings[i].planningName = patientPlannings[i].planningName.substring(0, 32);
          if (patientPlannings[i].planningName.length == 32) {
            patientPlannings[i].planningName += '...';
          }
        }
        if (patientPlannings.length >= 3) {
          this.showMorePlannings = true;
        }
      }
    })
  }
}
