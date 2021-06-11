import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface Result {
  id: string;
  name: string;
  patient: string;
  aciertos: string;
}

export interface RootObject {
  results: Result[];
}

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})

export class ResultsPage implements OnInit {
  results: Array<any>;

  constructor(private http: HttpClient) { }

  ngOnInit() { }

  ionViewWillEnter() {
    // Guardamos los objetos obtenidos por getresults() en nuestra variable results
    this.getResults().subscribe(res =>{
      this.results = res;
    });
  }

  /**
  * getResults()
  * @returns {Observable} - Lee los datos del JSON y devuelve los objetos bajo 'results'
  */
  getResults(){
    return this.http
    .get("assets/results.json")
    .pipe(
      map((res:any) => {
        return res.results;
      })
    )
  }
}
