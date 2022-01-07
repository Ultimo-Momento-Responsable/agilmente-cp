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
  skeletonLoading = true;

  constructor(
    private resultsApiService: ResultsApiService,
    private navController: NavController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.resultsApiService.getResults().subscribe((res) => {
      this.results = res.content;
      this.skeletonLoading = false;
    });
  }

  /**
   * Redirige al usuario a la página del detalle
   * del resultado.
   * @param id Id del resultado.
   */
  goToSubresults(result: any) {
    this.navController.navigateForward([`results/${this.formatGameRoute(result.game)}/${result.id}`]);
  }

  formatGameRoute(gameName: string): string {
    return gameName.toLowerCase().replace(/\s/g, '-');;
  }
}
