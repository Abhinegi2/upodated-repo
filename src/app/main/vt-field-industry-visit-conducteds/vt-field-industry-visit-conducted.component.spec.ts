import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VTFieldIndustryVisitConductedComponent } from './vt-field-industry-visit-conducted.component';

describe('VTFieldIndustryVisitConductedComponent', () => {
  let component: VTFieldIndustryVisitConductedComponent;
  let fixture: ComponentFixture<VTFieldIndustryVisitConductedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VTFieldIndustryVisitConductedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VTFieldIndustryVisitConductedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
