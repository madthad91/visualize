import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isArray'
})
export class IsArrayPipe implements PipeTransform {
 special = ['zeroth','first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelvth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth'];
 deca = ['twent', 'thirt', 'fourt', 'fift', 'sixt', 'sevent', 'eight', 'ninet'];


  transform(value: any, args?: any): any {
    console.log('inside pipe', value, args)
    if(args){
      return this.stringifyNumber(parseInt(value) + 1 )
    }
    else{
      return value;
    }
     
    
  }

  public stringifyNumber(n):any {
  if (n < 20) return this.special[n];
  if (n%10 === 0) return this.deca[Math.floor(n/10)-2] + 'ieth';
  return this.deca[Math.floor(n/10)-2] + 'y-' + this.special[n%10];
}

}
