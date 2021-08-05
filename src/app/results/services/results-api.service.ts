import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ResultsApiService {
    entity: string = 'results';

    constructor(private http: HttpClient) { }

    /**
     * Obtiene todos los resultados de HayUnoRepetido.
     * @return Una página de resultados.
     */
    getResults(): Observable<any> {
        return this.http.get(`http://localhost:8080/${this.entity}`);
    }

    /**
     * Obtiene un resultado a partir del id.
     * @param id Id del resultado.
     * @returns Observable del resultado.
     */
    getResultById(id: number): Observable<any> {
        return this.http.get(`http://localhost:8080/${this.entity}/${id}`);
    }
}
