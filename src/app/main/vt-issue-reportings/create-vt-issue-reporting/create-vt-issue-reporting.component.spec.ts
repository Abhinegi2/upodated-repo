import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVTIssueReportingComponent } from './create-vt-issue-reporting.component';

describe('CreateVTIssueReportingComponent', () => {
  let component: CreateVTIssueReportingComponent;
  let fixture: ComponentFixture<CreateVTIssueReportingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVTIssueReportingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVTIssueReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
