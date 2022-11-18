import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VTStudentExitSurveyDetailComponent } from './vt-student-exit-survey-detail.component';

describe('VTStudentExitSurveyDetailComponent', () => {
  let component: VTStudentExitSurveyDetailComponent;
  let fixture: ComponentFixture<VTStudentExitSurveyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VTStudentExitSurveyDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VTStudentExitSurveyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
