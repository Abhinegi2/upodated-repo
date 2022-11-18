import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobRoleComponent } from './job-role.component';

describe('JobRoleComponent', () => {
  let component: JobRoleComponent;
  let fixture: ComponentFixture<JobRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
