import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVTStudentPlacementDetailComponent } from './create-vt-student-placement-detail.component';

describe('CreateVTStudentPlacementDetailComponent', () => {
  let component: CreateVTStudentPlacementDetailComponent;
  let fixture: ComponentFixture<CreateVTStudentPlacementDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVTStudentPlacementDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVTStudentPlacementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
