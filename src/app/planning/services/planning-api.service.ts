import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpHeadersService } from 'src/app/shared/services/http-header.service';

export interface PlanningOverview {
  planningId: number;
  planningName: string;
  patientName: string;
  professionalName: string;
  stateName: string;
  startDate: string;
  dueDate: string;
}

export interface PlanningState {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class PlanningApiService {
  entity: string = 'planning';
  constructor(private http: HttpClient, private httpHeadersService: HttpHeadersService) {}

  /**
   * Obtiene todas las planificaciones con los estados provistos y con el filtro de búsqueda.
   * @param search texto de búsqueda.
   * @param states estados seleccionados para filtrar.
   * @param patientId id del paciente para filtrar las plannings.
   * @returns Una pagina de planificaciones.
   */
  getPlanningsOverviewFiltered(search: string, states: string[], patientId: number = null): Observable<PlanningOverview[]> {
    let params = new HttpParams();

    if (search.length > 0) 
      params = params.set('search', search);

    if (states.length > 0) 
      params = params.set('states', states.join(','));

    if (patientId !== null && patientId !== undefined)
      params = params.set('patientId', patientId);

    return this.http.get<PlanningOverview[]>(
      `http://${environment.ip}:8080/${this.entity}/overview`, { params: params, headers: this.httpHeadersService.getHeaders() }
    );
  }

  /**
   * Guarda una planificación.
   * @param planning Planificación a guardar
   * @returns La planificación guardada
   */
  postPlanning(planning: any): Observable<any> {
    return this.http.post(
      `http://${environment.ip}:8080/${this.entity}`, planning, { headers: this.httpHeadersService.getHeaders() }
    );
  }

  /**
   * Edita una planificación.
   * @param planning Planificación a editar
   * @returns La planificación guardada
   */
  editPlanning(planning: any, id: number): Observable<any> {
    return this.http.put(
      `http://${environment.ip}:8080/${this.entity}/edit/${id}`, planning, { headers: this.httpHeadersService.getHeaders() }
    );
  }

  /**
   * Busca un detalle de planificación
   * @param id ID de la planificación que se buscaba
   * @returns Un objeto PlanningData
   */
  getPlanningById(id: number): Observable<any> {
    return this.http.get(`http://${environment.ip}:8080/${this.entity}/${id}`, { headers: this.httpHeadersService.getHeaders() });
  }

  /**
   * Busca los estados de las plannings
   * @returns lista de PlanningState
   */
  getPlanningStates(): Observable<PlanningState[]> {
    return this.http.get<PlanningState[]>(
      `http://${environment.ip}:8080/${this.entity}/states`, { headers: this.httpHeadersService.getHeaders() }
    );
  }

  /**
   * Cancela una planificación
   * @param id ID de la planificación que se quiere cancelar
   * @returns La planificación cancelada
   */
  cancelPlanningById(id: number, edited: boolean = false): Observable<any> {
    return this.http.put(
      `http://${environment.ip}:8080/${this.entity}/cancel_planning/${id}`, edited, { headers: this.httpHeadersService.getHeaders() }
    );
  }

  /**
   Obtiene una lista de MGPs de las plannings pertenecientes a un paciente
	 * @param patientId Id del paciente
	 * @return Lista de MGPs
   */
  getPlanningMGPsByPatient(patientId: number): Observable<any> {
    return this.http.get<PlanningState[]>(
      `http://${environment.ip}:8080/${this.entity}/mgps/${patientId}`, { headers: this.httpHeadersService.getHeaders() }
    );
  }
}
