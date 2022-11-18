import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VTPMonthlyBillSubmissionStatusComponent } from './vtp-monthly-bill-submission-status.component';

describe('VTPMonthlyBillSubmissionStatusComponent', () => {
  let component: VTPMonthlyBillSubmissionStatusComponent;
  let fixture: ComponentFixture<VTPMonthlyBillSubmissionStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VTPMonthlyBillSubmissionStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VTPMonthlyBillSubmissionStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
