import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CognitiveDomainApiService {

  entity: string = 'cognitive-domain';
  constructor(private http: HttpClient) { }

  getCognitiveDomains(): Observable<any> {
    return this.http.get(`http://${environment.ip}:8009/${this.entity}`);
  }
}
