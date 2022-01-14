import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Patient } from 'src/app/patients/patients/patients.page';

@Component({
  selector: 'app-patient-card',
  templateUrl: './patient-card.component.html',
  styleUrls: ['./patient-card.component.scss'],
})
export class PatientCardComponent implements OnInit {
  @Input() patient: Patient;

  constructor(private navController: NavController) { }

  ngOnInit() {}

  /**
   * Redirije al usuario a la página de editar paciente.
   */
  goToEditPatient() {
    this.navController.navigateForward(['/edit-patient/', this.patient.id]);
  }

  /**
   * Redirije al usuario a la página de detalle paciente.
   */
  goToPatientDetail() {
    this.navController.navigateForward(['/patients/', this.patient.id]);
  }
}