import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHMIssueReportingComponent } from './create-hm-issue-reporting.component';

describe('CreateHMIssueReportingComponent', () => {
  let component: CreateHMIssueReportingComponent;
  let fixture: ComponentFixture<CreateHMIssueReportingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateHMIssueReportingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHMIssueReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
