import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVTGuestLectureConductedComponent } from './create-vt-guest-lecture-conducted.component';

describe('CreateVTGuestLectureConductedComponent', () => {
  let component: CreateVTGuestLectureConductedComponent;
  let fixture: ComponentFixture<CreateVTGuestLectureConductedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVTGuestLectureConductedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVTGuestLectureConductedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
