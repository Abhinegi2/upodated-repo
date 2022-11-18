import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VCSchoolSectorComponent } from './vc-school-sector.component';

describe('VCSchoolSectorComponent', () => {
  let component: VCSchoolSectorComponent;
  let fixture: ComponentFixture<VCSchoolSectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VCSchoolSectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VCSchoolSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
