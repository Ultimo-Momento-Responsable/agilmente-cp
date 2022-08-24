import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'elipsis'
})
export class ElipsisPipe implements PipeTransform {

  transform(value: string, limit: number = 100, endWith: string = '...'): string {
    if (value.length > limit)
      return value.substring(0, limit) + endWith;
    else 
      return value;
  }

}
