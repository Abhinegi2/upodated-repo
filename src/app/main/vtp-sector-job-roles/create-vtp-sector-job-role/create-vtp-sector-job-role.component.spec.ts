import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVTPSectorJobRoleComponent } from './create-vtp-sector-job-role.component';

describe('CreateVTPSectorJobRoleComponent', () => {
  let component: CreateVTPSectorJobRoleComponent;
  let fixture: ComponentFixture<CreateVTPSectorJobRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVTPSectorJobRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVTPSectorJobRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
