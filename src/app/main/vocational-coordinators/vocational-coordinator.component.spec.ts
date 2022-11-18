import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VocationalCoordinatorComponent } from './vocational-coordinator.component';

describe('VocationalCoordinatorComponent', () => {
  let component: VocationalCoordinatorComponent;
  let fixture: ComponentFixture<VocationalCoordinatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VocationalCoordinatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VocationalCoordinatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
