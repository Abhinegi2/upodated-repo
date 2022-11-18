import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVCSchoolSectorComponent } from './create-vc-school-sector.component';

describe('CreateVCSchoolSectorComponent', () => {
  let component: CreateVCSchoolSectorComponent;
  let fixture: ComponentFixture<CreateVCSchoolSectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVCSchoolSectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVCSchoolSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
