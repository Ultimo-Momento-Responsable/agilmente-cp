import { Pipe, PipeTransform } from '@angular/core';
import { RESULTS_COLUMNS } from '../../constants/result-columns.const';

@Pipe({
  name: 'resultTranslate'
})
export class ResultTranslatePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    return RESULTS_COLUMNS[value] ? RESULTS_COLUMNS[value] : value;
  }
}
