import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIssueApprovalComponent } from './create-issue-approval.component';

describe('CreateHMIssueReportingComponent', () => {
  let component: CreateIssueApprovalComponent;
  let fixture: ComponentFixture<CreateIssueApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateIssueApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateIssueApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
