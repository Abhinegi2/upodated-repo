import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHeadMasterComponent } from './create-head-master.component';

describe('CreateHeadMasterComponent', () => {
  let component: CreateHeadMasterComponent;
  let fixture: ComponentFixture<CreateHeadMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateHeadMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHeadMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
