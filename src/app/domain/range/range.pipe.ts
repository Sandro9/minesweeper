import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'range',
  standalone: true
})
export class RangePipe implements PipeTransform {

  transform(value: number): any {
    return Array(value).fill(value);
  }

}