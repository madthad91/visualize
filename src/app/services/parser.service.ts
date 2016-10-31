import { Injectable } from '@angular/core';

import * as _ from 'lodash';

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
      var result = _.cloneDeep( obj[k] );
      return result;
    }
  }

  getValueFromPath(p, obj) {
    let objClone = _.cloneDeep(obj);

    if (obj) {
      let pathArr = p.split('.');
      let value;
      pathArr.forEach((prop, i) => {
        value = objClone[prop];
        objClone = value;
      });
      return value;
    }
  }

  // generator code
  constructor() { }
}
