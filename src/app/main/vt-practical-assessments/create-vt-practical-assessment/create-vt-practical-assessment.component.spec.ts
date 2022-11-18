import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVTPracticalAssessmentComponent } from './create-vt-practical-assessment.component';

describe('CreateVTPracticalAssessmentComponent', () => {
  let component: CreateVTPracticalAssessmentComponent;
  let fixture: ComponentFixture<CreateVTPracticalAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVTPracticalAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVTPracticalAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
