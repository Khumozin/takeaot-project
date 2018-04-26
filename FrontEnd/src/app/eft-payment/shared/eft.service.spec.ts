import { TestBed, inject } from '@angular/core/testing';

import { EftService } from './eft.service';

describe('EftService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EftService]
    });
  });

  it('should be created', inject([EftService], (service: EftService) => {
    expect(service).toBeTruthy();
  }));
});
