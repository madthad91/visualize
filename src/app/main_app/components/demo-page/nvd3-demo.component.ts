import {Component} from '@angular/core'
import {enableProdMode} from '@angular/core'
import {nvD3} from 'ng2-nvd3'
import {ChartTypes, AllOptions, AllData} from './defs'
import {ChartSelector} from './chart-selector'

@Component({
  selector: 'main',
  template: `
  <div>
    <div>Chart type: <chart-selector (select)="selectType($event)"></chart-selector></div>
    <nvd3 [options]="options" [data]="data"></nvd3>
  </div>
  `
})
export class Main {
  options;
  data;
  chartType;

  selectType(e){
    this.chartType = e;
    this.options = AllOptions[this.chartType];
    this.data = AllData[this.chartType];
  }
}