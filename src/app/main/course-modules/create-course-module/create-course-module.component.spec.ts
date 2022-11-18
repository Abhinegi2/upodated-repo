import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCourseModuleComponent } from './create-course-module.component';

describe('CreateCourseModuleComponent', () => {
  let component: CreateCourseModuleComponent;
  let fixture: ComponentFixture<CreateCourseModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCourseModuleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCourseModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
