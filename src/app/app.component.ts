import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Mis Pacientes', url: '/patients', icon: 'body' },
    { title: 'Resultados', url: '/results', icon: 'clipboard'},
    { title: 'Planes de Juegos', url: '/planning/new-planning', icon: 'phone-portrait' },
    { title: 'Cerrar Sesión', url: '/logout', icon: 'log-out' }
  ];
  
  constructor() {}
}
