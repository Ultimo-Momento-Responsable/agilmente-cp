import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';
import { PatientsApiService } from '../shared-patients/services/patients-api/patients-api.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.page.html',
  styleUrls: ['./new-patient.page.scss'],
})

export class NewPatientPage implements OnInit {
  
  myForm: UntypedFormGroup;
  minDate: Date;
  maxDate: Date;
  datePickerObj: any = {};
  isClicked: boolean;

  //Verifica si el campo es invalido
  invalidField(field: string) {
    return this.myForm.get(field).invalid && this.myForm.get(field).touched;
  } 

  constructor(
    private patientsApiService: PatientsApiService, 
    public modalCtrl: ModalController,
    public alertController: AlertController,
    private router: Router,
    private titlecasePipe: TitleCasePipe)
  { 
    const currentDate = new Date();
    this.minDate = new Date(1900, 0, 1);
    this.maxDate = new Date(currentDate.getFullYear() - 10, currentDate.getMonth(), currentDate.getDate());
  };

  ngOnInit() {
    
    this.myForm = new UntypedFormGroup({
      firstName: new UntypedFormControl('', Validators.required),
      lastName: new UntypedFormControl('', Validators.required),
      birthDate: new UntypedFormControl('', Validators.required),
      telephone: new UntypedFormControl(),
      email: new UntypedFormControl('',Validators.email),
      description: new UntypedFormControl(),
      city: new UntypedFormControl('', Validators.required)
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
      weeksList: ["D", "L", "M", "X", "J", "V", "S"],
      fromDate: this.minDate,
      toDate: this.maxDate,
      inputDate: this.maxDate
    };
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

  // Guarda el Paciente rellenado en el formulario
  save(myForm: UntypedFormGroup) {
    this.isClicked = true;
    if (myForm.valid) {
      let code = this.createLoginCode()
      let patient: any = {
        firstName: this.titlecasePipe.transform(myForm.value.firstName),
        lastName: this.titlecasePipe.transform(myForm.value.lastName),
        bornDate: myForm.value.birthDate,
        city: myForm.value.city,
        telephone: myForm.value.telephone,
        email: myForm.value.email,
        description: myForm.value.description,
        loginCode: code,
        isLogged: false
      }

      this.patientsApiService.postPatient(patient).subscribe(res => {
        this.presentAlert('¡Paciente creado!','<p>El paciente ha sido registrado correctamente. \n' +
        'Muéstrale este código a tu paciente para que pueda ingresar a la app. \n</p><h3>' + code + '</h3>', true, 'alertSuccess'); 
      }, (err) => {
        this.presentAlert('Error','Un error ha ocurrido, por favor inténtelo de nuevo más tarde.', false, 'alertError');
        this.isClicked = false;
      });
    }
  }

  createLoginCode() : string {
    let code = Math.floor(Math.random() * (1000000));
    let codeString = code.toString()
    while (codeString.length < 6) {
      codeString = '0' + codeString;
    }
    return codeString
  }

  // Muestra la alerta.
  async presentAlert(subHeader: string, message: string, reset: boolean, css: string) {
    const alert = await this.alertController.create({
      message: message,
      header: 'Cargar Paciente',
      subHeader: subHeader,
      cssClass: 'centerh3',
      buttons: [{
        text: 'OK'
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
