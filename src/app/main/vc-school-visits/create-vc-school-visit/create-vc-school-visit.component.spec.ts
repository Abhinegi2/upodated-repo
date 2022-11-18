import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVCSchoolVisitComponent } from './create-vc-school-visit.component';

describe('CreateVCSchoolVisitComponent', () => {
  let component: CreateVCSchoolVisitComponent;
  let fixture: ComponentFixture<CreateVCSchoolVisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVCSchoolVisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVCSchoolVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
