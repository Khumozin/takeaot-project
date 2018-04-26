import { TestBed, inject } from '@angular/core/testing';

import { CreditService } from './credit.service';

describe('CreditService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreditService]
    });
  });

  it('should be created', inject([CreditService], (service: CreditService) => {
    expect(service).toBeTruthy();
  }));
});
