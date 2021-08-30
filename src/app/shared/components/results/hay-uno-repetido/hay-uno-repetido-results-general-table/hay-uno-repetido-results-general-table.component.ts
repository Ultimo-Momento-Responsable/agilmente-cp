import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hay-uno-repetido-results-general-table',
  templateUrl: './hay-uno-repetido-results-general-table.component.html',
  styleUrls: ['./hay-uno-repetido-results-general-table.component.scss'],
})
export class HayUnoRepetidoResultsGeneralTableComponent implements OnInit {
    @Input() results;
  constructor() { }

  ngOnInit() {}

}
