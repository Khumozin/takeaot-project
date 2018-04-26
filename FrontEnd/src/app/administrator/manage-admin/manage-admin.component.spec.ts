import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAdminComponent } from './manage-admin.component';

describe('ManageAdminComponent', () => {
  let component: ManageAdminComponent;
  let fixture: ComponentFixture<ManageAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
