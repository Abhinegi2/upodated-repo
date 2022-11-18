import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVTSchoolSectorComponent } from './create-vt-school-sector.component';

describe('CreateVTSchoolSectorComponent', () => {
  let component: CreateVTSchoolSectorComponent;
  let fixture: ComponentFixture<CreateVTSchoolSectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVTSchoolSectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVTSchoolSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
