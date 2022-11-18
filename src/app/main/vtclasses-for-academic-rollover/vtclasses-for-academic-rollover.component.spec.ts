import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VTClassesForAcademicRolloverComponent } from './vtclasses-for-academic-rollover.component';

describe('VTClassesForAcademicRolloverComponent', () => {
  let component: VTClassesForAcademicRolloverComponent;
  let fixture: ComponentFixture<VTClassesForAcademicRolloverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VTClassesForAcademicRolloverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VTClassesForAcademicRolloverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
