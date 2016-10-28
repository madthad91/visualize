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

  // generator code
  constructor() { }
}
