import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VCSchoolVisitReportComponent } from './vc-school-visit-report.component';

describe('VCSchoolVisitComponent', () => {
  let component: VCSchoolVisitReportComponent;
  let fixture: ComponentFixture<VCSchoolVisitReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VCSchoolVisitReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VCSchoolVisitReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
