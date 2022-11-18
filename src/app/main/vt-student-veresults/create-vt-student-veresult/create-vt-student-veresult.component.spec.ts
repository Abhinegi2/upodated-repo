import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVTStudentVEResultComponent } from './create-vt-student-veresult.component';

describe('CreateVTStudentVEResultComponent', () => {
  let component: CreateVTStudentVEResultComponent;
  let fixture: ComponentFixture<CreateVTStudentVEResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVTStudentVEResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVTStudentVEResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
