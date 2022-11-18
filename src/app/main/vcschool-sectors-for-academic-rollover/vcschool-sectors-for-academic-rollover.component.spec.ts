import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VCSchoolSectorsForAcademicRolloverComponent } from './vcschool-sectors-for-academic-rollover.component';

describe('VCSchoolSectorsForAcademicRolloverComponent', () => {
  let component: VCSchoolSectorsForAcademicRolloverComponent;
  let fixture: ComponentFixture<VCSchoolSectorsForAcademicRolloverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VCSchoolSectorsForAcademicRolloverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VCSchoolSectorsForAcademicRolloverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
