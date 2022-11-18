import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeLoginComponent } from './change-login.component';

describe('ChangeLoginComponent', () => {
  let component: ChangeLoginComponent;
  let fixture: ComponentFixture<ChangeLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
