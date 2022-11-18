import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVTStatusOfInductionInserviceTrainingComponent } from './create-vt-status-of-induction-inservice-training.component';

describe('CreateVTStatusOfInductionInserviceTrainingComponent', () => {
  let component: CreateVTStatusOfInductionInserviceTrainingComponent;
  let fixture: ComponentFixture<CreateVTStatusOfInductionInserviceTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVTStatusOfInductionInserviceTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVTStatusOfInductionInserviceTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
