import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PlanningApiService } from './services/planning-api.service';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.page.html',
  styleUrls: ['./planning.page.scss'],
})
export class PlanningPage implements OnInit {
  plannings: any[];
  filteredPlannings: any[];
  skeletonLoading = true;
  constructor(
    private planningApiService: PlanningApiService,
    private navController: NavController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.planningApiService.getPlanningsOverview().subscribe((res) => {
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
    let search = removeAccents(event.srcElement.value)
    if (search == ''){
      this.skeletonLoading = false;
      this.filteredPlannings = JSON.parse(JSON.stringify(this.plannings));
    } else{
      this.getPlanningsFiltered(search)
    }
  }

  /**
   * Obtiene las planificaciones de una pagina especifica, filtra por nombre, nombre y/o apellido de paciente 
   * si se provee un valor en el campo de busqueda.
   * @param search valor para filtrar planificaciones.
   */
  getPlanningsFiltered(search: string) {
    this.planningApiService.getPlanningsOverviewFiltered(search).subscribe((res) => {
      this.filteredPlannings = res.content;
      this.skeletonLoading = false;
    });
  }


}
