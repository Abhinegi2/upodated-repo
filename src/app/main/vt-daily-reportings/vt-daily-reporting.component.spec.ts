import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VTDailyReportingComponent } from './vt-daily-reporting.component';

describe('VTDailyReportingComponent', () => {
  let component: VTDailyReportingComponent;
  let fixture: ComponentFixture<VTDailyReportingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VTDailyReportingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VTDailyReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
