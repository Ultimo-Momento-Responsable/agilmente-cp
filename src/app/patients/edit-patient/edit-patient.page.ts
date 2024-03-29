import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';
import { PatientsApiService } from '../shared-patients/services/patients-api/patients-api.service';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.page.html',
  styleUrls: ['./edit-patient.page.scss'],
})

export class EditPatientPage implements OnInit {
  myForm: UntypedFormGroup;
  id: any;
  datePickerObj: any = {};
  minDate: Date;
  maxDate: Date;
  patient: any = {};
  isClicked : boolean;

  //Verifica si el campo es invalido
  invalidField(field: string) {
    return this.myForm.get(field).invalid && this.myForm.get(field).touched;
  }  

  constructor(private patientsApiService: PatientsApiService, 
    private route: ActivatedRoute,
    public modalCtrl: ModalController,
    public alertController: AlertController,
    private router: Router)
  {
    const currentDate = new Date();
    this.minDate = new Date(1900, 0, 1);
    this.maxDate = new Date(currentDate.getFullYear() - 10, currentDate.getMonth(), currentDate.getDate());
  }

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

    // Recibe el id del paciente seleccionado, para que se edite ese en específico
    this.route.params.subscribe(params => {
      this.id = +params['id']; 
    });

    // Obtiene los valores del paciente para rellenar los campos del formulario
    this.patientsApiService.getPatientById(this.id).subscribe(res => {
      this.patient = res
      this.myForm.setValue({
        firstName: this.patient.firstName,
        lastName: this.patient.lastName,
        birthDate: this.patient.bornDate,
        telephone: this.patient.telephone,
        email: this.patient.email,
        description: this.patient.description,
        city: this.patient.city
      }) 
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

  // Guarda el paciente editado
  save(myForm: UntypedFormGroup){
    this.isClicked = true;
    if (myForm.valid){
      let patient: any = {
        firstName: myForm.value.firstName,
        lastName: myForm.value.lastName,
        bornDate: myForm.value.birthDate,
        city: myForm.value.city,
        description: myForm.value.description,
        telephone: myForm.value.telephone,
        email: myForm.value.email,
        id: this.id,
        logged: this.patient.logged,
        loginCode: this.patient.loginCode
      }

      
      this.patientsApiService.putPatient(patient,this.id).subscribe(res => {
        this.presentAlert('¡Paciente editado!','El paciente ha sido editado correctamente.', true, 'alertSuccess');
      }, (err) => {
        this.presentAlert('Error','Un error ha ocurrido, por favor inténtelo de nuevo más tarde.', false, 'alertError');
        this.isClicked = false;
      });
    }
  }

  async presentAlert(subHeader: string, message: string, reset: boolean, css: string) {
    const alert = await this.alertController.create({
      message: message,
      header: 'Editar Paciente',
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
