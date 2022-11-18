import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDRPDailyReportingComponent } from './create-drp-daily-reporting.component';

describe('CreateDRPDailyReportingComponent', () => {
  let component: CreateDRPDailyReportingComponent;
  let fixture: ComponentFixture<CreateDRPDailyReportingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDRPDailyReportingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDRPDailyReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
