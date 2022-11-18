import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VTStudentVEResultComponent } from './vt-student-veresult.component';

describe('VTStudentVEResultComponent', () => {
  let component: VTStudentVEResultComponent;
  let fixture: ComponentFixture<VTStudentVEResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VTStudentVEResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VTStudentVEResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
