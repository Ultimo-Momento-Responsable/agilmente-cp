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
  getGames(): Observable<any> {
    return this.http.get(`http://localhost:8080/${this.entity}`);
    // let games = 
    // [
    //   {
    //     id: 0,
    //     name: "Encuentra el Repetido",
    //     params: [
    //       { 
    //         id: 0,
    //         name: "Cantidad de Figuras",
    //         className: "FigureQuantity",
    //         type: 0
    //       },
    //       {
    //         id: 1,
    //         name: "Tiempo Máximo",
    //         className: "MaximumTime",
    //         type: 0
    //       }
    //     ]
    //   },
    //   {
    //     id: 1,
    //     name: "Encuentra al nuevo",
    //     params: [
    //       { 
    //         id: 0,
    //         name: "Cantidad de Figuras",
    //         className: "FigureQuantity",
    //         type: 0
    //       },
    //       {
    //         id: 1,
    //         name: "Tiempo Máximo",
    //         className: "MaximumTime",
    //         type: 0
    //       }
    //     ]
    //   }
    // ]
    //return games;
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
