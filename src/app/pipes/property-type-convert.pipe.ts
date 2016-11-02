import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'propertyTypeConvert'
})
export class PropertyTypeConvertPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value == "number") {
      return "N";
    } else if (value == "string") {
      return "S";
    } else if (value == "object") {
      return "Oo";
    } else if (value == "boolean") {
      return "B";
    } else if (value == "list") {
      return "L";
    }
    return null;
  }

}
