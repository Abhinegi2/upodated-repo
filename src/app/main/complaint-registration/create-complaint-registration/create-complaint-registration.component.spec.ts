import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComplaintRegistrationComponent } from './create-complaint-registration.component';

describe('CreateComplaintRegistrationComponent', () => {
  let component: CreateComplaintRegistrationComponent;
  let fixture: ComponentFixture<CreateComplaintRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateComplaintRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComplaintRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
