import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVTStudentDetailComponent } from './create-vt-student-detail.component';

describe('CreateVTStudentDetailComponent', () => {
  let component: CreateVTStudentDetailComponent;
  let fixture: ComponentFixture<CreateVTStudentDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVTStudentDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVTStudentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
