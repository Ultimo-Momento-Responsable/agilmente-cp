import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-patient-planning-name',
  templateUrl: './patient-planning-name.component.html',
  styleUrls: ['../../../new-planning/new-planning.page.scss'],
})
export class PatientPlanningNameComponent implements OnInit {

  @Input() patients: any[];
  @Input() disabled = false;
  @Input() patient = "";
  @Input() planning = "";
  @Output() patientName = new EventEmitter<string>();
  @Output() planningName = new EventEmitter<string>();
  patientBlur = false;
  patientsSearch: any [] = [];

  constructor() { }

  ngOnInit(): void {
    if (this.patient!="") {
      this.fillSearchBar(this.patient);
    }
  }

  /**
   * Manda el nuevo nombre de la planning al componente padre.
   */
  changePlanningName(){
    this.planningName.emit(this.planning);
  }

  /**
   * Filtra pacientes según la búsqueda
   * @param evt búsqueda realizada.
   */
  filterPatient(evt){
    const removeAccents = (str) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    } 
    const search = removeAccents(evt.srcElement.value);
    if (this.patients){
      this.patientsSearch = this.patients.filter((p)=> {
        if (search && this.patientsSearch){
          return ((p.firstName.toLowerCase() + " " + p.lastName.toLowerCase()).normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(search.toLowerCase()) > -1)
        }
      })
    }
  }

  /**
   * Llena el campo del paciente cuando clickeas el que deseas en la lista
   * Lo envía al componente padre.
   * @param name nombre del paciente
   */
  fillSearchBar(name: string) {
    this.patient = name;
    if (this.patient){
      this.planning = "Planificacion de " + this.patient;
      this.patientName.emit(this.patient);
      this.planningName.emit(this.planning);
    }
    this.patientsSearch = null;
  }

  /**
   * Chequea que el paciente que se está buscando existe
   * @returns true o false según corresponda
   */
  patientExists(){
    let exists = false;
    this.patients?.forEach(p => {
      if ((p.firstName.toLowerCase() + " " + p.lastName.toLowerCase())==this.patient.toLowerCase()){
        exists = true;
      }
    });
    return exists
  }
}
