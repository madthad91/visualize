import { Component, OnInit } from '@angular/core';
import { ParserService } from '../../services/parser.service';
import { GetJsonService } from '../../services/get-json.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-select-data-form',
  templateUrl: './select-data-form.component.html',
  styleUrls: ['./select-data-form.component.css'],
  providers: [ParserService, GetJsonService, ApiService]
})
export class SelectDataFormComponent implements OnInit {
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
        this.children = this.Parser.getProperties(this.data);
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
    this.children = this.Parser.getProperties(this.selectedChild);
  }

  openChart() {
    console.log("open chart", this.selections.collectionReady);
  }

  graphBarChart(decisionPath) {
    this.selections.showGraph = true;
    this.selections.graphData = this.Parser.getValueFromPath( this.decisionPath, this.data );
  }

  ngOnInit(): void {
    //this.getData();
  }

}
