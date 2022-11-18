import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRoleTransactionComponent } from './create-role-transaction.component';

describe('CreateRoleTransactionComponent', () => {
  let component: CreateRoleTransactionComponent;
  let fixture: ComponentFixture<CreateRoleTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRoleTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRoleTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
