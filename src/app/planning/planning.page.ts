import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PlanningApiService } from './services/planning-api.service';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.page.html',
  styleUrls: ['./planning.page.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PlanningPage implements OnInit {
  plannings: any[];
  planningStates: any[] = [];
  filteredPlannings: any[];
  skeletonLoading = true;
  selectedStates: any[] = [];
  search: string = "";

  constructor(
    private planningApiService: PlanningApiService,
    private navController: NavController,
    private cd: ChangeDetectorRef
  ) { }
  
  ngOnInit() {
    this.planningApiService.getPlanningStates().subscribe((res) => {
      this.planningStates = res;
      this.selectedStates.push(this.planningStates[0].name)
      this.selectedStates.push(this.planningStates[1].name)
    });
    this.planningApiService.getPlanningsOverview().subscribe((res) => {
      this.plannings = res.content;
      this.filteredPlannings = JSON.parse(JSON.stringify(this.plannings));
      this.skeletonLoading = false;
    });
  }
  ngAfterViewInit() {
    this.cd.detectChanges();
  }
  ionViewWillEnter() {
    this.planningApiService.getPlanningsOverviewFiltered('',this.selectedStates).subscribe((res) => {
      this.plannings = res.content;
      this.filteredPlannings = JSON.parse(JSON.stringify(this.plannings));
      this.skeletonLoading = false;
    });
  }

  /**
   * Redirige al usuario a la página del detalle
   * de la planificacion.
   * @param planning Id de la planificacion.
   */
  goToPlanningDetail(planning: any) {
    this.navController.navigateForward([`planning/${planning.planningId}`]);
  }

  /**
   * Si se ingresa texto en el campo de busqueda de la planificación, obtiene las planificaciones que posean dicho texto.
   * @param event Valor ingresado en el campo de busqueda de planificación
   */
  filterPlannings(event) {
    this.skeletonLoading = true;
    const removeAccents = (str) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    this.search = removeAccents(event.srcElement.value)
    while (this.search.substring(0,1) == " ") {
      this.search = this.search.substring(1)
    }
    this.getPlanningsFiltered(this.search)
  }

  /**
   * Obtiene las planificaciones de una pagina especifica, filtra por nombre, nombre y/o apellido de paciente 
   * si se provee un valor en el campo de busqueda.
   * Además filtra por los estados seleccionados.
   * @param search valor para filtrar planificaciones.
   */
  getPlanningsFiltered(search: string) {
    this.planningApiService.getPlanningsOverviewFiltered(search,this.selectedStates).subscribe((res) => {
      this.filteredPlannings = res.content;
      this.skeletonLoading = false;
    });
  }

}
