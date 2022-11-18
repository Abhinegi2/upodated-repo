import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVCIssueReportingComponent } from './create-vc-issue-reporting.component';

describe('CreateVCIssueReportingComponent', () => {
  let component: CreateVCIssueReportingComponent;
  let fixture: ComponentFixture<CreateVCIssueReportingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVCIssueReportingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVCIssueReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
