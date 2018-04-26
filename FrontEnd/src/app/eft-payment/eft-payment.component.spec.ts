import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EftPaymentComponent } from './eft-payment.component';

describe('EftPaymentComponent', () => {
  let component: EftPaymentComponent;
  let fixture: ComponentFixture<EftPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EftPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EftPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
