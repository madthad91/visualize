import { Injectable } from '@angular/core';

@Injectable()
export class RecursiveFilterService {

  constructor() { }

  private static recursiveFilter(object, key, depthStart, depthEnd, target, func): void {
    //alert("depthStart: " + depthStart);
    //alert(JSON.stringify(object));
    if (depthStart < depthEnd) {
      if (typeof object !== "string" && object.length && object.length > 0) {
        for (var i = 0; i < object.length; i++) {
          this.recursiveFilter(object[i], key, depthStart + 1, depthEnd, target, func);
        }
      }
      else if (typeof object === "object") {
        for (var i = 0; i < Object.keys(object).length; i++) {
          this.recursiveFilter(object[Object.keys(object)[i]], key, depthStart, depthEnd, target, func);
        }
      }
    }
    if (object.hasOwnProperty(key) && depthStart === depthEnd) {
      object = func(object);
      if (object) {
        target.push(object);
      }
    }

  }

  public static converter(object, key, depth, func): any[] {
    var target = [];
    this.recursiveFilter(object, key, 0, depth, target, func);
    return target;
  }

}
