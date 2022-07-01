import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
})
export class CustomDatePipe implements PipeTransform {
  /**
   * Parsea una fecha de una cadena y la formatea usando
   * la DatePipe de Angular.
   * @param value Cadena con fecha y hora (dd-MM-yyyy HH:mm:ss).
   * @param args Formato.
   * @returns La fecha formateada.
   */
  transform(value: string, ...args: string[]): string {
    const datePipe = new DatePipe('en-EN');
    const date = this.parseDate(value);
    return datePipe.transform(date, ...args);
  }

  /**
   * Se encarga de convertir la cadena que viene del back a
   * un Date válido.
   * @param date Cadena con fecha y hora (dd-MM-yyyy HH:mm:ss).
   * @returns Date con fecha y hora.
   */
  parseDate(date: string): Date {
    const split = date.split(/[\s:-]+/);
    
    const day = parseInt(split[0]);
    const month = parseInt(split[1])-1;
    const year = parseInt(split[2]);
    const hour = parseInt(split[3] ? split[3] : "0");
    const minutes = parseInt(split[4] ? split[4] : "0");
    const seconds = parseInt(split[5] ? split[5] : "0");

    return new Date(year, month, day, hour, minutes, seconds);
  }
}
