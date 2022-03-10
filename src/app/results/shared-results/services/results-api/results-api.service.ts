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
    return this.http.get(`http://${environment.ip}:8009/${this.entity}`);
  }

  /**
   * Obtiene un resultado a partir del id.
   * @param id Id del resultado.
   * @returns Observable del resultado.
   */
  getResultById(id: number, game: string): Observable<any> {
    return this.http.get(
      `http://${environment.ip}:8009/${this.entity}/${game}/${id}`
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
      `http://${environment.ip}:8009/${this.entity}/by-patient/${id}`
    );
  }
}
