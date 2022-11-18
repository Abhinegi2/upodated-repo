import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVTStudentAssessmentComponent } from './create-vt-student-assessment.component';

describe('CreateVTStudentAssessmentComponent', () => {
  let component: CreateVTStudentAssessmentComponent;
  let fixture: ComponentFixture<CreateVTStudentAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVTStudentAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVTStudentAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
