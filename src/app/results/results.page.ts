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

  ngOnInit() {
    this.getResults().subscribe(res =>{
        console.log("Res",res)
        this.results = res;
    });
  }

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
