import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GamesApiService {
  entity: string = 'game';
  constructor(private http: HttpClient) { }

  /**
  * Obtiene todos los juegos cargados.
  * @return una lista de juegos.
  */
  getGames(): Observable<any> {
    return this.http.get(`http://${environment.ip}:8080/${this.entity}`);
  }

  /**
  * Obtiene un juego a partir del id.
  * @param id Id del juego.
  * @returns Observable del juego.
  */
  getGameById(id: number): Observable<any> {
    return this.http.get(`http://${environment.ip}:8080/${this.entity}/${id}`);
  }
  
  /**
   * Obtiene los juegos filtrados por dominios cognitivos
   * @param cognitiveDomains lista de dominios cognitivos
   * @returns Juegos que poseen alguno de los dominios cognitivos seleccionados.
   */
  getGamesFilteredByCD(cognitiveDomains: string []): Observable<any> {
    return this.http.post(`http://${environment.ip}:8080/${this.entity}/cognitiveDomains`,cognitiveDomains);
  }
}
