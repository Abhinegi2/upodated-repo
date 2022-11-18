import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVTDailyReportingComponent } from './create-vt-daily-reporting.component';

describe('CreateVTDailyReportingComponent', () => {
  let component: CreateVTDailyReportingComponent;
  let fixture: ComponentFixture<CreateVTDailyReportingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVTDailyReportingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVTDailyReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
