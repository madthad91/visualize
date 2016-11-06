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
    'donutChart',
    'discreteBarChart',
    'pieChart',
    'lineChart',
    'multiBarHorizontalChart'
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

  constructor(
    private Parser: ParserService,
    private Jgetter: GetJsonService,
    private ApiGetter: ApiService,
    private DataSetTracker: DataSetTrackerService) {

  }

  //this uses the api input
  resetSelections() {
    this.selections = [];
    DataSetTrackerService.resetDataSetTrackerService();
  }

  getJSONData(api: string) {
    this.decisionPath = ''; //clear decisionPath before getting data again
    this.cleanDecisionPath = ''; //clear decisionPath before getting data again
    this.level = 0;

    api = api.trim();
    if (!api) { return; }

    if (api.indexOf("localhost") > -1) {
      DataSetTrackerService.setUrl(api);
      this.ApiGetter.getLocalAPI(api)
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
    else {
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
    temp.inputType = temp2.inputType;
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

  saveValuesForLegend(legend, idx: number, selectionType) {
    if (selectionType == "dropdown") {
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
        //this.selections[idx].decisionPath = this.selections[idx].decisionPath.replace(/0./g, '');
        var temp_decisionPath = this.selections[idx].decisionPath.replace(/0./g, '');
        console.log('the temp decisionPath is ', temp_decisionPath);
        temp_depth = temp_depth + (temp_decisionPath.split('.').length - 1)
        this.selections[idx].graphData = RecursiveFilterService.converter(this.originalDataSet,
          legend["name"],
          temp_depth,
          function (x) { return x[legend["name"]]; });

        DataSetTrackerService.setNewDataSet(this.selections[idx].selectYour, this.selections[idx].graphData);
        this.decideIfDone(idx);
      }



    }
    else if (selectionType == "text") {
      DataSetTrackerService.setNewDataSet(this.selections[idx].selectYour, legend.value);
      this.decideIfDone(idx);
    }
    console.log('datasettracker', DataSetTrackerService.dataTracker);
  }


  public decideIfDone(idx: number) {
    let decision = DataSetTrackerService.isDone(this.selections[idx].chartType, idx)
    if (decision["type"] == "single" && decision["decision"] == true) {
      console.log(DataSetTrackerService.getAllDataSets(), DataSetTrackerService.dataTracker, DataSetTrackerService.formTracker);
      alert("You're done");

      //this.showGraph - ng-if for showing the graph template code.
      this.showGraph = true;
      this.options = DataSetTrackerService.getOptionsFromGraphChoice(DataSetTrackerService.getChartType());
      let arrs = DataSetTrackerService.getAllDataSets();
      this.data2 = DataSetTrackerService.getDataFromGraphChoice(DataSetTrackerService.getChartType(), arrs);
    }
    else {
          if(decision["type"] == "complex" && decision["decision"]){
            //ask if thye wanna keep going 
            //if they say yes, then run below code
            //if they say no, then make graph using code above
            if(window.confirm('Are you done picking datasets?')){
              console.log(DataSetTrackerService.getAllDataSets(), DataSetTrackerService.dataTracker, DataSetTrackerService.formTracker);
              alert("You're done");

              //this.showGraph - ng-if for showing the graph template code.
              this.showGraph = true;
              this.options = DataSetTrackerService.getOptionsFromGraphChoice(DataSetTrackerService.getChartType());
              let arrs = DataSetTrackerService.getAllDataSets();
              this.data2 = DataSetTrackerService.getDataFromGraphChoice(DataSetTrackerService.getChartType(), arrs);
              console.log("arguments from form",arrs);
            }
            else{
              this.makeNewSelection(idx);
            }
          }
          else{
            this.makeNewSelection(idx);
          }
        }
      }
      

  public makeNewSelection(idx: number) {
    let temp = new Selection();
    let temp2 = DataSetTrackerService.formTracker.makeFormSet(this.selections[idx].chartType, idx + 1);

    temp.selectYour = temp2.selectYour;
    temp.inputType = temp2.inputType;
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
  inputType = "";
}