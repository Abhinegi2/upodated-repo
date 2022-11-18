import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VTStatusOfInductionInserviceTrainingComponent } from './vt-status-of-induction-inservice-training.component';

describe('VTStatusOfInductionInserviceTrainingComponent', () => {
  let component: VTStatusOfInductionInserviceTrainingComponent;
  let fixture: ComponentFixture<VTStatusOfInductionInserviceTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VTStatusOfInductionInserviceTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VTStatusOfInductionInserviceTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
