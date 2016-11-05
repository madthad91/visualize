import { Injectable } from '@angular/core';

import { ChartTypes, AllOptions, AllData } from '../components/demo-page/defs'
import * as _ from "lodash";

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
        Object.keys(dataTrackerServiceScope.dataTracker.dataSets).forEach(function(val) {
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

    public static getDataFromGraphChoice(...args) {
    
        console.log("args passed in", args);
        // switch (graphChoice) {
        //   case "donutChart":
        //     return dataReMapper.makeDonut(args[0], args[1]);
        //   case "discreteBarChart":
        //     return dataReMapper.makeDiscreteBarChart(args[0], args[1]);
        //   case "pieChart":
        //     return dataReMapper.makePieChart(args[0], args[1]);
        //   case "lineChart":
        //     return dataReMapper.makeLineChart(graphChoice, args[1], args[2], ...args);
        // }

        switch (args[0]) {
            case "donutChart":
                return dataReMapper.makeDonut(args[1], args[2]);
            case "discreteBarChart":
                return dataReMapper.makeDiscreteBarChart(args[1], args[2]);
            case "pieChart":
                return dataReMapper.makePieChart(args[1], args[2]);
            case "lineChart":
                return dataReMapper.makeLineChart(args[1]);
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

    public isDone(chartType: string, idx: number): any {
        switch (chartType) {
            case "discreteBarChart":
            case "pieChart":
            case "donutChart":
                if (idx >= 1)
                    return {
                        'decision': true,
                        'type': 'single'
                    }
                else if (idx < 1)
                    return {
                        'decision': false,
                        'type': 'single'
                    }
            default: {
                if (idx % 3 == 2)
                    return {
                        'decision': true,
                        'type': 'complex'
                    }
                else {
                    return {
                        'decision': false,
                        'type': 'complex'
                    }
                }
            }

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
                        chartType: chartType,
                        inputType: "dropdown"
                    }
                }
                else {
                    return {
                        selectYour: "values",
                        chartType: chartType,
                        inputType: "dropdown"
                    }
                }

            default:
                if (idx % 3 == 0) {
                    let title = this.stringifyNumber(Math.floor(idx / 3) + 1);
                    return {
                        selectYour: title + " set of labels",
                        chartType: chartType,
                        inputType: "text"
                    }
                }
                else {
                    let picky = idx % 3;
                    let title = this.stringifyNumber(idx);
                    return {
                        selectYour: title + " set of values",
                        chartType: chartType,
                        inputType: "dropdown"
                    };
                }

        }
    }

}

class DataTracker {
    constructor() {

    }
    public url: string;
    public chartType: string;
    public dataSets: any = {};

    public addDataSet(key: string, data: any): void {

    }
}

class dataReMapper {
    public static makeDonut(labels: any[], values: any[]) {
        console.log("makeDonut called with label", labels, "values", values);
        let res = [];
        labels.forEach(function(val, idx) {
            res.push({ key: labels[idx], y: values[idx] })
        });
        console.log("transformed", res);
        return res;
    }

    public static makeDiscreteBarChart(labels: any[], values: any[]) {
        // let res = [
        //     {
        //       key: "Cumulative Return",
        //       values: [
        //         {
        //           "label" : "A" ,
        //           "value" : -29.765957771107
        //         } ,
        //         {
        //           "label" : "B" ,
        //           "value" : 0
        //         } ,
        //         {
        //           "label" : "C" ,
        //           "value" : 32.807804682612
        //         } ,
        //         {
        //           "label" : "D" ,
        //           "value" : 196.45946739256
        //         } ,
        //         {
        //           "label" : "E" ,
        //           "value" : 0.19434030906893
        //         } ,
        //         {
        //           "label" : "F" ,
        //           "value" : -98.079782601442
        //         } ,
        //         {
        //           "label" : "G" ,
        //           "value" : -13.925743130903
        //         } ,
        //         {
        //           "label" : "H" ,
        //           "value" : -5.1387322875705
        //         }
        //       ]
        //     }
        //   ];
        let res = [
            {
                key: "Cumulative Return",
                values: _.zipWith(labels, values, function(l, v) {
                    return {
                        "label": l,
                        "value": v
                    };
                })
            }
        ];
        return res;
    }

    public static makePieChart(labels: any[], values: any[]) {
        console.log("makePieChart called");
        let res = [];
        labels.forEach(function(val, idx) {
            res.push({ key: labels[idx], y: values[idx] })
        });
        console.log("transformed", res);
        return res;
    }

    public static makeLineChart(...args) {
        console.log("lineChart called", args);
        args = args[0]; //store only the args needed for line chart
        console.log("new args", args);
        //Line chart data should be sent as an array of series objects.
        // return [
        //   {
        //     values: [{x:0, y:0}],      //values - represents the array of {x,y} data points
        //     key: 'Sine Wave', //key  - the name of the series.
        //     color: '#ff7f0e'  //color - optional: choose your own line color.
        //   },
        //   {
        //     values: [{x:1, y:1}],
        //     key: 'Cosine Wave',
        //     color: '#2ca02c'
        //   },
        //   {
        //     values: [{x:2, y:2}],
        //     key: 'Another sine wave',
        //     color: '#7777ff',
        //     area: true      //area - set to true if you want this line to turn into a filled area chart.
        //   }
        // ];
        

        let res = [];
        let i = 0;

        while ( i < args.length ) {
          let setForGraph = {
            values: _.zipWith(args[i+1], args[i+2], function(x, y){
              return {'x': x, 'y': y};
            }),
            key: args[i]
          };

          res.push(setForGraph)
          i = i + 3;
        }

        console.log("transformed", res);
        return res;
    }

}