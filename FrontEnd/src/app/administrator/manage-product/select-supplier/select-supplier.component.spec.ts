import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSupplierComponent } from './select-supplier.component';

describe('SelectSupplierComponent', () => {
  let component: SelectSupplierComponent;
  let fixture: ComponentFixture<SelectSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
