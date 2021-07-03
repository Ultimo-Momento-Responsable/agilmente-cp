import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../patients.page';

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
  getPatients(): Observable<any> {
    return this.http.get(`http://localhost:8080/${this.entity}`);
  }

  /**
  * Obtiene un paciente a partir del id.
  * @param id Id del paciente.
  * @returns Observable del paciente.
  */
  getPatientById(id: number): Observable<any> {
    return this.http.get(`http://localhost:8080/${this.entity}/${id}`);
  }

  postPatient(patient: any) {
    return this.http.post(`http://localhost:8080/${this.entity}`, patient);
  }
}
