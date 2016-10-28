import { Component, OnInit } from '@angular/core';
import { ParserService } from '../../services/parser.service'

@Component({
  selector: 'app-sample-form',
  templateUrl: './sample-form.component.html',
  styleUrls: ['./sample-form.component.css'],
  providers: [ParserService]
})
export class SampleFormComponent implements OnInit {
  hai: string = "you";
  // values:string[] = ['Refresh', 'Settings', 'Help', 'Sign Out'];
  //values = [{ 'propertyType':'boolean', 'name': 'Refresh' }, { 'propertyType':'object', 'name': 'Settings' }, { 'propertyType':'number', 'name': 'Help' }, { 'propertyType':'string', 'name': 'Sign Out' }];
  data = {'first':{ 'propertyType':'boolean', 'name': 'Refresh' }, 'second':{ 'propertyType':'object', 'name': 'Settings' }, 'third': { 'propertyType':'number', 'name': 'Help' }, 'four': { 'propertyType':'string', 'name': 'Sign Out' }};
  decisionTree = [];
  
  constructor(private p:ParserService) { 
    let thang  = {}
    thang["data"] = this.p.getProperties(this.data);

    this.decisionTree.push(thang)//["dataSet"] = this.p.getProperties(this.data)
    console.log('initial decisionTree is ', this.decisionTree)
  }

  ngOnInit() {
  }

  public addNewFormPiece(e, val, idx):void{
    console.log('the event contains', e,'the value is', val, 'the index is', idx)
    console.log('the decisionTree is ' ,this.decisionTree)
    if(val.type == "object"){
      if(this.decisionTree.length > 1){
        this.decisionTree.splice(idx+1, this.decisionTree.length - (idx +1));
      }
        
      this.fillNextForm();
    }
    else if(val.type == "number"){
      this.askIfDone();
    }
  }

  public fillNextForm():void{
     let thang  = {}
    thang["data"] = this.p.getProperties(this.data);
    this.decisionTree.push(thang)
    console.log('the decisionTree after fill next form is ' ,this.decisionTree)

  }

  public askIfDone():void{
    if(confirm('are you done?')){
      //todo: unregister clicks
      alert('thanks');
    }
    else{
      //just close the box
      //placeholder in case we want to support graceful exiting in the future
    }

  }

}
