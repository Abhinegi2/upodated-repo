import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateForgotPasswordHistoryComponent } from './create-forgot-password-history.component';

describe('CreateForgotPasswordHistoryComponent', () => {
  let component: CreateForgotPasswordHistoryComponent;
  let fixture: ComponentFixture<CreateForgotPasswordHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateForgotPasswordHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateForgotPasswordHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
