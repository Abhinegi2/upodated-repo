import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStudentClassComponent } from './create-student-class.component';

describe('CreateStudentClassComponent', () => {
  let component: CreateStudentClassComponent;
  let fixture: ComponentFixture<CreateStudentClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStudentClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStudentClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
