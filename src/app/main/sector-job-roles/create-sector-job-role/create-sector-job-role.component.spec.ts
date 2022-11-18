import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSectorJobRoleComponent } from './create-sector-job-role.component';

describe('CreateSectorJobRoleComponent', () => {
  let component: CreateSectorJobRoleComponent;
  let fixture: ComponentFixture<CreateSectorJobRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSectorJobRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSectorJobRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
