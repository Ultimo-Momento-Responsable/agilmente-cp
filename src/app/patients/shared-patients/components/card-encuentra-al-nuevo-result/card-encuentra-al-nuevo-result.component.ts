import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-encuentra-al-nuevo-result',
  templateUrl: './card-encuentra-al-nuevo-result.component.html',
  styleUrls: ['./card-encuentra-al-nuevo-result.component.scss'],
})
export class CardEncuentraAlNuevoResultComponent implements OnInit {
    @Input() results; 
    
  constructor() { }

  ngOnInit() {}

}
