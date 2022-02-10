import { HttpClient, HttpParams } from '@angular/common/http';
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
  * Obtiene todos los Pacientes cargados que se encuentren habilitados.
  * @return Una página de pacientes.
  */
   getActivePatientsListed(): Observable<any> {
    return this.http.get(`http://${environment.ip}:8080/${this.entity}/listed`);
  }

  /**
  * Obtiene todos los Pacientes cargados, independientemente de si se encuentran habilitados.
  * @return Una página de pacientes.
  */
   getPatientsListed(): Observable<any> {
    return this.http.get(`http://${environment.ip}:8080/${this.entity}/listedAll`);
  }

  /**
   * Obtiene todos los pacientes cargados que coincidan con el campo de busqueda.
   * @param fullName Nombre completo del paciente, ignorando casing.
   * @returns Una página de pacientes.
   */
  getFilteredPatients(fullName: string = "", all: boolean = false): Observable<any> {
    const params = new HttpParams()
      .set('fullName', fullName)
      .set('all', all);
    
    return this.http.get(`http://${environment.ip}:8080/${this.entity}/`, { params });
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
   * Deshabilita un paciente, cambiando su estado a "Deshabilitado".
   * @param patient Paciente a eliminar
   * @param id El id del paciente
   * @returns El paciente con su estado en "Deshabilitado"
   */
  deletePatient(id: number): Observable<any> {
    return this.http.put(`http://${environment.ip}:8080/${this.entity}/deletePatient/${id}`, {})
  }

  /**
   * Agrega un comentario al comment box
   * @param comment Comentario
   * @returns true o false
   */
   addComment(comment:any): Observable<any> {
    return this.http.post(`http://${environment.ip}:8080/${this.entity}/comment`, comment);
  }

  /**
   * Edita un comentario del comment box
   * @param comment Comentario
   * @returns true o false
   */
  editComment(comment:any): Observable<any> {
    return this.http.post(`http://${environment.ip}:8080/${this.entity}/editComment`, comment);
  }

  /**
   * Elimina un comentario del comment box
   * @param comment Comentario
   * @returns true o false
   */
  deleteComment(patientComment:any): Observable<any> {
    return this.http.post(`http://${environment.ip}:8080/${this.entity}/deleteComment`, patientComment);
  }

}
