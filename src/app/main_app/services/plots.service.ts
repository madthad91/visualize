import { Injectable } from '@angular/core';

import { Plot } from './plot'
import { PLOTS } from './mock-plots'

@Injectable()
export class PlotsService {
	getPlots(): Promise<Plot[]> {
		return Promise.resolve(PLOTS);
	}
}