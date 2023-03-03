import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VocationaltrainerdetailComponent } from './vocationaltrainerdetail.component';

describe('VocationaltrainerdetailComponent', () => {
  let component: VocationaltrainerdetailComponent;
  let fixture: ComponentFixture<VocationaltrainerdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VocationaltrainerdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VocationaltrainerdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
