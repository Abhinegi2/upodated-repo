import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VTStudentAssessmentComponent } from './vt-student-assessment.component';

describe('VTStudentAssessmentComponent', () => {
  let component: VTStudentAssessmentComponent;
  let fixture: ComponentFixture<VTStudentAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VTStudentAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VTStudentAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
