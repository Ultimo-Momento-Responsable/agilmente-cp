import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../shared/services/login.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanLoad {
  
  constructor(
    private loginService: LoginService,
    private navController: NavController
  ) { }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    /**
     * Te lleva al login si no se está logueado
     */
    return this.loginService.checkIfLogged(window.localStorage.getItem('token')).toPromise().then(isLogged =>{
      if (!isLogged) {
        this.navController.navigateForward('/login');
      }
      return isLogged;
    }).catch(err => {
      this.navController.navigateForward('/login');
    });
  }
}
