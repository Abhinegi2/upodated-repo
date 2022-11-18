import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateJobRoleComponent } from './create-job-role.component';

describe('CreateJobRoleComponent', () => {
  let component: CreateJobRoleComponent;
  let fixture: ComponentFixture<CreateJobRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateJobRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateJobRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
