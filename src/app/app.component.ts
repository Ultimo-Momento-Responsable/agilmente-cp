import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Mis Pacientes', url: '/patients', icon: 'body' },
    { title: 'Resultados', url: '/results', icon: 'clipboard' },
    { title: 'Planes de Juegos', url: '/', icon: 'phone-portrait' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
