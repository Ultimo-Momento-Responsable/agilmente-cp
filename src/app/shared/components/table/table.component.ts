import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
  @Output() clickedRowEvent = new EventEmitter<any>();
  page: any[];
  currentPage = 1;
  isFirstPage = true;
  isLastPage = false;
  constructor() {}

  ngOnInit() {
    if (this.showIndex) {
      this.columns.unshift(this.indexColumn);
      this.data.map((row, i) => {row[this.indexColumn] = i+1; row});
    }

    if (this.paginated) {
      this.isLastPage = this.numberOfRows >= this.data.length;
      this.getPage();
    } else {
      this.page = this.data;
    }
  }

  /**
   * Actualiza el DOM para que la página coincida con currentPage.
   */
  getPage() {
    const start = (this.currentPage - 1) * this.numberOfRows;
    const end = start + this.numberOfRows;
    this.page = this.data.slice(start, end);
  }

  /**
   * Va a la página siguiente.
   */
  goToNextPage() {
    this.currentPage ++;
    this.isFirstPage = false;
    this.isLastPage = !(this.currentPage < (this.data.length / this.numberOfRows));
    this.getPage();
  }

  /**
   * Va a la página anterior.
   */
  goToPreviousPage() {
    this.currentPage --;
    this.isFirstPage = this.currentPage === 1 ? true : false;
    this.isLastPage = false;
    this.getPage()
  }

  /**
   * Emite un evento con los datos de la fila.
   */
  clickedRow(row: any) {
    this.clickedRowEvent.emit(row);
  }
}
