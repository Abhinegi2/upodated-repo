import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVTPMonthlyBillSubmissionStatusComponent } from './create-vtp-monthly-bill-submission-status.component';

describe('CreateVTPMonthlyBillSubmissionStatusComponent', () => {
  let component: CreateVTPMonthlyBillSubmissionStatusComponent;
  let fixture: ComponentFixture<CreateVTPMonthlyBillSubmissionStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVTPMonthlyBillSubmissionStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVTPMonthlyBillSubmissionStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
