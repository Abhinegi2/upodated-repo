import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolVTPSectorsForAcadmicRolloverComponent } from './school-vtpsectors-for-acadmic-rollover.component';

describe('SchoolVTPSectorsForAcadmicRolloverComponent', () => {
  let component: SchoolVTPSectorsForAcadmicRolloverComponent;
  let fixture: ComponentFixture<SchoolVTPSectorsForAcadmicRolloverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolVTPSectorsForAcadmicRolloverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolVTPSectorsForAcadmicRolloverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
