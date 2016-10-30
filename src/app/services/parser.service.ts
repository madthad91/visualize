import { Injectable } from '@angular/core';

// import test data

@Injectable()
export class ParserService {
  
  getProperties(obj: Object) {
    if ( Array.isArray(obj) || (typeof obj === "object") ) {
      let props = Object.keys(obj);
      let result = props.map(function(p) {
        let pType;
        if ( Array.isArray(obj[p]) ) {
          pType = 'list'
        } else {
          pType = typeof obj[p];
        }
        return {name: p, type: pType}
      });

      return result;
    }
  }

  getValues(k, obj) {
    if ( Array.isArray(obj) || (typeof obj === "object") ) {
      return obj[k];
    }
  }

  getValueFromPath(p, obj) {
    if (obj) {
      let pathArr = p.split('.');
      let value;
      pathArr.forEach((prop, i) => {
        if (i == 0) {
          value = obj[prop];
        } else {
          value = value[prop];
        }
      });
      return value;
    }
  }

  // generator code
  constructor() { }
}
