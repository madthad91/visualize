import { Component, OnInit } from '@angular/core';

import { Plot }			from '../../services/plot'
import { PlotsService } from '../../services/plots.service'


@Component({
  selector: 'app-home',
  providers: [PlotsService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	plots: Plot[];
	
	constructor(private plotsService: PlotsService) { }

	getPlots(): void {
		this.plotsService.getPlots().then(plots => this.plots = plots);
	}

	ngOnInit() {
		this.getPlots();
	}
}
