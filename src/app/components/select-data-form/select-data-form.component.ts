import { Component, OnInit } from '@angular/core';
import { ParserService } from '../../services/parser.service';
import { GetJsonService } from '../../services/get-json.service';
import { ApiService } from '../../services/api.service';
import {ChartTypes, AllOptions, AllData} from '../demo-page/defs'
import {RecursiveFilterService} from '../../services/recursive-filter.service';

@Component({
  selector: 'app-select-data-form',
  templateUrl: './select-data-form.component.html',
  styleUrls: ['./select-data-form.component.css'],
  providers: [ParserService, GetJsonService, ApiService]
})
export class SelectDataFormComponent implements OnInit {
  options;
  data2;
  chartType;
  title = 'Select your data collection';

  data: any; //stores the data receive back from Jgetter  
  children: any; // stores the first level children of json data
  decisionPath: string; // stores the path of the user choice
  selectedChild: any // stores the object user selected

  selections = {
    collectionReady: false,
    showGraph: false,
    graphData: null
  }; // stores the user selection (e.g what type of graph, data set, property)

  constructor(
    private Parser: ParserService, 
    private Jgetter: GetJsonService,
    private ApiGetter: ApiService) {

  }

  //this uses the testData.ts
  getData() {
    this.Jgetter.getJson().then((response) => {
      this.data = response;
      this.children = this.Parser.getProperties(this.data);

      console.log("test data:", this.data, "properties of selection", this.children); // TODO:takeout
    });
  }

  //this uses the api input
  getJSONData(api: string) {
    this.decisionPath = ''; //clear decisionPath before getting data again

    api = api.trim();
    if (!api) { return; }    
    this.ApiGetter.getAPI(api)
      .then(jsonData => {
        this.data = jsonData;
        var isArray =  Array.isArray(this.data);

        //this.children = 
        var temp = this.Parser.getProperties(this.data);
        console.log(temp)
        if(isArray){
          this.children = temp.map(function(x){
            x["isArray"] = true;
            return x;
          })
        }
        else{
          this.children = temp;
        }

        console.log(this.children);
      });
  }

  addPath(child, i) {
    if (this.decisionPath) {
      this.decisionPath = this.decisionPath + "." + child.name;
    } else {
      this.decisionPath = child.name;
    }
  }

  addNewFormPiece($event, child, i) {
    console.log("add new form piece was called", $event, child, i);
    
    this.addPath(child, i);
    this.selectedChild = this.Parser.getValueFromPath(this.decisionPath, this.data);
    var isArray =  Array.isArray(this.selectedChild);

    var temp = this.Parser.getProperties(this.selectedChild);
    if(isArray){
      this.children = temp.map(function(x){
        x["isArray"] = true;
        return x;
      })
    }
    else{
      this.children = temp;
    }

  }

  openChart() {
    console.log("open chart", this.selections.collectionReady);
  }

  public graphBarChart(decisionPath):void {
    this.selectType(0)
    this.selections.showGraph = true;
    var temp = decisionPath.split('.')
    var desiredKey = temp[temp.length-1]
    var partialDataSet = RecursiveFilterService.converter(this.data, desiredKey, (temp.length-1),function(x){return x[desiredKey];})
    console.log(partialDataSet);
    //this.selections.graphData = this.Parser.getValueFromPath( this.decisionPath, this.data );
  }

  selectType(e){
    this.chartType = "pieChart";
    this.options = AllOptions["boxPlotChart"];//this.chartType];
    this.data2 = AllData["boxPlotChart"];
    console.log(this.options, this.data2)
  }

  ngOnInit(): void {
    //this.getData();
  }

}
