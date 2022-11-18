import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VTClassComponent } from './vt-class.component';

describe('VTClassComponent', () => {
  let component: VTClassComponent;
  let fixture: ComponentFixture<VTClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VTClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VTClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
