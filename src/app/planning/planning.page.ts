import { Component, OnInit } from '@angular/core';
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
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.planningApiService.getPlanningsOverview().subscribe((res) => {
      this.plannings = res.content;
      console.log('Las planning obtenidas son: ',this.plannings)
    });
  }

}
