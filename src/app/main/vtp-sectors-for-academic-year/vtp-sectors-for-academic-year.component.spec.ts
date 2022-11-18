import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VTPSectorForAcademicYearComponent } from './vtp-sectors-for-academic-year.component';

describe('VTPSectorForAcademicYearComponent', () => {
  let component: VTPSectorForAcademicYearComponent;
  let fixture: ComponentFixture<VTPSectorForAcademicYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VTPSectorForAcademicYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VTPSectorForAcademicYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
