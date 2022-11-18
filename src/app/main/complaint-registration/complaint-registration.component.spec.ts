import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintRegistrationComponent } from './complaint-registration.component';

describe('ComplaintRegistrationComponent', () => {
  let component: ComplaintRegistrationComponent;
  let fixture: ComponentFixture<ComplaintRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
