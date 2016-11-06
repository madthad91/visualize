/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DataSetTrackerService } from './data-set-tracker.service';

describe('Service: DataSetTracker', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataSetTrackerService]
    });
  });

  it('should ...', inject([DataSetTrackerService], (service: DataSetTrackerService) => {
    expect(service).toBeTruthy();
  }));
});
