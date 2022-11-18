import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVocationalTrainerComponent } from './create-vocational-trainer.component';

describe('CreateVocationalTrainerComponent', () => {
  let component: CreateVocationalTrainerComponent;
  let fixture: ComponentFixture<CreateVocationalTrainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVocationalTrainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVocationalTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
