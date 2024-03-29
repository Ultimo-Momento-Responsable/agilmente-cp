import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';
import { ModalController } from '@ionic/angular';
import moment from 'moment';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-start-finish-date',
  templateUrl: './start-finish-date.component.html',
  styleUrls: ['../../../new-planning/new-planning.page.scss'],
})
export class StartFinishDateComponent implements OnInit {
  @Output() startPlanningDate = new EventEmitter<string>();
  @Output() finishPlanningDate = new EventEmitter<string>();
  @Input() startDate = null;
  @Input() finishDate = null;
  @Input() disabled = false;
  datesForm: UntypedFormGroup = new UntypedFormGroup({
    startDate: new UntypedFormControl('', Validators.required),
    finishDate: new UntypedFormControl('', Validators.required)
  });
  datePickerStart = {
    showTodayButton: false,
    closeOnSelect: true,
    setLabel: 'Ok',
    closeLabel: 'Cerrar',
    titleLabel: 'Selecciona fecha de inicio', 
    dateFormat: 'DD-MM-YYYY',
    clearButton : false,
    monthsList: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    weeksList: ["D", "L", "M", "X", "J", "V", "S"],
    fromDate: new Date(),
    inputDate: this.startDate
  };
  datePickerFinish = {
    showTodayButton: false,
    closeOnSelect: true,
    setLabel: 'Ok',
    closeLabel: 'Cerrar',
    titleLabel: 'Selecciona fecha de fin', 
    dateFormat: 'DD-MM-YYYY',
    clearButton : false,
    monthsList: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    weeksList: ["D", "L", "M", "X", "J", "V", "S"],
    fromDate: new Date(),
    inputDate: this.finishDate
  };
  constructor(public modalCtrl: ModalController) {}

  ngOnInit(): void {
    if (this.startDate){
      this.datesForm.patchValue({"startDate": this.startDate});
    }
    if (this.finishDate){
      this.datesForm.patchValue({"finishDate": this.finishDate});
    }
  }
  /**
   * Abre el DatePicker
   */
  async openDatePicker() {
    const datePickerModal = await this.modalCtrl.create({
      component: Ionic4DatepickerModalComponent,
      cssClass: 'li-ionic4-datePicker'
    });
    await datePickerModal.present();
  }

  /**
   * Cambia el valor mínimo que puede tener el datepicker del fin de la planning
   * Además envía la fecha de inicio al componente padre. 
   */ 
  setFinishMinDate(){
    this.startPlanningDate.emit(this.datesForm.value.startDate);
    var dateSplit = this.datesForm.value.startDate.split("-");
    let date = new Date(parseInt(dateSplit[2]), parseInt(dateSplit[1]) - 1, parseInt(dateSplit[0]) + 1);
    this.datePickerFinish.fromDate = date;
    this.datePickerFinish.inputDate = date;
    const startDate = this.parseDate(this.datesForm.value.startDate);
    const finishDate = this.parseDate(this.datesForm.value.finishDate);
    if (startDate >= finishDate) {
      this.datesForm.patchValue({'finishDate':null});
    }
  }

  /**
   * Manda al componente padre el valor la fecha de finalización
   */
  sendFinishDate() {
    this.finishPlanningDate.emit(this.datesForm.value.finishDate);
  }

  /**
   * Devuelve un objeto Date partiendo de un String como el que se utiliza en los formularios
   * date: String cadena formato DD-MM-YYYY
   * returns Date fecha válida
   */
  parseDate(date) {
    const dateSplit = date.split("-");
    return new Date(parseInt(dateSplit[2]), parseInt(dateSplit[1]) - 1, parseInt(dateSplit[0]));
  }
}