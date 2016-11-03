import { Component, OnInit } from '@angular/core';
import { ParserService } from '../../services/parser.service';
import { GetJsonService } from '../../services/get-json.service';
import { ApiService } from '../../services/api.service';
import { ChartTypes, AllOptions, AllData } from '../demo-page/defs'
import { RecursiveFilterService } from '../../services/recursive-filter.service';

@Component({
  selector: 'app-select-data-form',
  templateUrl: './select-data-form.component.html',
  styleUrls: ['./select-data-form.component.css'],
  providers: [ParserService, GetJsonService, ApiService]
})
export class SelectDataFormComponent implements OnInit {
  options;
  data2;
  // chartTypes = [
  //   'lineChart',
  //   'discreteBarChart',
  //   'pieChart'
  // ];
  chartTypes = ChartTypes;
  title = 'Select your data collection';

  data: any; //stores the data receive back from Jgetter  
  children: any; // stores the first level children of json data
  decisionPath: string; // stores the path of the user choice
  cleanDecisionPath: string;
  selectedChild: any // stores the object user selected
  partialDataSet: any;
  level: number; // keeps track of how deep the nested selected data is
  selections = {
    collectionReady: false,
    showGraph: false,
    graphData: null,
    dataCollection: null, // store the data collection they want to graph,
    chartType: null, // store the type of chart they want display, default to BarChart for now
    possibleLegends: [], //store the possible legends for data collection
    legendProperty: null,
    dataProperty: null,
    chartLegendValues: null,
    chartDataValues: null,
    userChoicesForLegend: ""
  }; // stores the user selection (e.g what type of graph, data set, property)

  constructor(
    private Parser: ParserService,
    private Jgetter: GetJsonService,
    private ApiGetter: ApiService) {

  }

  //this uses the testData.ts
  // getData() {
  //   this.Jgetter.getJson().then((response) => {
  //     this.data = response;
  //     this.children = this.Parser.getProperties(this.data);

  //     console.log("test data:", this.data, "properties of selection", this.children); // TODO:takeout
  //   });
  // }

  //this uses the api input
  resetSelections() {
    this.selections = {
      collectionReady: false,
      showGraph: false,
      graphData: null,
      dataCollection: null, // store the data collection they want to graph,
      chartType: null, // store the type of chart they want display, default to BarChart for now
      possibleLegends: [], //store the possible legends for data collection
      legendProperty: null,
      dataProperty: null,
      chartLegendValues: null,
      chartDataValues: null,
      userChoicesForLegend: ""
    };
  }

  getJSONData(api: string) {
    this.decisionPath = ''; //clear decisionPath before getting data again
    this.cleanDecisionPath = ''; //clear decisionPath before getting data again
    this.level = 0;

    api = api.trim();
    if (!api) { return; }
    this.ApiGetter.getAPI(api)
      .then(jsonData => {
        this.data = jsonData;
        var isArray = Array.isArray(this.data);

        //this.children = 
        var temp = this.Parser.getProperties(this.data);
        console.log("temp", temp)
        if (isArray) {
          this.children = temp.map(function (x) {
            x["isArray"] = true;
            return x;
          })
        }
        else {
          this.children = temp;
        }
        console.log("json data", this.data)
        console.log("children in api getter", this.children);
      });
  }



  updateSelectedChart(c) {
    this.selections.dataCollection = this.data;
    let dataCollection = this.selections.dataCollection;
    this.selections.chartType = c;
    this.selections.possibleLegends = this.Parser.getPossibleLegends(this.selections.dataCollection);
    console.log(this.selections);
  }

  // saveValuesForLegend(legend) {
  //   let desiredKey = legend;

  //   function helper(obj) {
  //     return { "key": obj[desiredKey], "y" : obj['value'] };
  //   }

  //   this.selections.legendProperty = legend;
  //   this.selections.chartLegendValues = RecursiveFilterService.converter(this.data, desiredKey, 1, helper);
  //   console.log("new: ",this.selections);
  // }

  // saveValuesForDataPoints(legend) {
  //   function mapper(x) { return x[desiredKey]; }
  //   let desiredKey = legend;
  //   this.selections.chartDataValues = RecursiveFilterService.converter(this.data, desiredKey, 1, mapper);
  // }

  saveValuesForLegend(legend) {
    this.selections.legendProperty = legend;
    this.selections.userChoicesForLegend = this.selections.userChoicesForLegend ? this.selections.userChoicesForLegend + "." + legend : legend;
    if (!this.showLegendProperty()) {
      this.selections.possibleLegends = this.Parser.getPossibleLegends(this.Parser.getValueFromPath(this.selections.userChoicesForLegend, this.data));
    }
  }

  saveValuesForDataPoints(propertyOfDataPoint) {
    function helper(obj) {
      return { "key": obj[desiredKey], "y": obj['value'] };
    }

    let desiredKey = this.selections.legendProperty;

    this.selections.dataProperty = propertyOfDataPoint;
    this.selections.chartDataValues = RecursiveFilterService.converter(this.data, desiredKey, 1, helper);
    console.log(this.selections);
  }

  showLegendProperty() {
    return (typeof this.selections.legendProperty !== "object");
  }







  // addPath(child, i) {
  //   if (this.decisionPath) {
  //     //this skips the selection of an object in a list
  //     if (child.type === 'list') {
  //       this.decisionPath = this.decisionPath + "." + child.name + ".0";
  //     }
  //     else {
  //       this.decisionPath = this.decisionPath + "." + child.name;

  //     }

  //     this.cleanDecisionPath = this.cleanDecisionPath + "." + child.name;
  //   } else {
  //     this.decisionPath = child.name;
  //   }
  // }

  // addNewFormPiece($event, child, i) {
  //   console.log("add new form piece was called- event, child, i", $event, child, i);

  //   this.addPath(child, i);
  //   this.selectedChild = this.Parser.getValueFromPath(this.decisionPath, this.data);
  //   var isArray =  Array.isArray(this.selectedChild);

  //   var temp = this.Parser.getProperties(this.selectedChild);
  //   if(isArray){
  //     this.children = temp.map(function(x){
  //       x["isArray"] = true;
  //       return x;
  //     })
  //   }
  //   else{
  //     this.children = temp;
  //   }

  // }

  // openChart() {
  //   console.log("open chart", this.selections.collectionReady);
  // }

  // public graphBarChart(cleanDecisionPath):void {
  //   let desiredKey = 'name';
  //   function testMap(o) {
  //     return o[desiredKey];
  //   }
  //   let test = RecursiveFilterService.converter(this.data, 'name', 1, testMap);
  //   console.log('graphBarChart called', test);
  //   // this.selectType(0)
  //   // this.selections.showGraph = true;
  //   // var temp = cleanDecisionPath.split('.')
  //   // var desiredKey = temp[temp.length-1]
  //   // var partialDataSet = RecursiveFilterService.converter(this.data, desiredKey, temp.length-1,function(x){return x[desiredKey];})
  //   // console.log("paartialDataset inside graphBarChart",partialDataSet);
  //   // this.partialDataSet = JSON.stringify(partialDataSet);
  // }

  // selectType(e){
  //   this.chartType = "pieChart";
  //   this.options = AllOptions["boxPlotChart"];//this.chartType];
  //   this.data2 = AllData["boxPlotChart"];
  //   console.log("options and data of form component at this point",this.options, this.data2)
  // }

  // selectChart(c) {
  //   this.selections.chartType = c;
  //   console.log("selection updated", this.selections.chartType);
  // }

  // showWhere() {
  //   console.log("data is ", this.data, "children", this.children);
  // }

  ngOnInit(): void {

  }

}
