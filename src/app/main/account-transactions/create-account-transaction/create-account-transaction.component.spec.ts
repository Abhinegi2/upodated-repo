import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountTransactionComponent } from './create-account-transaction.component';

describe('CreateAccountTransactionComponent', () => {
  let component: CreateAccountTransactionComponent;
  let fixture: ComponentFixture<CreateAccountTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAccountTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
