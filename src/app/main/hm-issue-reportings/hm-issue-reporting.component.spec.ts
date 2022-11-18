import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HMIssueReportingComponent } from './hm-issue-reporting.component';

describe('HMIssueReportingComponent', () => {
  let component: HMIssueReportingComponent;
  let fixture: ComponentFixture<HMIssueReportingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HMIssueReportingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HMIssueReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
