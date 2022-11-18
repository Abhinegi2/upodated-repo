import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSchoolClassComponent } from './create-school-class.component';

describe('CreateSchoolClassComponent', () => {
  let component: CreateSchoolClassComponent;
  let fixture: ComponentFixture<CreateSchoolClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSchoolClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSchoolClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
