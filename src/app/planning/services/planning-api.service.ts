import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanningApiService {
  entity: string = 'planning';
  constructor(private http: HttpClient) { }

  /**
   * Guarda una planificación.
   * @param planning Paciente a guardar
   * @returns La planificación guardada
   */
  postPlanning(planning: any): Observable<any> {
    return this.http.post(`http://${environment.ip}:8080/${this.entity}`, planning);
  }
}