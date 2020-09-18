import { TestBed } from '@angular/core/testing';

import { SimilarService } from './similar.service';

describe('SimilarService', () => {
  let service: SimilarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimilarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
