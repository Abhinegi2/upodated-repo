import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VocationalTrainerComponent } from './vocational-trainer.component';

describe('VocationalTrainerComponent', () => {
  let component: VocationalTrainerComponent;
  let fixture: ComponentFixture<VocationalTrainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VocationalTrainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VocationalTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
