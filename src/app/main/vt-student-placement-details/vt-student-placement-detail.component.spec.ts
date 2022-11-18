import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VTStudentPlacementDetailComponent } from './vt-student-placement-detail.component';

describe('VTStudentPlacementDetailComponent', () => {
  let component: VTStudentPlacementDetailComponent;
  let fixture: ComponentFixture<VTStudentPlacementDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VTStudentPlacementDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VTStudentPlacementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
