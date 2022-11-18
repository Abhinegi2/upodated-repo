import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVTFieldIndustryVisitConductedComponent } from './create-vt-field-industry-visit-conducted.component';

describe('CreateVTFieldIndustryVisitConductedComponent', () => {
  let component: CreateVTFieldIndustryVisitConductedComponent;
  let fixture: ComponentFixture<CreateVTFieldIndustryVisitConductedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVTFieldIndustryVisitConductedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVTFieldIndustryVisitConductedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
