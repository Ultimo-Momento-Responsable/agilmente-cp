import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ResultsApiService } from 'src/app/results/shared-results/services/results-api/results-api.service';
import { DialogsComponent } from 'src/app/shared/components/dialogs/dialogs.component';
import { PatientsApiService } from '../shared-patients/services/patients-api/patients-api.service';

export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  description: string;
  bornDate: Date;
  city: string;
  telephone: string,
  email: string,
  loginCode: string;
  logged: boolean;
  enabled: boolean;
  comments: any[];
}

@Component({
  selector: 'app-specific-patient',
  templateUrl: './specific-patient.page.html',
  styleUrls: ['./specific-patient.page.scss'],
})
export class SpecificPatientPage implements OnInit {
  myForm: FormGroup = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    bornDate: new FormControl(),
    telephone: new FormControl(),
    email: new FormControl(),
    description: new FormControl(),
    city: new FormControl(),
  });
  id: any;
  patient: Patient;
  results: any;
  showResults: boolean = true;
  currentTab: string = "data";
  comment: string = "";

  constructor(
    private patientsApiService: PatientsApiService,
    private resultsApiService: ResultsApiService,
    private route: ActivatedRoute,
    private router: Router,
    public alertController: AlertController,
    private dialogsComponent: DialogsComponent
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];

      this.patientsApiService.getPatientById(this.id).subscribe((res) => {
        this.patient = res;
        this.patient.comments.forEach(comment => {
          comment.isEditing = false;
        })
        this.myForm.patchValue(this.patient);
      });

      this.resultsApiService.getResultsByPatient(this.id).subscribe((res) => {
        this.results = res;
        this.results.hayUnoRepetido.results.forEach(r => {
          r.totalTime = r.totalTime.toFixed(2);
        });
        if (this.results.hayUnoRepetido.results?.length==0){
          this.showResults=false;
        }
      });
    });
  }

  /**
   * Borra y desvincula el paciente (cuando clickea el botón de eliminar).
   */
  async deletePatient() {
    const confirm = await this.dialogsComponent.presentAlertConfirm('Eliminar paciente',
    '¿Desea eliminar al paciente? Esta acción no puede deshacerse')
      
    if (confirm) {
      this.patientsApiService.deletePatient(this.id).subscribe(() => {
        this.dialogsComponent.presentAlert('Paciente eliminado','','<p>El paciente ha sido eliminado correctamente.','/patients');
      }, (err) => {
        this.dialogsComponent.presentAlert('Error','','Un error ha ocurrido, por favor inténtelo de nuevo más tarde.','/patients');
      });
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
      professionalLastName: window.localStorage.getItem('lastName')
    };
    this.patientsApiService.addComment(patientComment).subscribe(res => {
      this.comment = "";
      this.patientsApiService.getPatientById(this.id).subscribe((res) => {
        this.patient = res;
      });
    });
  }

  /**
   * Edita un comentario de la caja de comentarios
   * @param commentId id del comentario
   */
  editComment(comment: any) {
    let patientComment = {
      patientId: this.patient.id,
      commentId: comment.id,
      comment: comment.comment
    };
    this.patientsApiService.editComment(patientComment).subscribe(res => {
      this.comment = "";
      this.patientsApiService.getPatientById(this.id).subscribe((res) => {
        this.patient = res;
      });
    });
  }

  /**
   * Borra un comentario
   * @param commentId id del comentario
   */
  async deleteComment(commentId: number){
    const confirm = await this.dialogsComponent.presentAlertConfirm('Eliminar Comentario',
    '¿Desea eliminar este comentario? Esta acción no puede deshacerse')
    if (confirm) {
      let patientComment = {
        patientId: this.patient.id,
        commentId: commentId
      }
      this.patientsApiService.deleteComment(patientComment).subscribe(() => {
        this.dialogsComponent.presentAlert('Comentario eliminado','','<p>El comentario ha sido eliminado correctamente.',"");
        this.patientsApiService.getPatientById(this.id).subscribe((res) => {
          this.patient = res;
        });
      }, (err) => {
        this.dialogsComponent.presentAlert('Error','','Un error ha ocurrido, por favor inténtelo de nuevo más tarde.',"");
      });
    }
  }

  /**
   * Desvincula el paciente.
   */
  unlinkPatient() {
    this.patient.logged = false;
    this.patient.loginCode = null;
    this.patientsApiService
      .putPatient(this.patient, this.id)
      .subscribe((res) => {
        window.location.reload();
      });
  }

  /**
   * Genera un código nuevo para el paciente desvinculado.
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
  }

}