import {bootstrap}  from '@angular/platform-browser-dynamic';
import {Component} from '@angular/core';
import {nvD3} from '//cdn.rawgit.com/krispo/ng2-nvd3/v1.1.3/lib/ng2-nvd3.ts';
import { AllOptions } from './constants';

@Component({
  selector: 'main',
  directives: [nvD3],
  template: `
    <div>
      <nvd3 [options]="options" [data]="data"></nvd3>
    </div>
  `
})


export class Main {
  options;
  data;
  chartType;

  ngOnInit(){
  this.options = AllOptions['discreteBarChart'];
  this.data = [{"key":"Cumulative Return","values":[{"label":"Tag","value":"/tag/php"},{"label":"Tag","value":"/tag/javascript"},{"label":"Post","value":"/post/x-browser-shadow"}]}];
  }
  
  
  sinAndCos() {
    var sin = [],sin2 = [],
      cos = [];
  
    //Data is represented as an array of {x,y} pairs.
    for (var i = 0; i < 100; i++) {
      sin.push({x: i, y: Math.sin(i/10)});
      sin2.push({x: i, y: i % 10 == 5 ? null : Math.sin(i/10) *0.25 + 0.5});
      cos.push({x: i, y: .5 * Math.cos(i/10+ 2) + Math.random() / 10});
    }
  
    //Line chart data should be sent as an array of series objects.
    return [
      {
        values: sin,      //values - represents the array of {x,y} data points
        key: 'Sine Wave', //key  - the name of the series.
        color: '#ff7f0e'  //color - optional: choose your own line color.
      },
      {
        values: cos,
        key: 'Cosine Wave',
        color: '#2ca02c'
      },
      {
        values: sin2,
        key: 'Another sine wave',
        color: '#7777ff',
        area: true      //area - set to true if you want this line to turn into a filled area chart.
      }
    ];
  }
  
}

bootstrap(Main);