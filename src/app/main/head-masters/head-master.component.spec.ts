import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadMasterComponent } from './head-master.component';

describe('HeadMasterComponent', () => {
  let component: HeadMasterComponent;
  let fixture: ComponentFixture<HeadMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
