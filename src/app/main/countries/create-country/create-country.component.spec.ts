import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCountryComponent } from './create-country.component';

describe('CreateCountryComponent', () => {
  let component: CreateCountryComponent;
  let fixture: ComponentFixture<CreateCountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
