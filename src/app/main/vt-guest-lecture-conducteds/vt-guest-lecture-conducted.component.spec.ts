import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VTGuestLectureConductedComponent } from './vt-guest-lecture-conducted.component';

describe('VTGuestLectureConductedComponent', () => {
  let component: VTGuestLectureConductedComponent;
  let fixture: ComponentFixture<VTGuestLectureConductedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VTGuestLectureConductedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VTGuestLectureConductedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
