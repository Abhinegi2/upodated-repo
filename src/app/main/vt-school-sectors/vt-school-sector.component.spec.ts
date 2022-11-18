import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VTSchoolSectorComponent } from './vt-school-sector.component';

describe('VTSchoolSectorComponent', () => {
  let component: VTSchoolSectorComponent;
  let fixture: ComponentFixture<VTSchoolSectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VTSchoolSectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VTSchoolSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
