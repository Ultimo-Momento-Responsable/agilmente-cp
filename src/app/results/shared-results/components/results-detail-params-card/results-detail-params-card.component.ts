import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-results-detail-params-card',
  templateUrl: './results-detail-params-card.component.html',
  styleUrls: ['./results-detail-params-card.component.scss'],
})
export class ResultsDetailParamsCardComponent implements OnInit {
    @Input() param: any;
  constructor() { }

  ngOnInit() {}
}
