import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular/providers/modal-controller';
import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';

@Component({
  selector: 'app-ux-datepicker',
  templateUrl: './ux-datepicker.component.html',
  styleUrls: ['./ux-datepicker.component.scss'],
})
export class UxDatepickerComponent implements OnInit {

  constructor(public modalCtrl: ModalController) { }
  datePickerObj: any = {};

  ngOnInit() {}
  
  ionViewWillEnter(){
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
}
