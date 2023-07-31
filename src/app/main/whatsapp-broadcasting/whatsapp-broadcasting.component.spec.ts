import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappBroadcastingComponent } from './whatsapp-broadcasting.component';

describe('WhatsappBroadcastingComponent', () => {
  let component: WhatsappBroadcastingComponent;
  let fixture: ComponentFixture<WhatsappBroadcastingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhatsappBroadcastingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatsappBroadcastingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
