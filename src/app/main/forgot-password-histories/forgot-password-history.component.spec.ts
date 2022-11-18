import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordHistoryComponent } from './forgot-password-history.component';

describe('ForgotPasswordHistoryComponent', () => {
  let component: ForgotPasswordHistoryComponent;
  let fixture: ComponentFixture<ForgotPasswordHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
