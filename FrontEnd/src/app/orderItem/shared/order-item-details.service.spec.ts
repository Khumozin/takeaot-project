import { TestBed, inject } from '@angular/core/testing';

import { OrderItemDetailsService } from './order-item-details.service';

describe('OrderItemDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderItemDetailsService]
    });
  });

  it('should be created', inject([OrderItemDetailsService], (service: OrderItemDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
