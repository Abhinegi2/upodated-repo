import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCourseMaterialComponent } from './create-course-material.component';

describe('CreateCourseMaterialComponent', () => {
  let component: CreateCourseMaterialComponent;
  let fixture: ComponentFixture<CreateCourseMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCourseMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCourseMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
