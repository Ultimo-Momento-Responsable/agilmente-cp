import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  entity: string = 'login';
  constructor(private http:HttpClient) { }

  public login(userName:string, password:string):any {
    return this.http.post(`http://${environment.ip}:8080/${this.entity}`,{userName, password},{responseType: 'text'})
  }

  public checkIfLogged(token:string):any {
    return this.http.get(`http://${environment.ip}:8080/${this.entity}/token/${token}`)
  }
}
