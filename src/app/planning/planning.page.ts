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

  filterPlannings(event) {
    const removeAccents = (str) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    } 
    let search = removeAccents(event.srcElement.value)
    if (search == ''){
      this.filteredPlannings = JSON.parse(JSON.stringify(this.plannings));
    } else{
      this.getPlanningsFiltered(search)
    }
  }

  getPlanningsFiltered(search: string) {
    this.planningApiService.getPlanningsOverviewFiltered(search).subscribe((res) => {
      this.filteredPlannings = res.content;
    });
  }


}
