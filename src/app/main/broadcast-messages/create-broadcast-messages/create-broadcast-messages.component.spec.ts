import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBroadcastMessagesComponent } from './create-broadcast-messages.component';

describe('CreateBroadcastMessagesComponent', () => {
  let component: CreateBroadcastMessagesComponent;
  let fixture: ComponentFixture<CreateBroadcastMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBroadcastMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBroadcastMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
