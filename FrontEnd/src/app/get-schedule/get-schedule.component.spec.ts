import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetScheduleComponent } from './get-schedule.component';

describe('GetScheduleComponent', () => {
  let component: GetScheduleComponent;
  let fixture: ComponentFixture<GetScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
