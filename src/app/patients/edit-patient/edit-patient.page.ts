import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';
import { PatientsApiService } from '../services/patients-api.service';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.page.html',
  styleUrls: ['./edit-patient.page.scss'],
})
export class EditPatientPage implements OnInit {
  myForm: FormGroup;
  id: any
  datePickerObj: any = {};
  patient: any = {};

  constructor(private patientsApiService: PatientsApiService, 
    private route: ActivatedRoute,
    public modalCtrl: ModalController,
    public alertController: AlertController,
    private router: Router) { }

  
  ngOnInit() {
    this.myForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      bornDate: new FormControl('', Validators.required),
      description: new FormControl(),
      city: new FormControl('', Validators.required)
    });
    this.route.params.subscribe(params => {
      this.id = +params['id']; 
    });
    this.patientsApiService.getPatientById(this.id).subscribe(res => {
      this.myForm.setValue({
        firstName: res.firstName,
        lastName: res.lastName,
        bornDate: res.bornDate,
        description: res.description,
        city: res.city
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
    };
  }

  ionViewWillEnter() {    
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
        description: myForm.value.description,
        id: this.id
      }
      this.patientsApiService.putPatient(patient,this.id).subscribe(res => {
        this.presentAlert('¡Paciente editado!','El paciente ha sido editado correctamente.', true, 'alertSuccess');
      }, (err) => {
        this.presentAlert('Error','Un error ha ocurrido, por favor inténtelo de nuevo más tarde.', false, 'alertError');
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
