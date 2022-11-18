import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVocationalCoordinatorComponent } from './create-vocational-coordinator.component';

describe('CreateVocationalCoordinatorComponent', () => {
  let component: CreateVocationalCoordinatorComponent;
  let fixture: ComponentFixture<CreateVocationalCoordinatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVocationalCoordinatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVocationalCoordinatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
