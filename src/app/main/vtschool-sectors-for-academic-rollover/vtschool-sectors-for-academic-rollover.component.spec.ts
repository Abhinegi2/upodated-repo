import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VTSchoolSectorsForAcademicRolloverComponent } from './vtschool-sectors-for-academic-rollover.component';

describe('VTSchoolSectorsForAcademicRolloverComponent', () => {
  let component: VTSchoolSectorsForAcademicRolloverComponent;
  let fixture: ComponentFixture<VTSchoolSectorsForAcademicRolloverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VTSchoolSectorsForAcademicRolloverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VTSchoolSectorsForAcademicRolloverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
