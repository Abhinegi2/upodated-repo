import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVCSchoolVisitReportComponent } from './create-vc-school-visit-report.component';

describe('CreateVCSchoolVisitReportComponent', () => {
  let component: CreateVCSchoolVisitReportComponent;
  let fixture: ComponentFixture<CreateVCSchoolVisitReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVCSchoolVisitReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVCSchoolVisitReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
