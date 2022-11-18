import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VocationalTrainingProviderComponent } from './vocational-training-provider.component';

describe('VocationalTrainingProviderComponent', () => {
  let component: VocationalTrainingProviderComponent;
  let fixture: ComponentFixture<VocationalTrainingProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VocationalTrainingProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VocationalTrainingProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
