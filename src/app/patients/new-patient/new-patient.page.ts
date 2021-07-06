import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';
import { PatientsApiService } from '../services/patients-api.service';

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.page.html',
  styleUrls: ['./new-patient.page.scss'],
})

export class NewPatientPage implements OnInit {
  
  myForm: FormGroup;
  minDate: Date;
  maxDate: Date;
  datePickerObj: any = {};

  constructor(private patientsApiService: PatientsApiService, 
    public modalCtrl: ModalController,
    public alertController: AlertController,
    private router: Router
  ) { 
    const currentDate = new Date();
    this.minDate = new Date(1900, 0, 1);
    this.maxDate = new Date(currentDate.getFullYear() - 10, currentDate.getMonth(), currentDate.getDay());
  };

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
      fromDate: this.minDate,
      toDate: this.maxDate,
      inputDate: this.maxDate
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
    if (myForm.valid){
      let patient: any = {
        firstName: myForm.value.firstName,
        lastName: myForm.value.lastName,
        bornDate: myForm.value.bornDate,
        city: myForm.value.city,
        description: myForm.value.description
      }
      this.patientsApiService.postPatient(patient).subscribe(res => {
        this.presentAlert('¡Paciente creado!','El paciente ha sido registrado correctamente.', true, 'alertSuccess');
        
      }, (err) => {
        this.presentAlert('Error','Un error ha ocurrido, por favor inténtelo de nuevo más tarde.', false, 'alertError');
      });
    }
  }

  async presentAlert(subHeader: string, message: string, reset: boolean, css: string) {
    const alert = await this.alertController.create({
      message: message,
      header: 'Cargar Paciente',
      subHeader: subHeader,
      cssClass: css,
      buttons: [{
        text: 'OK',
        cssClass: css
      }],
      
    });
    await alert.present(); 
    if (await alert.onDidDismiss()){
      if (reset){
        this.router.navigateByUrl('/patients')
      }
    }
  }
}
