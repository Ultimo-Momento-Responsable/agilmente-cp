import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const results = [
  {
    id: 13,
    game: 'Encuentra el Repetido',
    patient: 'Julian Marquez',
    canceled: false,
    completeDatetime: '11-08-2021 20:22:34',
    timeBetweenSuccesses: [1, 3, 4, 2, 2, 3, 4, 5, 6, 7, 2, 3],
    mistakes: 3,
    successes: 12,
    totalTime: 153.23,
  },
  {
    id: 145,
    game: 'Encuentra el Repetido',
    patient: 'Andrés Gribaudo',
    canceled: true,
    completeDatetime: '01-08-2021 20:22:34',
    timeBetweenSuccesses: [2],
    mistakes: 3,
    successes: 1,
    totalTime: 35.23,
  },
  {
    id: 45,
    game: 'Encuentra el Repetido',
    patient: 'Julian Marquez',
    canceled: false,
    completeDatetime: '01-07-2021 20:22:34',
    timeBetweenSuccesses: [1, 3, 4, 2, 2, 3, 4, 5, 6, 7, 2],
    mistakes: 5,
    successes: 11,
    totalTime: 123.432,
  },
];

@Injectable({
  providedIn: 'root',
})
export class ResultsApiService {
  entity: string = 'results';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todos los resultados de todos los juegos
   * ordenados por fecha de completitud.
   * @return Una página de resultados.
   */
  getResults(): Observable<any> {
    // return new Observable<any>((observer) => {
    //   observer.next({ content: results });
    // });
    return this.http.get(`http://localhost:8080/${this.entity}`);
  }

  /**
   * Obtiene un resultado a partir del id.
   * @param id Id del resultado.
   * @returns Observable del resultado.
   */
  getResultById(id: number, game: string): Observable<any> {
    // return new Observable<any>((observer) => {
    //     observer.next(results[0]);
    //   });
    return this.http.get(`http://localhost:8080/${this.entity}/${game}/${id}`);
  }
}
