import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorJobRoleComponent } from './sector-job-role.component';

describe('SectorJobRoleComponent', () => {
  let component: SectorJobRoleComponent;
  let fixture: ComponentFixture<SectorJobRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectorJobRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorJobRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
