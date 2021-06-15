import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface Result {
  id: number,
  name: string,
  patient: string,
  successes: number,
  mistakes: number,
  timeBetweenSuccesses: number[],
  date: string,
  totalTime: number,
  canceled: boolean
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

  results: Result[];
  constructor(private http: HttpClient) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.getResults().subscribe(res =>{
      this.results = res;
      this.results.forEach(r => {
        
      })
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
