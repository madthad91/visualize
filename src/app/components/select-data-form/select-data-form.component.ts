import { Component, OnInit } from '@angular/core';
import { ParserService } from '../../services/parser.service';
import { GetJsonService } from '../../services/get-json.service';
import { ApiService } from '../../services/api.service';
import { ChartTypes, AllOptions, AllData } from '../demo-page/defs'
import { RecursiveFilterService } from '../../services/recursive-filter.service';
import { DataSetTrackerService } from '../../services/data-set-tracker.service';

@Component({
  selector: 'app-select-data-form',
  templateUrl: './select-data-form.component.html',
  styleUrls: ['./select-data-form.component.css'],
  providers: [ParserService, GetJsonService, ApiService, DataSetTrackerService]
})
export class SelectDataFormComponent implements OnInit {
  options;
  data2;
  chartTypes = [
    'lineChart',
    'discreteBarChart',
    'pieChart'
  ];
  title = 'Select your data collection';

  data: any; //stores the data receive back from Jgetter  
  children: any; // stores the first level children of json data
  decisionPath: string; // stores the path of the user choice
  cleanDecisionPath: string;
  selectedChild: any // stores the object user selected
  partialDataSet: any;
  level: number; // keeps track of how deep the nested selected data is
  originalDataSet;
  selections: Selection[] = [];
  showGraph = false;
  //   collectionReady: false,
  //   showGraph: false,
  //   graphData: null,
  //   dataCollection: null, // store the data collection they want to graph,
  //   chartType: null, // store the type of chart they want display, default to BarChart for now
  //   possibleLegends: [], //store the possible legends for data collection
  //   legendProperty: null,
  //   dataProperty: null,
  //   chartLegendValues: null,
  //   chartDataValues: null,
  // }; // stores the user selection (e.g what type of graph, data set, property)

  constructor(
    private Parser: ParserService,
    private Jgetter: GetJsonService,
    private ApiGetter: ApiService,
    private DataSetTracker: DataSetTrackerService) {

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
    this.selections = [];
    // this.selections = {
    //   collectionReady: false,
    //   showGraph: false,
    //   graphData: null,
    //   dataCollection: null, // store the data collection they want to graph,
    //   chartType: null, // store the type of chart they want display, default to BarChart for now
    //   possibleLegends: [], //store the possible legends for data collection
    //   legendProperty: null,
    //   dataProperty: null,
    //   chartLegendValues: null,
    //   chartDataValues: null,
    // };
  }

  getJSONData(api: string) {
    this.decisionPath = ''; //clear decisionPath before getting data again
    this.cleanDecisionPath = ''; //clear decisionPath before getting data again
    this.level = 0;

    api = api.trim();
    if (!api) { return; }

    DataSetTrackerService.setUrl(api);
    this.ApiGetter.getAPI(api)
      .then(jsonData => {
        this.data = jsonData;
        var isArray = Array.isArray(this.data);

        let propSet = this.Parser.getProperties(this.data);
        if (propSet) {
          this.children = propSet;
        }
        else {
          alert('tada')
        }
        console.log("json data", this.data)
        console.log("children in api getter", this.children);
      });
  }



