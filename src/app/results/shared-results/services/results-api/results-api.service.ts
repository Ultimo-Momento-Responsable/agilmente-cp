import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
    return this.http.get(`http://${environment.ip}:8080/${this.entity}`);
  }

  /**
   * Obtiene un resultado a partir del id.
   * @param id Id del resultado.
   * @returns Observable del resultado.
   */
  getResultById(id: number, game: string): Observable<any> {
    return this.http.get(
      `http://${environment.ip}:8080/${this.entity}/${game}/${id}`
    );
  }

  /**
   * Obtiene una lista de resultados a partir del id
   * del paciente.
   * @param id Id del paciente.
   * @returns Lista de resultados.
   */
  getResultsByPatient(id: number): Observable<any> {
    return new Observable<any>((observer) => {
      observer.next({
        hayUnoRepetido: {
          endCondition: 'TotalTime',
          results: [
            {
              successes: 21,
              mistakes: 1,
              totalTime: 25,
            },
            {
              successes: 22,
              mistakes: 2,
              totalTime: 25,
            },
            {
              successes: 23,
              mistakes: 3,
              totalTime: 25,
            },
            {
              successes: 20,
              mistakes: 0,
              totalTime: 25,
            },
          ],
        },
        encuentraAlNuevo: {
          endCondition: 'FigureQuantity',
          results: [
            {
              successes: 15,
              mistakes: 3,
              totalTime: 15.3,
            },
            {
              successes: 15,
              mistakes: 3,
              totalTime: 15.7,
            },
            {
              successes: 15,
              mistakes: 6,
              totalTime: 23.2,
            },
            {
              successes: 15,
              mistakes: 5,
              totalTime: 16.1,
            },
          ],
        },
      });
    });
    return this.http.get(
      `http://${environment.ip}:8080/${this.entity}/by-patient/${id}`
    );
  }
}
