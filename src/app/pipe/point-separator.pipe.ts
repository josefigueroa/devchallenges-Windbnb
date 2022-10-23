import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pointSeparator'
})
export class PointSeparatorPipe implements PipeTransform {

  transform(value: number | null, ...args: unknown[]): string {
    if(value === null){
      return '';
    }    
    return `. ${value}`;
  }

}
