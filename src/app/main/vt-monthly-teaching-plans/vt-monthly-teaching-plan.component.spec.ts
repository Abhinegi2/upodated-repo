import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VTMonthlyTeachingPlanComponent } from './vt-monthly-teaching-plan.component';

describe('VTMonthlyTeachingPlanComponent', () => {
  let component: VTMonthlyTeachingPlanComponent;
  let fixture: ComponentFixture<VTMonthlyTeachingPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VTMonthlyTeachingPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VTMonthlyTeachingPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
