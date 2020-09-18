import { TestBed } from '@angular/core/testing';

import { RecommendedService } from './recommended.service';

describe('RecommendedService', () => {
  let service: RecommendedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecommendedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
