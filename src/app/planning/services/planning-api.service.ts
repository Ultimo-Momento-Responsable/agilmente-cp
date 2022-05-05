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
   * Obtiene todas las planificaciones vigentes sin juegos.
   * @returns Una pagina de planificaciones sin juegos.
   */
   getPlanningsOverview(): Observable<any> {
    return this.http.get(`http://${environment.ip}:8080/${this.entity}/planningOverview`);
  }

  /**
   * Obtiene todas las planificaciones con los estados provistos y con el filtro de búsqueda.
   * @returns Una pagina de planificaciones.
   */
   getPlanningsOverviewFiltered(search: string, states: string [], patientId: number = null): Observable<any> {
    const json = {
      search: search,
      states: states,
      patientId: patientId
    }
    return this.http.post(`http://${environment.ip}:8080/${this.entity}/filter`,json);
  }

  /**
   * Guarda una planificación.
   * @param planning Paciente a guardar
   * @returns La planificación guardada
   */
  postPlanning(planning: any): Observable<any> {
    return this.http.post(`http://${environment.ip}:8080/${this.entity}`, planning);
  }

  /**
   * Busca un detalle de planificación
   * @param id ID de la planificación que se buscaba
   * @returns Un objeto PlanningData
   */
  getPlanningById(id : number): Observable<any> {
    return this.http.get(`http://${environment.ip}:8080/${this.entity}/${id}`);
  }

  /**
   * Busca los estados de las plannings
   * @returns lista de PlanningState
   */
  getPlanningStates(): Observable<any> {
    return this.http.get(`http://${environment.ip}:8080/${this.entity}/states`);
  }

  /**
   * Cancela una planificación
   * @param id ID de la planificación que se quiere cancelar
   * @returns La planificación cancelada
   */
  cancelPlanningById(id : number): Observable<any> {
    return this.http.put(`http://${environment.ip}:8080/${this.entity}/cancel_planning/${id}`, '');
  }
}