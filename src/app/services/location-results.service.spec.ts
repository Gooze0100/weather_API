import { TestBed } from '@angular/core/testing';

import { LocationResultsService } from './location-results.service';

describe('LocationResultsService', () => {
  let service: LocationResultsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationResultsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
