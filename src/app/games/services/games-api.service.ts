import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CognitiveDomain } from 'src/app/cognitive-domain/service/cognitive-domain-api.service';
import { HttpHeadersService } from 'src/app/shared/services/http-header.service';
import { environment } from 'src/environments/environment';
export interface Game {
  id: number;
  name: string;
  description: string;
  paramDescription: string;
  cognitiveDomain: CognitiveDomain[];
  gameParam: GameParam[];
  params: Param[];
};

interface GameParam {
  id: number;
  maxValue?: number;
  minValue?: number;
  paramType2Content: [{
    id: number;
    name: string;
  }];
  param: Param;
};

interface Param {
  id: number;
  name: string;
  className: string;
  type: number;
  unit?: string;
  contextualHelp: string;
};

@Injectable({
  providedIn: 'root'
})
export class GamesApiService {
  entity: string = 'game';
  constructor(private http: HttpClient, private httpHeadersService: HttpHeadersService) { }

  /**
  * Obtiene todos los juegos cargados.
  * @return una lista de juegos.
  */
  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`http://${environment.ip}:8080/${this.entity}`, { headers: this.httpHeadersService.getHeaders() });
  }

  /**
  * Obtiene un juego a partir del id.
  * @param id Id del juego.
  * @returns Observable del juego.
  */
  getGameById(id: number): Observable<Game> {
    return this.http.get<Game>(`http://${environment.ip}:8080/${this.entity}/${id}`, { headers: this.httpHeadersService.getHeaders() });
  }
  
  /**
   * Obtiene los juegos filtrados por dominios cognitivos
   * @param cognitiveDomains lista de dominios cognitivos
   * @returns Juegos que poseen alguno de los dominios cognitivos seleccionados.
   */
  getGamesFilteredByCD(cognitiveDomains: string[]): Observable<Game[]> {
    const params = new HttpParams().set('cognitiveDomains', cognitiveDomains.join(','));
    return this.http.get<Game[]>(`http://${environment.ip}:8080/${this.entity}`, { headers: this.httpHeadersService.getHeaders(), params });
  }
}
