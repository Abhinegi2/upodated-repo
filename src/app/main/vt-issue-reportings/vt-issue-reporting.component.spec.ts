import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VTIssueReportingComponent } from './vt-issue-reporting.component';

describe('VTIssueReportingComponent', () => {
  let component: VTIssueReportingComponent;
  let fixture: ComponentFixture<VTIssueReportingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VTIssueReportingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VTIssueReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
