import { Component } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Mis Pacientes', url: '/patients', icon: 'body' },
    { title: 'Resultados', url: '/results', icon: 'clipboard'},
    { title: 'Planes de Juegos', url: '/planning', icon: 'phone-portrait' },
    { title: 'Cerrar Sesión', url: '/logout', icon: 'log-out' }
  ];
  currentRoute: string;
  previousRoute: string;
  firstName: string;
  lastName: string;
  
  constructor(private router : Router, location: Location) {
    router.events.subscribe(val => {
      if (this.previousRoute=="/login" && this.currentRoute=="/patients"){
        this.previousRoute = "/patients";
        window.location.reload();
      }
      if (location.path() != "") {
        this.previousRoute = this.currentRoute;
        this.currentRoute = location.path();
      }
    });
    this.firstName = window.localStorage.getItem('firstName');
    this.lastName = window.localStorage.getItem('lastName');
  }
}
