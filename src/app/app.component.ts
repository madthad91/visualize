import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  tabs:any[];
  apptitle:string = "Visual";
  isOpen:boolean = false;
  availableModes:string[] = ['md-fling', 'md-scale']
  selectedMode:string = 'md-scale';
  availableDirections:string[] = ['up', 'down', 'left', 'right'];
  selectedDirection:string = 'down';
  selected: string = '';

  constructor(){
    this.tabs=[{
      name: "Main",
      url:"/",
      icon:"home"
    }, {
      name:"Plot",
      url:"plot",
      icon: "insert_chart"
    }, {
      name: "View",
      url:"view",
      icon:"search"
    }, {
      name: "Demo",
      url:"demo",
      icon:"dont matter"
    }]
  }
}
