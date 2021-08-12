import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientsApiService {
  entity: string = 'patient';

  constructor(private http: HttpClient) { }

  /**
  * Obtiene todos los Pacientes cargados.
  * @return Una página de pacientes.
  */
   getPatients(page: number): Observable<any> {
    return this.http.get(`http://${environment.ip}:8080/${this.entity}?page=${page}`);
  }

  /**
  * Obtiene todos los Pacientes cargados.
  * @return Una página de pacientes.
  */
   getPatientsListed(): Observable<any> {
    return this.http.get(`http://${environment.ip}:8080/${this.entity}/listed`);
  }

  /**
  * Obtiene un paciente a partir del id.
  * @param id Id del paciente.
  * @returns Observable del paciente.
  */
  getPatientById(id: number): Observable<any> {
    return this.http.get(`http://${environment.ip}:8080/${this.entity}/${id}`);
  }

  /**
   * Guarda un paciente.
   * @param patient Paciente a guardar
   * @returns El paciente guardado
   */
  postPatient(patient: any): Observable<any> {
    return this.http.post(`http://${environment.ip}:8080/${this.entity}`, patient);
  }
  
  /**
   * Modifica un paciente
   * @param patient Paciente a modificar
   * @param id El id del paciente
   * @returns El paciente modificado
   */
  putPatient(patient: any, id: number): Observable<any> {
    return this.http.put(`http://${environment.ip}:8080/${this.entity}/${id}`, patient);
  }

  /**
   * Elimina un paciente
   * @param id El id del paciente
   * @returns Respuesta http.
   */
  deletePatient(id: number): Observable<any> {
    return this.http.delete(`http://${environment.ip}:8080/${this.entity}/${id}`);
  }
}
