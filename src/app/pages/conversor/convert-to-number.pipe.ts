import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertToNumber',
  standalone: true
})
export class ConvertToNumberPipe implements PipeTransform {

  transform(value: any): number {
    return Number(value);
  }

}
