import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
interface ResultListView {
  id: number;
  completeDatetime: Date;
  canceled: boolean;
  mistakes: number;
  mistakesPerLevel?: number[];
  successes: number;
  successesPerLevel?: number[];
  streak: number;
  timeBetweenSuccesses?: number[];
  timePerLevel?: number[];
  totalTime: number;
  patient: string;
  game: string;
  score: number;
};
@Injectable({
  providedIn: 'root',
})
export class ResultsApiService {
  entity: string = 'result';

  constructor(private http: HttpClient) {}

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
   * @param patientId Id del paciente.
   * @returns Lista de resultados.
   */
  getResultsByPatient(patientId: number): Observable<any> {
    return this.http.get(
      `http://${environment.ip}:8080/${this.entity}/by-patient/${patientId}`
    );
  }

  /**
   * Obtiene una lista de resultados a partir del id
   * de una planning.
   * @param planningId Id de la planning.
   * @returns Lista de resultados.
   */
  getResultsFromPlanning(planningId: number): Observable<ResultListView[]> {
    return this.http.get<ResultListView[]>(
      `http://${environment.ip}:8080/${this.entity}/planning/${planningId}`
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
      `http://${environment.ip}:8080/${this.entity}/by-game-session/${gameSession}/${id}`
    );
  }
}
