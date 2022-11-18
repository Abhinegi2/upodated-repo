import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VCIssueReportingComponent } from './vc-issue-reporting.component';

describe('VCIssueReportingComponent', () => {
  let component: VCIssueReportingComponent;
  let fixture: ComponentFixture<VCIssueReportingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VCIssueReportingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VCIssueReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
