import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSchoolSectorJobComponent } from './create-schoolsectorjob.component';

describe('CreateSchoolSectorJobComponent', () => {
  let component: CreateSchoolSectorJobComponent;
  let fixture: ComponentFixture<CreateSchoolSectorJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSchoolSectorJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSchoolSectorJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
