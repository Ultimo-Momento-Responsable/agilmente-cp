import { Component, OnInit } from '@angular/core';
import { PatientsApiService } from '../shared-patients/services/patients-api/patients-api.service';

export interface Patient {
  id: number,
  firstName: string,
  lastName: string,
  description: string,
  age: number,
  city: string
}

@Component({
  selector: 'app-patients',
  templateUrl: './patients.page.html',
  styleUrls: ['./patients.page.scss'],
})

export class PatientsPage implements OnInit {
  scrollDepthTriggered = false;
  pageNumber = 0;
  formattedPatients: Patient[] = [];
  auxPatient: Patient;
  patients: any[] = [];
  constructor(private patientsApiService: PatientsApiService) { }

  ngOnInit() {}

  ionViewDidEnter(){
    this.pageNumber = 0;
    this.formattedPatients = [];
    this.getPatients();
    this.patients = this.formattedPatients;
  }

  /**
   * Función que calcula la edad del paciente
   * @param day Día en que nació
   * @param month Mes en el que nació
   * @param year Año en el que nació
   * @returns Edad del paciente
   */
  calculateAge(day:number, month:number, year:number) : number{
    const currentDate = new Date();
    let difYear = currentDate.getFullYear() - year; 
    let difMonth = (currentDate.getMonth()+1) - month;
    let difDay = currentDate.getDate() - day;
    if (difDay<0){
      difMonth--;
    }
    if (difMonth<0){
      difYear--;
    }
    return difYear
  }

  /**
   * Obtiene los pacientes de una pagina especifica, filtra por nombre o apellido si se provee un valor en el campo de busqueda.
   * @param fullName valor para filtrar pacientes.
   */
  getPatientsFiltered(fullName: String) {
    this.formattedPatients = [];
    this.pageNumber = 0; 
    if (fullName == "") {
      this.getPatients();
    }
    let auxPatientList = []
    this.patientsApiService.getFilteredPatients(fullName).subscribe(res =>{
      res.content.forEach(p => {
        const textDate = p.bornDate.split('-');
        const calculatedAge = this.calculateAge(textDate[0],textDate[1],textDate[2]);
        let description = p.description
        if (description){
          description = p.description.substring(0,45)
          if (description.length == 45) {
            description += '...'
          }
        }
        
        this.auxPatient = {
          "id": p.id,
          "firstName": p.firstName,
          "lastName": p.lastName,
          "description": description,
          "age": calculatedAge,
          "city": p.city
        }
        
        auxPatientList.push(this.auxPatient);
      })
      this.formattedPatients = auxPatientList;
    });
  }
  getPatients(){
    this.patientsApiService.getActivePatients(this.pageNumber).subscribe(res =>{
      res.content.forEach(p => {
        const textDate = p.bornDate.split('-');
        const calculatedAge = this.calculateAge(textDate[0],textDate[1],textDate[2]);
        let description = p.description
        if (description){
          description = p.description.substring(0,45)
          if (description.length == 45) {
            description += '...'
          }
        }
        
        this.auxPatient = {
          "id": p.id,
          "firstName": p.firstName,
          "lastName": p.lastName,
          "description": description,
          "age": calculatedAge,
          "city": p.city
        }
  
        this.formattedPatients.push(this.auxPatient);
      })
    });
    this.scrollDepthTriggered = false;
  }

  /**
   * Si se ingresa texto en el campo de busqueda de paciente, obtiene los pacientes que posean dicho texto.
   * @param event Valor ingresado en el campo de busqueda de paciente
   */
  filterPatientCard(event) {
    const removeAccents = (str) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    } 
    let search = removeAccents(event.srcElement.value)
    this.getPatientsFiltered(search)
  }

  /**
   * Si existen mas de 20 tarjetas de pacientes, carga una pagina nueva de pacientes.
   * @param $event Accion de scroll
   * @returns Una pagina de pacientes siguiente a la actual
   */
  async logScrolling($event) {
    // only send the event once
    if(this.scrollDepthTriggered) {
      return;
    }

    if($event.target.localName != "ion-content") {
      return;
    }

    const scrollElement = await $event.target.getScrollElement();

    const scrollHeight = scrollElement.scrollHeight - scrollElement.clientHeight;

    const currentScrollDepth = $event.detail.scrollTop;

    const targetPercent = 80;

    let triggerDepth = ((scrollHeight / 100) * targetPercent);

    if(currentScrollDepth > triggerDepth && this.formattedPatients.length % 20 == 0) {
      if (this.formattedPatients.length == (this.pageNumber+1)*20){
        this.scrollDepthTriggered = true;
        this.pageNumber++; 
        this.getPatients();
      }
    }
  }
}
