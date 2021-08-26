import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-planning-card',
  templateUrl: './planning-card.component.html',
  styleUrls: ['./planning-card.component.scss'],
})
export class PlanningCardComponent implements OnInit {
  @Input() planning: any;
  constructor() { }

  ngOnInit() {}

}
