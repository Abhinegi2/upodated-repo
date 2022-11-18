import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVTStudentResultOtherSubjectComponent } from './create-vt-student-result-other-subject.component';

describe('CreateVTStudentResultOtherSubjectComponent', () => {
  let component: CreateVTStudentResultOtherSubjectComponent;
  let fixture: ComponentFixture<CreateVTStudentResultOtherSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVTStudentResultOtherSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVTStudentResultOtherSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
