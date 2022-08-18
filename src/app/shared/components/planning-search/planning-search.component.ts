import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-planning-search',
  templateUrl: './planning-search.component.html',
  styleUrls: ['./planning-search.component.scss'],
})
export class PlanningSearchComponent implements OnInit {
  @Input() selectedStates: any[] = [];
  @Input() planningStates: any[] = [];
  @Input() fromPatient: boolean;
  @Output() skeletonLoading = new EventEmitter<boolean>();
  @Output() statesToFilter = new EventEmitter<any[]>();
  @Output() search = new EventEmitter<string>();
  internalSearch = "";
  label = "Búsqueda por nombre de planificación o paciente";
  constructor() { }

  ngOnInit(): void {
    if (this.fromPatient) {
      this.label = "Búsqueda por nombre de planificación";
    }
  }

  ionViewWillEnter() {   
    this.statesToFilter.emit(this.selectedStates);
  }
  /**
   * Si se ingresa texto en el campo de busqueda de la planificación, obtiene las planificaciones que posean dicho texto.
   * @param event Valor ingresado en el campo de busqueda de planificación
   */
   filterPlannings(event) {
    this.skeletonLoading.emit(true);
    const removeAccents = (str) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    this.internalSearch = removeAccents(event.srcElement.value);
    while (this.internalSearch.substring(0,1) == " ") {
      this.internalSearch = this.internalSearch.substring(1)
    }
    this.getPlanningsFiltered(this.internalSearch)
  }

  /**
   * Obtiene las planificaciones de una pagina especifica, filtra por nombre, nombre y/o apellido de paciente 
   * si se provee un valor en el campo de busqueda.
   * Además filtra por los estados seleccionados.
   * @param search valor para filtrar planificaciones.
   */
   getPlanningsFiltered(search: string) {
    let statesToFilter = this.selectedStates.slice();
    if (statesToFilter.includes("Vigente")) {
      statesToFilter.push("Vigente con juegos libres");
    }
    this.search.emit(search);
    this.statesToFilter.emit(statesToFilter);
  }
}
