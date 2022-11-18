import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDataValueComponent } from './create-data-value.component';

describe('CreateDataValueComponent', () => {
  let component: CreateDataValueComponent;
  let fixture: ComponentFixture<CreateDataValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDataValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDataValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
