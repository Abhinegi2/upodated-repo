import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVocationalTrainingProviderComponent } from './create-vocational-training-provider.component';

describe('CreateVocationalTrainingProviderComponent', () => {
  let component: CreateVocationalTrainingProviderComponent;
  let fixture: ComponentFixture<CreateVocationalTrainingProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVocationalTrainingProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVocationalTrainingProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
