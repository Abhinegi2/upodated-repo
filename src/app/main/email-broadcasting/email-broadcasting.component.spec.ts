import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailBroadcastingComponent } from './email-broadcasting.component';

describe('EmailBroadcastingComponent', () => {
  let component: EmailBroadcastingComponent;
  let fixture: ComponentFixture<EmailBroadcastingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailBroadcastingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailBroadcastingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
