import { TestBed, inject } from '@angular/core/testing';

import { CartDetailsService } from './cart-details.service';

describe('CartDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartDetailsService]
    });
  });

  it('should be created', inject([CartDetailsService], (service: CartDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
