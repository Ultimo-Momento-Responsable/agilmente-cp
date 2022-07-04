import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  description: string;
  bornDate: string;
  city: string;
  telephone?: string;
  email?: string;
  loginCode?: string;
  comments: Comment[];
  joinDate: string;
  enabled: boolean;
  logged: boolean;
  firstNameLastName: string;
}

interface Comment {
  id: number;
  datetime: string;
  comment: string;
  edited: boolean;
  author: Professional;
  isEditing?: boolean;
};

interface Professional {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  token: string;
  tokenExpiration: string;
};
@Injectable({
  providedIn: 'root',
})
export class PatientsApiService {
  entity: string = 'patient';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todos los Pacientes cargados que se encuentren habilitados.
   * @return Una lista de pacientes.
   */
  getActivePatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(
      `http://${environment.ip}:8080/${this.entity}/active`
    );
  }

  /**
   * Obtiene todos los Pacientes cargados, independientemente de si se encuentran habilitados.
   * @return Una lista de pacientes.
   */
  getAll(): Observable<Patient[]> {
    return this.http.get<Patient[]>(
      `http://${environment.ip}:8080/${this.entity}`
    );
  }

  /**
   * Obtiene todos los pacientes cargados que coincidan con el campo de busqueda.
   * @param fullName Nombre completo del paciente, ignorando casing.
   * @returns Una lista de pacientes.
   */
  getFilteredPatients(
    fullName: string = '',
    all: boolean = false
  ): Observable<Patient[]> {
    const params = new HttpParams().set('fullName', fullName).set('all', all);

    return this.http.get<Patient[]>(
      `http://${environment.ip}:8080/${this.entity}/`,
      {
        params,
      }
    );
  }

  /**
   * Obtiene un paciente a partir del id.
   * @param id Id del paciente.
   * @returns Observable del paciente.
   */
  getPatientById(id: number): Observable<Patient> {
    return this.http.get<Patient>(`http://${environment.ip}:8080/${this.entity}/${id}`);
  }

  /**
   * Guarda un paciente.
   * @param patient Paciente a guardar
   * @returns El paciente guardado
   */
  postPatient(patient: Patient): Observable<any> {
    return this.http.post(
      `http://${environment.ip}:8080/${this.entity}`,
      patient
    );
  }

  /**
   * Modifica un paciente
   * @param patient Paciente a modificar
   * @param id El id del paciente
   * @returns El paciente modificado
   */
  putPatient(patient: Patient, id: number): Observable<any> {
    return this.http.put(
      `http://${environment.ip}:8080/${this.entity}/${id}`,
      patient
    );
  }

  /**
   * Deshabilita un paciente, cambiando su estado a "Deshabilitado".
   * @param patient Paciente a eliminar
   * @param id El id del paciente
   * @returns El paciente con su estado en "Deshabilitado"
   */
  deletePatient(id: number): Observable<any> {
    return this.http.put(
      `http://${environment.ip}:8080/${this.entity}/deletePatient/${id}`,
      {}
    );
  }

  /**
   * Agrega un comentario al comment box
   * @param comment Comentario
   * @returns true o false
   */
  addComment(comment: any): Observable<any> {
    return this.http.post(
      `http://${environment.ip}:8080/${this.entity}/comment`,
      comment
    );
  }

  /**
   * Edita un comentario del comment box
   * @param comment Comentario
   * @returns true o false
   */
  editComment(comment: any): Observable<any> {
    return this.http.post(
      `http://${environment.ip}:8080/${this.entity}/editComment`,
      comment
    );
  }

  /**
   * Elimina un comentario del comment box
   * @param comment Comentario
   * @returns true o false
   */
  deleteComment(comment: any): Observable<any> {
    return this.http.post(
      `http://${environment.ip}:8080/${this.entity}/deleteComment`,
      comment
    );
  }
}
