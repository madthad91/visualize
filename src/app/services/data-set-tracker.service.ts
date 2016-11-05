import { Injectable } from '@angular/core';

import { ChartTypes, AllOptions, AllData } from '../components/demo-page/defs'

@Injectable()
export class DataSetTrackerService {
  public static dataTracker: DataTracker;
  public static formTracker: FormTracker; //no difference between it being here
  //or in the constructor

  constructor() {
    DataSetTrackerService.dataTracker = new DataTracker();//dataTracker;
    DataSetTrackerService.formTracker = new FormTracker();
  }

  public static getNewDataSet(chartType: string, idx: number): any {
    return DataSetTrackerService.formTracker.makeFormSet(chartType, idx);
  }

  public static isDone(chartType: string, idx: number): any {
    return DataSetTrackerService.formTracker.isDone(chartType, idx);
  }

  public static getUrl(): string {
    return this.dataTracker.url;
  }

  public static setUrl(url): void {
    console.log('the url is', url, DataSetTrackerService.dataTracker);
    DataSetTrackerService.dataTracker.url = url;
  }

  public static getChartType(): string {
    return this.dataTracker.chartType;
  }

  public static setChartType(chartType: string): void {
    this.dataTracker.chartType = chartType;
  }

  public static getAllDataSets(): any {
    var res = [];
    var dataTrackerServiceScope = this
    Object.keys(dataTrackerServiceScope.dataTracker.dataSets).forEach(function (val) {
      res.push(dataTrackerServiceScope.dataTracker.dataSets[val]);
    })
    return res;
  }

  public static getDataSetByKey(key: string): any {
    return this.dataTracker.dataSets[key];
  }

  public static setNewDataSet(key: string, data: any[]): void {
    this.dataTracker.dataSets[key] = data;
    console.log(this.dataTracker);
  }

  public static getOptionsFromGraphChoice(graphChoice: string, ...args) {
    return AllOptions[graphChoice];
  }

  public static getDataFromGraphChoice(graphChoice: string, ...args) {
    switch (graphChoice) {
      case "donutChart":
        return dataReMapper.makeDonut(args[0], args[1]);
      case "discreteBarChart":
        return dataReMapper.makeDiscreteBarChart(args[0], args[1]);
      case "pieChart":
        return dataReMapper.makePieChart(args[0], args[1]);
    }
  }

}

class FormTracker {
  private special = ['zeroth', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelvth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth'];
  private deca = ['twent', 'thirt', 'fourt', 'fift', 'sixt', 'sevent', 'eight', 'ninet'];

  private stringifyNumber(n): any {
    if (n < 20) return this.special[n];
    if (n % 10 === 0) return this.deca[Math.floor(n / 10) - 2] + 'ieth';
    return this.deca[Math.floor(n / 10) - 2] + 'y-' + this.special[n % 10];
  }

  constructor() {

  }

  private chartType: string;

  public isDone(chartType: string, idx: number): boolean {
    switch (chartType) {
      case "discreteBarChart":
      case "pieChart":
      case "donutChart":
        if (idx >= 1)
          return true
        else if (idx < 1)
          return false;
      default:
        return true;
    }

  }

  public makeFormSet(chartType: string, idx: number) {

    switch (chartType) {
      case "discreteBarChart":
      case "pieChart":
      case "donutChart":
        if (idx == 0) {
          return {
            selectYour: "labels",
            chartType: chartType
          }
        }
        else {
          return {
            selectYour: "values",
            chartType: chartType
          }
        }

      default:
        let title = this.stringifyNumber(idx);
        return {
          selectYour: title + " set of values",
          chartType: chartType
        };
    }
  }

}

class DataTracker {
  constructor() {

  }
  public url: string;
  public chartType: string;
  public dataSets: any = {};

  public addDataSet(key: string, data: any[]): void {

  }
}

class dataReMapper {
  public static makeDonut(labels: any[], values: any[]) {
    let res = [];
    labels.forEach(function (val, idx) {
      res.push({ key: labels[idx], y: values[idx] })
    });

    return res;
  }

  public static makeDiscreteBarChart(labels: any[], values: any[]) {
    var valueSet = [];
    labels.forEach(function (val, idx) {
      valueSet.push({ label: labels[idx], value: labels[idx] })
    });
    var res = [{ key: "Cumulative Return", values: valueSet }];

    return res;
  }

  public static makePieChart(labels: any[], values: any[]) {
    let res = [];
    labels.forEach(function (val, idx) {
      res.push({ key: labels[idx], y: values[idx] })
    });

    return res;
  }

}