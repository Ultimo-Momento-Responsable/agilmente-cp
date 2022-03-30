import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-tbs-results',
  templateUrl: './table-tbs-results.component.html',
  styleUrls: ['./table-tbs-results.component.scss'],
})
export class TableTBSResultsComponent implements OnInit {
  @Input() result: any;
  constructor() {}

  ngOnInit() {}
}
