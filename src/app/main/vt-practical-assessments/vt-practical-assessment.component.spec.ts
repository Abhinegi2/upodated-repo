import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VTPracticalAssessmentComponent } from './vt-practical-assessment.component';

describe('VTPracticalAssessmentComponent', () => {
  let component: VTPracticalAssessmentComponent;
  let fixture: ComponentFixture<VTPracticalAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VTPracticalAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VTPracticalAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
