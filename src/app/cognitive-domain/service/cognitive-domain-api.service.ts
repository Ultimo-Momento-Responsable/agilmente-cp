import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
export interface CognitiveDomain {
  id: number;
  name: string;
};
@Injectable({
  providedIn: 'root'
})
export class CognitiveDomainApiService {

  entity: string = 'cognitive-domain';
  constructor(private http: HttpClient) { }

  /**
   * Obtiene una lista de todos los dominios cognitivos.
   * @returns Una lista de dominios cognitivos.
   */
  getCognitiveDomains(): Observable<CognitiveDomain[]> {
    return this.http.get<CognitiveDomain[]>(`http://${environment.ip}:8080/${this.entity}`);
  }
}
