/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ParserService } from './parser.service';

describe('Service: Parser', () => {
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParserService]
    });
  });

  // getting a hold of ParserService
  beforeEach(inject([ParserService], (s: ParserService) => {
      service = s;
    }));

  it('should be available', () => {
    expect(service).toBeTruthy();
  });

  it('should have method getProperties defined', () => {
    expect(service.getProperties).toBeDefined();
  });

  describe('getProperties', () => {
    it('should return objects that represent the name and type of the first level properties', () => {
      let mockData1 = {
        property1: ''
      };
      let mockData2 = {
        property1: 23
      }
      let mockData3 = {
        property1: false
      }
      let mockData4 = {
        property1: ["a", 2]
      }
      let mockData5 = {
        property1: {
          prop1: "hey", prop2: "there"
        }
      }
      let mockData6 = {
        property1: '',
        property2: 23,
        property3: ["a", 2]
      }

      expect( service.getProperties(mockData1) ).toEqual( [ {name: 'property1', type: 'string'} ] );
      expect( service.getProperties(mockData2) ).toEqual( [ {name: 'property1', type: 'number'} ] );
      expect( service.getProperties(mockData3) ).toEqual( [ {name: 'property1', type: 'boolean'} ] );
      expect( service.getProperties(mockData4) ).toEqual( [ {name: 'property1', type: 'list'} ] );
      expect( service.getProperties(mockData5) ).toEqual( [ {name: 'property1', type: 'object' } ] )

      expect( service.getProperties(mockData6) ).toEqual( [
        {name: 'property1', type: 'string'},
        {name: 'property2', type: 'number'},
        {name: 'property3', type: 'list'}
        ] )
    });

    it('should only return first level properties', () => {
      let mockData = {
        property1: '',
        property2: {
          property3: ''
        }
      };
      expect( service.getProperties(mockData) ).toEqual( [ {name: 'property1', type: 'string'}, {name: 'property2', type: 'object'} ] );
    });

    it('should return an empty array if object is empty', () => {
      let mockData = {};
      expect( service.getProperties(mockData).length ).toEqual( 0 );
    });

    it('should return list of indexes as string if object is an array', () => {
      let mockData = ['a', 'b'];
      expect( service.getProperties(mockData) ).toEqual( [ { name: '0', type: 'string' }, {name: '1', type: 'string' }] );
    });

    it('should return an empty array if array is empty', () => {
      let mockData = [];
      expect( service.getProperties(mockData).length ).toEqual( 0 );
    });

    it('should return falsey if argument is not an object or an array', () => {
      let mockData = 'mockData';
      expect( service.getProperties(mockData) ).toBeFalsy();
    });
  });

  describe('getValues', () => {
    it('should return the values of property in object', () => {
      let mockData = {
        property1: '',
        property2: {
          property3: ''
        }
      }

      expect( service.getValues('property2', mockData) ).toEqual( {property3: ''} );
    });

    it('should return falsey if key is not a property of object',  () => {
      let mockData = {
        property1: '',
        property2: {
          property3: ''
        }
      }

      expect( service.getValues('property4', mockData) ).toBeFalsy();
    });
  });

});
