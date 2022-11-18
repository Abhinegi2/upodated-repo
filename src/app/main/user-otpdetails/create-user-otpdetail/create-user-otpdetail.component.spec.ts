import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserOTPDetailComponent } from './create-user-otpdetail.component';

describe('CreateUserOTPDetailComponent', () => {
  let component: CreateUserOTPDetailComponent;
  let fixture: ComponentFixture<CreateUserOTPDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUserOTPDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserOTPDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
