import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStudentClassDetailComponent } from './create-student-class-detail.component';

describe('CreateStudentClassDetailComponent', () => {
  let component: CreateStudentClassDetailComponent;
  let fixture: ComponentFixture<CreateStudentClassDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStudentClassDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStudentClassDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
