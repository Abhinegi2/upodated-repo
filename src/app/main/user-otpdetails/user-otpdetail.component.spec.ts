import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOTPDetailComponent } from './user-otpdetail.component';

describe('UserOTPDetailComponent', () => {
  let component: UserOTPDetailComponent;
  let fixture: ComponentFixture<UserOTPDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserOTPDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOTPDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
