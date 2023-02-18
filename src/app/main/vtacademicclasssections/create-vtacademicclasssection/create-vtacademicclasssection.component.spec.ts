import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVTAcademicClassSectionComponent } from './create-vtacademicclasssection.component';

describe('CreateVTAcademicClassSectionComponent', () => {
  let component: CreateVTAcademicClassSectionComponent;
  let fixture: ComponentFixture<CreateVTAcademicClassSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVTAcademicClassSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVTAcademicClassSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
