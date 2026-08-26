import { TestBed } from '@angular/core/testing';

import { Concert } from './concert';

describe('Concert', () => {
  let service: Concert;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Concert);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
