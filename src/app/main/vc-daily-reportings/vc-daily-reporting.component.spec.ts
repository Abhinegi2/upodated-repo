import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VCDailyReportingComponent } from './vc-daily-reporting.component';

describe('VCDailyReportingComponent', () => {
  let component: VCDailyReportingComponent;
  let fixture: ComponentFixture<VCDailyReportingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VCDailyReportingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VCDailyReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
