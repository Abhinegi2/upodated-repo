import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVTMonthlyTeachingPlanComponent } from './create-vt-monthly-teaching-plan.component';

describe('CreateVTMonthlyTeachingPlanComponent', () => {
  let component: CreateVTMonthlyTeachingPlanComponent;
  let fixture: ComponentFixture<CreateVTMonthlyTeachingPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVTMonthlyTeachingPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVTMonthlyTeachingPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
