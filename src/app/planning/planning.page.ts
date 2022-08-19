import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PlanningSearchComponent } from '../shared/components/planning-search/planning-search.component';
import { PlanningApiService, PlanningOverview, PlanningState } from './services/planning-api.service';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.page.html',
  styleUrls: ['./planning.page.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PlanningPage implements OnInit {
  @ViewChild(PlanningSearchComponent) pSC: PlanningSearchComponent;
  plannings: PlanningOverview[];
  filteredPlannings: PlanningOverview[];
  planningStates: PlanningState[] = [];
  skeletonLoading = true;
  selectedStates: string[] = [];
  search: string = "";

  constructor(
    private planningApiService: PlanningApiService,
    private navController: NavController
  ) { }
  
  ngOnInit() {
  }
  
  ionViewWillEnter() {
    this.selectedStates = this.pSC.selectedStates;
    if (this.selectedStates.includes("Vigente")) {
      this.selectedStates.push("Vigente con juegos libres");
    }
    this.planningApiService.getPlanningStates().subscribe((res) => {
      this.planningStates = res;
      if (this.selectedStates.length==0){
        this.selectedStates.push(this.planningStates[0].name);
        this.selectedStates.push(this.planningStates[1].name);
        this.selectedStates.push(this.planningStates[4].name);
      } 
      this.planningApiService.getPlanningsOverviewFiltered('',this.selectedStates).subscribe((res) => {
        this.plannings = res;
        this.filteredPlannings = JSON.parse(JSON.stringify(this.plannings));
        this.skeletonLoading = false;
      });
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
   * Obtiene las planificaciones de una pagina especifica, filtra por nombre, nombre y/o apellido de paciente 
   * si se provee un valor en el campo de busqueda.
   * Además filtra por los estados seleccionados.
   * @param search texto de búsqueda para filtrar planificaciones.
   * @param statesToFilter estados con los que filtrar
   */
  getPlanningsFiltered(statesToFilter,search){
    this.planningApiService.getPlanningsOverviewFiltered(search,statesToFilter).subscribe((res) => {
      this.filteredPlannings = res;
      this.skeletonLoading = false;
    });
  }
}
