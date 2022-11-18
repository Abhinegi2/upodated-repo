import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DRPDailyReportingComponent } from './drp-daily-reporting.component';

describe('DRPDailyReportingComponent', () => {
  let component: DRPDailyReportingComponent;
  let fixture: ComponentFixture<DRPDailyReportingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DRPDailyReportingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DRPDailyReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
