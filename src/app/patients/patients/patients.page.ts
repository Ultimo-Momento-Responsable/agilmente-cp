import { Component, OnInit } from '@angular/core';
import { PatientsApiService } from '../shared-patients/services/patients-api/patients-api.service';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface Patient {
  id: number,
  firstName: string,
  lastName: string,
  description: string,
  age: number,
  city: string,
  isEnabled: boolean
}

@Component({
  selector: 'app-patients',
  templateUrl: './patients.page.html',
  styleUrls: ['./patients.page.scss'],
})

export class PatientsPage implements OnInit {
  isLoadingPage = true;
  hasRegisteredPatients = false;
  scrollDepthTriggered = false;
  pageNumber = 0;
  patients: Patient[] = [];
  skeletonLoading = true;
  searchForm: FormGroup = this.formBuilder.group({
    searchText: [''],
    includeDisabledPatients: [false]
  });

  constructor(private patientsApiService: PatientsApiService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.pageNumber = 0;
    this.filterPatients();
    this.searchForm.valueChanges.subscribe(() => this.filterPatients());
  }

  /**
   * Función que calcula la edad del paciente
   * @param day Día en que nació
   * @param month Mes en el que nació
   * @param year Año en el que nació
   * @returns Edad del paciente
   */
  private static calculateAge(day:number, month:number, year:number) : number {
    const currentDate = new Date();
    let difYear = currentDate.getFullYear() - year; 
    let difMonth = (currentDate.getMonth()+1) - month;
    let difDay = currentDate.getDate() - day;
    if (difDay < 0){
      difMonth--;
    }
    if (difMonth < 0){
      difYear--;
    }
    return difYear
  }

  /**
   * Obtiene los pacientes de una pagina especifica, filtra por nombre o apellido si se provee un valor en el campo de busqueda.
   * @param fullName valor para filtrar pacientes.
   */
  getPatientsFiltered(fullName: string) {
    this.skeletonLoading = true;
    this.pageNumber = 0; 
    this.patientsApiService.getFilteredPatients(fullName, this.searchForm.value.includeDisabledPatients).subscribe((res) => {
      if (res.content.length > 0) {
        this.hasRegisteredPatients = true;
      
        this.patients = res.content.map(this.formatPatient);
        this.patients.sort(this.isPatientAlphabeticallyBefore);
      } else {
        this.patients = [];
      }
      
      this.isLoadingPage = false;
      this.skeletonLoading = false;
    });
  }


  /**
   * Función que ordena los pacientes alfabéticamente.
   * @param x Paciente 1.
   * @param y Paciente 2.
   * @returns Un número que representa el orden en que van los pacientes.
   */
  private isPatientAlphabeticallyBefore(x: Patient, y: Patient): number {
    if  (x.lastName < y.lastName) {
      return -1
    } else if  (x.lastName > y.lastName) {
      return 1
    } else if (x.firstName < y.firstName) {
      return -1;
    } else if (x.firstName > y.firstName) {
      return 1;
    }
    return 0;
  }

  /**
   * Función que formatea los pacientes que llegan desde el back para mostrarlos.
   * @param patient Paciente que llega del back.
   * @returns Un paciente formateado.
   */
  private formatPatient(patient: any): Patient {
    const textDate = patient.bornDate.split('-');
    patient.age = PatientsPage.calculateAge(textDate[0], textDate[1], textDate[2]);
    patient.isEnabled = patient.enabled;

    if (patient.description) {
      patient.description = patient.description.substring(0, 45);
      if (patient.description.length == 45) {
        patient.description += '...';
      }
    }

    return patient;
  }

  /**
   * Si se ingresa texto en el campo de busqueda de paciente, obtiene los pacientes que posean dicho texto.
   * @param event Valor ingresado en el campo de busqueda de paciente
   */
  filterPatients() {
    const removeAccents = (str) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    let search = removeAccents(this.searchForm.value.searchText)
    while (search.substring(0,1) == " ") {
      search = search.substring(1)
    }
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
    if(currentScrollDepth > triggerDepth && this.patients.length % 20 == 0) {
      if (this.patients.length == (this.pageNumber+1)*20){
        this.scrollDepthTriggered = true;
        this.pageNumber++; 
        this.filterPatients();
      }
    }
  }

  /**
   * Cambia el estado de la checkbox cuando se presiona el texto
   */
  toggleCheckbox() {
    this.searchForm.patchValue({includeDisabledPatients: !this.searchForm.value.includeDisabledPatients})
  }
}
