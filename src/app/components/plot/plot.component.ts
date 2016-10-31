import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})
export class PlotComponent implements OnInit {

  selected = '';
  jsonData: any = [];

  items = [
    {text: 'Line Graph'},
    {text: 'Bar Graph'},
    {text: 'Histogram'},
    {text: 'Pie Chart'}
  ];

  constructor(
  	private apiService: ApiService,
    private router: Router ) { }

  ngOnInit() {
  }

  get(api: string): void {
    api = api.trim();
    if (!api) { return; }
    this.apiService
    	.getAPI(api)
    	.then(jsonData => this.jsonData = JSON.stringify(jsonData));
  }

  select(text: string) { this.selected = text; }
}


