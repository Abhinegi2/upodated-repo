import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolSectorJobComponent } from './schoolsectorjob.component';

describe('SchoolSectorJobComponent', () => {
  let component: SchoolSectorJobComponent;
  let fixture: ComponentFixture<SchoolSectorJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolSectorJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolSectorJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
