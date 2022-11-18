import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVTStudentExitSurveyDetailComponent } from './create-vt-student-exit-survey-detail.component';

describe('CreateVTStudentExitSurveyDetailComponent', () => {
  let component: CreateVTStudentExitSurveyDetailComponent;
  let fixture: ComponentFixture<CreateVTStudentExitSurveyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVTStudentExitSurveyDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVTStudentExitSurveyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
