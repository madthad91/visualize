import { Component } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

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

  constructor(public af: AngularFire){
    /*this.af.auth.login({
      provider: AuthProviders.Anonymous
    });*/

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
