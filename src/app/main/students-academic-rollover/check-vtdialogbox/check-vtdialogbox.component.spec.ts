import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckVTdialogboxComponent } from './check-vtdialogbox.component';

describe('CheckVTdialogboxComponent', () => {
  let component: CheckVTdialogboxComponent;
  let fixture: ComponentFixture<CheckVTdialogboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckVTdialogboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckVTdialogboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
