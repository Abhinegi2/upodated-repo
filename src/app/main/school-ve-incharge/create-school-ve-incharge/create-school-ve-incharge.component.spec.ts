import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSchoolVEInchargeComponent } from './create-school-ve-incharge.component';

describe('CreateSchoolVEInchargeComponent', () => {
  let component: CreateSchoolVEInchargeComponent;
  let fixture: ComponentFixture<CreateSchoolVEInchargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSchoolVEInchargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSchoolVEInchargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
