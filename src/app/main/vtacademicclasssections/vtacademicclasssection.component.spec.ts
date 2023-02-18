import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VTAcademicClassSectionComponent } from './vtacademicclasssection.component';

describe('VTAcademicClassSectionComponent', () => {
  let component: VTAcademicClassSectionComponent;
  let fixture: ComponentFixture<VTAcademicClassSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VTAcademicClassSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VTAcademicClassSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
