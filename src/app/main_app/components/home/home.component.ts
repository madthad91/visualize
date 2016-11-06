import { Component, OnInit } from '@angular/core';

import { Plot }			from '../../services/plot'
import { PlotsService } from '../../services/plots.service'

import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';


@Component({
  selector: 'app-home',
  providers: [PlotsService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
title = 'app works!';
  tabs:any[];
  apptitle:string = "Visual";
  isOpen:boolean = false;
  availableModes:string[] = ['md-fling', 'md-scale']
  selectedMode:string = 'md-scale';
  availableDirections:string[] = ['up', 'down', 'left', 'right'];
  selectedDirection:string = 'down';
  selected: string = '';
	showNavbar = true;

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
	// plots: Plot[];
	
	// constructor(private plotsService: PlotsService) { }

	// getPlots(): void {
	// 	this.plotsService.getPlots().then(plots => this.plots = plots);
	// }

	ngOnInit() {
	//	this.getPlots();
	}
}
