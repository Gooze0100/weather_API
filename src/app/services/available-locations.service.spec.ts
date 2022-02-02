import { TestBed } from '@angular/core/testing';

import { AvailableLocationsService } from './available-locations.service';

describe('AvailableLocationsService', () => {
  let service: AvailableLocationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvailableLocationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
