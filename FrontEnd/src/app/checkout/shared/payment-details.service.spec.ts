import { TestBed, inject } from '@angular/core/testing';

import { PaymentDetailsService } from './payment-details.service';

describe('PaymentDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaymentDetailsService]
    });
  });

  it('should be created', inject([PaymentDetailsService], (service: PaymentDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
