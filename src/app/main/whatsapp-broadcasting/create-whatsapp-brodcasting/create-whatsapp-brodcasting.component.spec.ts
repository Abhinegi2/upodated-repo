import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWhatsappBrodcastingComponent } from './create-whatsapp-brodcasting.component';

describe('CreateWhatsappBrodcastingComponent', () => {
  let component: CreateWhatsappBrodcastingComponent;
  let fixture: ComponentFixture<CreateWhatsappBrodcastingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateWhatsappBrodcastingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWhatsappBrodcastingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
