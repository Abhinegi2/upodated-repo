import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSchoolCategoryComponent } from './create-school-category.component';

describe('CreateSchoolCategoryComponent', () => {
  let component: CreateSchoolCategoryComponent;
  let fixture: ComponentFixture<CreateSchoolCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSchoolCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSchoolCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
