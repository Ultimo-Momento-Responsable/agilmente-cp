import { Pipe, PipeTransform } from '@angular/core';
import { RESULTS_COLUMNS } from '../../constants/result-columns.const';

@Pipe({
  name: 'resultTranslate'
})
export class ResultTranslatePipe implements PipeTransform {
  /**
   * Pipe que transforma el nombre de una propiedad de resultado
   * (ej: mistakes) en su contraparte en español (ej: Errores).
   * @param value String con el nombre de la propiedad.
   * @returns Cadena con el nombre en español.
   */
  transform(value: string): string {
    return RESULTS_COLUMNS[value] ? RESULTS_COLUMNS[value] : value;
  }
}
