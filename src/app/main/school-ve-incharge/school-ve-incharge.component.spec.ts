import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolVEInchargeComponent } from './school-ve-incharge.component';

describe('SchoolVEInchargeComponent', () => {
  let component: SchoolVEInchargeComponent;
  let fixture: ComponentFixture<SchoolVEInchargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolVEInchargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolVEInchargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
