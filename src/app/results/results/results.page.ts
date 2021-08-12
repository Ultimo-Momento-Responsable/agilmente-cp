import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ResultsApiService } from '../shared-results/services/results-api/results-api.service';
@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {
  results: any[];

  constructor(
    private resultsApiService: ResultsApiService,
    private navController: NavController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.resultsApiService.getResults().subscribe((res) => {
      this.results = res.content;
    });
  }

  /**
   * Redirige al usuario a la página del detalle
   * del resultado.
   * @param id Id del resultado.
   */
  goToSubresults(id: number) {
    this.navController.navigateForward(['results/', id]);
  }
}
