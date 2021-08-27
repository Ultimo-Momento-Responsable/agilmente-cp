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

  constructor(
    private planningApiService: PlanningApiService,
    private navController: NavController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.planningApiService.getPlanningsOverview().subscribe((res) => {
      this.plannings = res.content;
    });
  }

  /**
   * Redirige al usuario a la página del detalle
   * de la planificacion.
   * @param planning Id de la planificacion.
   */
  goToPlanningDetail(planning: any) {
    this.navController.navigateForward([`planning/planningDetail/${planning.id}`]);
  }

}
