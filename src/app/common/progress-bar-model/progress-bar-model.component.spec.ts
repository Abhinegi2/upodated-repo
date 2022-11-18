import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressBarModelComponent } from './progress-bar-model.component';

describe('ProgressBarModelComponent', () => {
  let component: ProgressBarModelComponent;
  let fixture: ComponentFixture<ProgressBarModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressBarModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressBarModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
