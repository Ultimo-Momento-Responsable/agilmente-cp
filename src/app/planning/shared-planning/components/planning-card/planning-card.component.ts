import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-planning-card',
  templateUrl: './planning-card.component.html',
  styleUrls: ['./planning-card.component.scss'],
})
export class PlanningCardComponent implements OnInit {
  @Input() planning: any;
  constructor() { }

  icon: string;
  color: string;

  ngOnInit() {
    if (this.planning.stateName === 'Vigente'){
      this.icon = "play-circle";
      this.color = "primary";
    } else if (this.planning.stateName === 'Pendiente') {
      this.icon = "time";
      this.color = "warning";
    } else if (this.planning.stateName === 'Terminada') {
      this.icon = "checkmark-circle";
      this.color = "success";
    } else if (this.planning.stateName === 'Cancelada') {
      this.icon = "close-circle";
      this.color = "danger";
    } 
  }

}