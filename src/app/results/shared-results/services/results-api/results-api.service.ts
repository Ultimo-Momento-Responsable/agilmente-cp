import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResult } from 'src/app/shared/interfaces/result.interface';
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
    return this.http.get(
      `http://${environment.ip}:8080/${this.entity}/by-patient/${id}`
    );
  }

  /**
   * Obtiene una lista de resultados a partir del id
   * de una planning.
   * @param id Id de la planning.
   * @returns Lista de resultados.
   */
  getResultsFromPlanning(id: number): Observable<any> {
    return this.http.get(
      `http://${environment.ip}:8080/${this.entity}/planning/${id}`
    );
  }
  
  /**
   * Obtiene una lista de resultados a partir del id   
   * de la sesión y el juego.
   * @param id Id de la sesión.
   * @param gameSession Nombre del juego.
   * @returns Lista de resultados.
   */
  getResultsBySessionId(id: number, gameSession: string): Observable<any> {
    return this.http.get(
      `http://${environment.ip}:8080/${this.entity}/by-gane-session/${gameSession}/${id}`
    );
  }
}
