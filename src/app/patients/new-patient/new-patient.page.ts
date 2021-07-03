import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';
import { PatientsApiService } from '../services/patients-api.service';

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.page.html',
  styleUrls: ['./new-patient.page.scss'],
})

export class NewPatientPage implements OnInit {
  
  myForm: FormGroup;
  
  datePickerObj: any = {};
  constructor(private patientsApiService: PatientsApiService, public modalCtrl: ModalController) { };
  
  ngOnInit() {
    this.myForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      bornDate: new FormControl('', Validators.required),
      description: new FormControl(),
      city: new FormControl('', Validators.required)
    });


    this.datePickerObj = {
      showTodayButton: false,
      closeOnSelect: true,
      setLabel: 'Ok',
      closeLabel: 'Cerrar',
      titleLabel: 'Selecciona una fecha', 
      dateFormat: 'DD-MM-YYYY',
      clearButton : false,
      monthsList: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
  };
   
  }
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
  save(myForm: FormGroup){
    let patient: any = {
      firstName: myForm.value.firstName,
      lastName: myForm.value.lastName,
      bornDate: myForm.value.bornDate,
      city: myForm.value.city,
      description: myForm.value.description
    }
    this.patientsApiService.postPatient(patient).subscribe(res => {console.log(res)});
  }
}
