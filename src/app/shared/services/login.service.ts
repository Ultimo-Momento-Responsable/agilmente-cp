import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeadersService } from 'src/app/shared/services/http-header.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  entity: string = 'login';
  constructor(private http:HttpClient, private httpHeadersService: HttpHeadersService) { }

  /**
   * Comprueba con el back si el nombre de usuario y contraseña son correctos
   * @param userName Nombre de usuario
   * @param password Contraseña
   * @returns Devuelve un observable que contiene el token, el nombre y el apellido del professional
   */
  public login(userName:string, password:string): Observable<any> {
    return this.http.post(`http://${environment.ip}:8080/${this.entity}`,{userName, password},{responseType: 'text'})
  }

  /**
   * Comprueba si el token actual es el correcto.
   * @param token token guardado
   * @returns devuelve true si el token es correcto y no está vencido de otro modo devuelve false.
   */
  public checkIfLogged(token:string): any {
    return this.http.get(`http://${environment.ip}:8080/${this.entity}/token/${token}`, { headers: this.httpHeadersService.getHeaders() })
  }

  /**
   * Chequea que no sea un robot
   * @param token token reCaptcha v3
   * @returns true si es humano, false si es robot
   */
  public checkCaptcha(token: string): Observable<any> {
    return this.http.post(`http://${environment.ip}:8080/${this.entity}/loginCaptcha`, token)
  }

  /**
   * Realiza cambio de contraseña
   * @param oldPassword antigua contraseña
   * @param newPassword nueva contraseña
   * @returns true si el cambio fue efectivo, false si falló porque la antigua contraseña no coincide
   */
  public changePassword(oldPassword: string, newPassword: string): Observable<any> {
    let professionalId = localStorage.getItem('professionalId')
    let changePasswordBody = {
      professionalId: professionalId,
      oldPassword: oldPassword,
      newPassword: newPassword
    };
    return this.http.post(`http://${environment.ip}:8080/${this.entity}/changePassword`, changePasswordBody, { headers: this.httpHeadersService.getHeaders() })
  }

  public resetPassword(email: string) {
    return this.http.get(`http://${environment.ip}:8080/${this.entity}/resetPassword/${email}`)
  }
}
