import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VocationalcoordinatordetailComponent } from './vocationalcoordinatordetail.component';

describe('VocationalcoordinatordetailComponent', () => {
  let component: VocationalcoordinatordetailComponent;
  let fixture: ComponentFixture<VocationalcoordinatordetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VocationalcoordinatordetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VocationalcoordinatordetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
