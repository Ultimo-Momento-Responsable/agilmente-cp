import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-memorilla-results',
  templateUrl: './table-memorilla-results.component.html',
  styleUrls: ['./table-memorilla-results.component.scss'],
})
export class TableMemorillaResultsComponent implements OnInit {
  @Input() result: any;
  constructor() {}

  ngOnInit() {}
}
