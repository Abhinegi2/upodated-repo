import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VTStudentResultOtherSubjectComponent } from './vt-student-result-other-subject.component';

describe('VTStudentResultOtherSubjectComponent', () => {
  let component: VTStudentResultOtherSubjectComponent;
  let fixture: ComponentFixture<VTStudentResultOtherSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VTStudentResultOtherSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VTStudentResultOtherSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
