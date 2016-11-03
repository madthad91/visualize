import { Component, OnInit } from '@angular/core';

export class Plot {
	id: number;
	title: string;
	description: string;
	img_url: string;
}

const PLOTS: Plot[] = [
	{id: 1, title: "My First Plot", description: "A plot about firsts", img_url: "https://material.angularjs.org/latest/img/washedout.png"},
	{id: 2, title: "Puppy Plot", description: "This plot is potentially about puppies", img_url: "http://cdn2-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-8.jpg"}
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  plots = PLOTS;

}
