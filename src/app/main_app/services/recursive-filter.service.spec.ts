/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RecursiveFilterService } from './recursive-filter.service';

xdescribe('Service: RecursiveFilter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecursiveFilterService]
    });
  });

  it('should ...', inject([RecursiveFilterService], (service: RecursiveFilterService) => {
    expect(service).toBeTruthy();
  }));
});
