import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-hay-uno-repetido-result',
  templateUrl: './card-hay-uno-repetido-result.component.html',
  styleUrls: ['./card-hay-uno-repetido-result.component.scss'],
})
export class CardHayUnoRepetidoResultComponent implements OnInit {
    @Input() results;

  constructor() { }

  ngOnInit() {}

}
