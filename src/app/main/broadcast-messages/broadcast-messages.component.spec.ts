import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BroadcastMessagesComponent } from './broadcast-messages.component';

describe('BroadcastMessagesComponent', () => {
  let component: BroadcastMessagesComponent;
  let fixture: ComponentFixture<BroadcastMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BroadcastMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BroadcastMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
