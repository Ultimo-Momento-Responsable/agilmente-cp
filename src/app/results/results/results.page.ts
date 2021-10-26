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
      console.log(this.results[0].completeDatetime)
      console.log('Los resultados obtenidos son: ', this.results)
      this.results.sort(function (a, b) {
        if (a.completeDatetime < b.completeDatetime) {
          return 1;
        }
        if (a.completeDatetime > b.completeDatetime) {
          return -1;
        }
        return 0;
      })
      console.log('Los resultados obtenidos despues del sort son: ', this.results)
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
