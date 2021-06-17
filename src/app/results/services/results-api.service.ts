import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResultsApiService {
  entity: string = 'hay-uno-repetido';

  constructor(private http: HttpClient) {}

  getResults(): Observable<any>{
    return this.http.get(`http://localhost:8080/${this.entity}`);
  }

  getResultById(id: number): Observable<any>{
    return this.http.get(`http://localhost:8080/${this.entity}/${id}`);
  }
}
