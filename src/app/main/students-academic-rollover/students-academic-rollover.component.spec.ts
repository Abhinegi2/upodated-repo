import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsAcademicRolloverComponent } from './students-academic-rollover.component';

describe('StudentsAcademicRolloverComponent', () => {
  let component: StudentsAcademicRolloverComponent;
  let fixture: ComponentFixture<StudentsAcademicRolloverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsAcademicRolloverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsAcademicRolloverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
