/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MapToGraphService } from './map-to-graph.service';

describe('Service: MapToGraph', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapToGraphService]
    });
  });

  it('should ...', inject([MapToGraphService], (service: MapToGraphService) => {
    expect(service).toBeTruthy();
  }));
});
