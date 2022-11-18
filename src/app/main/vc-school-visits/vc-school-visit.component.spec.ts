import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VCSchoolVisitComponent } from './vc-school-visit.component';

describe('VCSchoolVisitComponent', () => {
  let component: VCSchoolVisitComponent;
  let fixture: ComponentFixture<VCSchoolVisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VCSchoolVisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VCSchoolVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
