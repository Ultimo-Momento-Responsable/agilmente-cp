import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
    return this.http.get(`http://localhost:8080/${this.entity}?page=${page}`);
  }

  /**
  * Obtiene un paciente a partir del id.
  * @param id Id del paciente.
  * @returns Observable del paciente.
  */
  getPatientById(id: number): Observable<any> {
    return this.http.get(`http://localhost:8080/${this.entity}/${id}`);
  }

  /**
   * Guarda un paciente.
   * @param patient Paciente a guardar
   * @returns El paciente guardado
   */
  postPatient(patient: any) {
    return this.http.post(`http://localhost:8080/${this.entity}`, patient);
  }
  
  /**
   * 
   * @param patient 
   * @param id 
   * @returns 
   */
  putPatient(patient: any,id: any) {
    return this.http.put(`http://localhost:8080/${this.entity}/${id}`, patient);
  }

  deletePatient(id:any) {
    return this.http.delete(`http://localhost:8080/${this.entity}/${id}`);
  }
}
