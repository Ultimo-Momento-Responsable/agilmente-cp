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
  loginCode: string;
  logged: boolean;
  enabled: boolean;
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
    description: new FormControl(),
    city: new FormControl(),
  });
  id: any;
  patient: Patient;
  results: any;
  showResults: boolean = true;

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