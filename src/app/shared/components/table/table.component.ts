import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() data: any[];
  @Input() columns: string[];
  @Input() showIndex = true;
  @Input() indexColumn = 'Nro. partida';
  @Input() paginated = false;
  @Input() numberOfRows = 5;
  page: any[];
  currentPage = 1;
  constructor() {}

  ngOnInit() {
    if (this.showIndex) {
      this.columns.unshift(this.indexColumn);
      this.data.map((row, i) => {row[this.indexColumn] = i+1; row});
    }
    if (this.paginated) {
      this.getPage();
    } else {
      this.page = this.data;
    }
  }

  getPage() {
    const start = (this.currentPage - 1) * this.numberOfRows;
    const end = start + this.numberOfRows;
    this.page = this.data.slice(start, end);
  }

  goToNextPage() {
    this.currentPage ++;
    this.getPage();
  }

  goToPreviousPage() {
    this.currentPage --;
    this.getPage()
  }
}
