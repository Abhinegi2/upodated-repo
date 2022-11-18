import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolVTPSectorComponent } from './school-vtp-sector.component';

describe('SchoolVTPSectorComponent', () => {
  let component: SchoolVTPSectorComponent;
  let fixture: ComponentFixture<SchoolVTPSectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolVTPSectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolVTPSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
