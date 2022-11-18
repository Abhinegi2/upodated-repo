import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDataTypeComponent } from './create-data-type.component';

describe('CreateDataTypeComponent', () => {
  let component: CreateDataTypeComponent;
  let fixture: ComponentFixture<CreateDataTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDataTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDataTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
