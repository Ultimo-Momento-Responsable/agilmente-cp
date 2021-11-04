import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-encuentra-al-nuevo-results-general-table',
  templateUrl: './encuentra-al-nuevo-results-general-table.component.html',
  styleUrls: ['./encuentra-al-nuevo-results-general-table.component.scss'],
})
export class EncuentraAlNuevoResultsGeneralTableComponent implements OnInit {
    @Input() results;
  constructor() { }

  ngOnInit() {}

}
