import { Injectable } from '@angular/core';
import { DATA } from './testData' 
@Injectable()
export class GetJsonService {
  // returns the json object to caller
  getJson(): Promise<any> {
    return Promise.resolve( DATA );
  }

  constructor() { }
}
