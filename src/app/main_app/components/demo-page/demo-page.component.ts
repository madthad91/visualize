import {Component, OnInit} from '@angular/core'
import {enableProdMode} from '@angular/core'
import {ChartTypes, AllOptions, AllData} from './defs'

@Component({
  selector: 'app-demo-page',
  templateUrl: './demo-page.component.html',
  styleUrls: ['./demo-page.component.css']
})
export class DemoPageComponent implements OnInit {
options;
  data;
  chartType;

  selectType(e){
    this.chartType = e;
    this.options = AllOptions[this.chartType];
    this.data = AllData[this.chartType];
  }

  ngOnInit(){}

}