  updateSelectedChart(c) {
    // this.selections.dataCollection = this.data;
    this.originalDataSet = this.data;

    //let dataCollection = this.selections.dataCollection;
    var temp = new Selection();
    temp.dataCollection = this.data;
    temp.chartType = c;
    DataSetTrackerService.setChartType(c);
    let temp2 = DataSetTrackerService.formTracker.makeFormSet(temp.chartType, 0);
    temp.selectYour = temp2.selectYour;
    if (Array.isArray(temp.dataCollection) && temp.dataCollection.length > 0) {
      temp.decisionPath = "0";
      temp.dataCollection = temp.dataCollection[0];
    }
    let propSet = this.Parser.getProperties(temp.dataCollection);
    if (propSet) {
      temp.dropdownOptions = propSet;
    }
    else {
      alert("no properties left. handle this");
    }

    //temp.possibleLegends = this.Parser.getPossibleLegends(this.data);
    this.selections.push(temp);
    // this.selections.chartType = c;
    // this.selections.possibleLegends = 
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

  saveValuesForLegend(legend, idx) {

    //going back to the old days
    this.selections[idx].decisionPath = this.addPath(this.selections[idx].decisionPath, legend);
    let temp_child = this.Parser.getValueFromPath(this.selections[idx].decisionPath, this.originalDataSet);
    console.log('the temp child is', temp_child);
    let propSet = this.Parser.getProperties(temp_child);
    if (propSet) {
      this.selections[idx].dropdownOptions = propSet;
    }
    else {
      var temp_depth = 0;
      if (this.selections[idx].decisionPath[0] == "0") {
        temp_depth = temp_depth + 1;
      }
      this.selections[idx].decisionPath = this.selections[idx].decisionPath.replace(/0./g, '');
      console.log('new decisionPath is ', this.selections[idx].decisionPath);
      temp_depth = temp_depth + (this.selections[idx].decisionPath.split('.').length - 1)
      this.selections[idx].graphData = RecursiveFilterService.converter(this.originalDataSet,
        legend["name"],
        temp_depth,
        function (x) { return x[legend["name"]]; });

      DataSetTrackerService.setNewDataSet(this.selections[idx].selectYour, this.selections[idx].graphData);
      if (DataSetTrackerService.isDone(this.selections[idx].chartType, idx)) {
        console.log(DataSetTrackerService.getAllDataSets(), DataSetTrackerService.dataTracker, DataSetTrackerService.formTracker);
        alert("You're done");
        //ng-if for showing the graph template code.
        this.showGraph = true;
        this.options = DataSetTrackerService.getOptionsFromGraphChoice(DataSetTrackerService.getChartType());
        let arrs = DataSetTrackerService.getAllDataSets();
        this.data2 = DataSetTrackerService.getDataFromGraphChoice(DataSetTrackerService.getChartType(), arrs[0], arrs[1]);
      }
      else {
        let temp = new Selection();
        let temp2 = DataSetTrackerService.formTracker.makeFormSet(this.selections[idx].chartType, idx + 1);

        temp.selectYour = temp2.selectYour;
        temp.dataCollection = this.originalDataSet;
        temp.chartType = this.selections[idx].chartType;

        //if the beginning of the dataset is an array, assume arrays are uniform
        //and take the first index so the user doesn't have to pick an index
        if (Array.isArray(temp.dataCollection) && temp.dataCollection.length > 0) {
          temp.decisionPath = "0";
          temp.dataCollection = temp.dataCollection[0];
        }

        //get first object's keys to present to the user
        let propSet = this.Parser.getProperties(temp.dataCollection);
        if (propSet) {
          temp.dropdownOptions = propSet;
        }
        else {
          alert("no properties left. handle this");
        }
        this.selections.push(temp);
      }

    }
    //end going back
    //console.log('inside savevaluesforlegend',legend, idx )
    // let desiredKey = legend;
    // this.selections.legendProperty = legend;
    // var temp = cleanDecisionPath.split('.')
    //var desiredKey = temp[temp.length-1]
    //   // var partialDataSet = RecursiveFilterService.converter(this.data, desiredKey, temp.length-1,function(x){return x[desiredKey];})
    //the new broken stuff
    // this.selections[idx].graphData = RecursiveFilterService.converter(this.data, legend, 1, function(x){return x[legend]; });
    // DataSetTrackerService.setNewDataSet("labels", this.selections[idx].graphData);

    // var temp = new Selection();
    // temp.dataCollection = this.data;
    // temp.dropdownOptions = this.Parser.getProperties(temp.dataCollection);
    //end new stuff
  }

  // saveValuesForDataPoints(propertyOfDataPoint) {
  //   let thad = this;
  //   function helper(obj) {
  //     return { "key": obj[desiredKey], "y": obj[thad.selections.legendProperty] };
  //   }

  //   let desiredKey = this.selections.legendProperty;

  //   this.selections.dataProperty = propertyOfDataPoint;
  //   this.selections.chartDataValues = RecursiveFilterService.converter(this.data, desiredKey, 1, helper);
  //   console.log(this.selections);
  // }







  public addPath(decisionPath: string, selectedOption): string {
    console.log('the arguments of addPath are', arguments)
    if (decisionPath) {
      //this skips the selection of an object in a list
      if (selectedOption.type === 'list') {
        return decisionPath + "." + selectedOption.name + ".0";
      }
      else {
        return decisionPath + "." + selectedOption.name;

      }

      //this.cleanDecisionPath = this.cleanDecisionPath + "." + selectedOption.name;
    } else {
      return selectedOption.name;
    }

  }

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

class Selection {
  collectionReady: boolean = false;
  showGraph: boolean = false;
  graphData = null;
  dataCollection = null; // store the data collection they want to graph,
  chartType = null; // store the type of chart they want display, default to BarChart for now
  possibleLegends = []; //store the possible legends for data collection
  legendProperty = null;
  dataProperty = null;
  chartLegendValues = null;
  chartDataValues = null;
  dropdownOptions = null;
  decisionPath = "";
  selectYour = "";
}