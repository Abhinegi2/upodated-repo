import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmailBrodcastingComponent } from './create-email-brodcasting.component';

describe('CreateEmailBrodcastingComponent', () => {
  let component: CreateEmailBrodcastingComponent;
  let fixture: ComponentFixture<CreateEmailBrodcastingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEmailBrodcastingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEmailBrodcastingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
