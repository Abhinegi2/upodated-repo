import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VTPSectorJobRoleComponent } from './vtp-sector-job-role.component';

describe('VTPSectorJobRoleComponent', () => {
  let component: VTPSectorJobRoleComponent;
  let fixture: ComponentFixture<VTPSectorJobRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VTPSectorJobRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VTPSectorJobRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
