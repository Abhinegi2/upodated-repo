import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSchoolVTPSectorComponent } from './create-school-vtp-sector.component';

describe('CreateSchoolVTPSectorComponent', () => {
  let component: CreateSchoolVTPSectorComponent;
  let fixture: ComponentFixture<CreateSchoolVTPSectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSchoolVTPSectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSchoolVTPSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
