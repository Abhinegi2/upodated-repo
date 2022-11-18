import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVTClassComponent } from './create-vt-class.component';

describe('CreateVTClassComponent', () => {
  let component: CreateVTClassComponent;
  let fixture: ComponentFixture<CreateVTClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVTClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVTClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
