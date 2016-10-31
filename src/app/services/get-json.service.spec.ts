/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GetJsonService } from './get-json.service';

describe('Service: GetJson', () => {
  let service; // store getJson.service object

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetJsonService]
    });
  });

  beforeEach( inject([GetJsonService], (s: GetJsonService) => {
      service = s;
  }));

  it('should ...', () => {
    expect(service).toBeTruthy();
  });

  it('should have getJson method exposed', () => {
    expect(service.getJson).toBeDefined();
  });
});
