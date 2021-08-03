import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
  getGames(): any[] {
    let games = [{
      name: "Encuentra el Repetido",
      params: [
        { 
          mode: [
            {
              name: "Cantidad de figuras",
              value: null,
              isActive: false
            },
            {
              name: "Tiempo máximo",
              value: null,
              isActive: false
            }
          ]
        }
      ]
    }]
    return games//this.http.get(`http://localhost:8080/${this.entity}`);
  }

  /**
  * Obtiene un juego a partir del id.
  * @param id Id del juego.
  * @returns Observable del juego.
  */
   getGameById(id: number): Observable<any> {
    return //this.http.get(`http://localhost:8080/${this.entity}/${id}`);
  }
}
