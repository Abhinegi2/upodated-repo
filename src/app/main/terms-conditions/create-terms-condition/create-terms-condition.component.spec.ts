import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTermsConditionComponent } from './create-terms-condition.component';

describe('CreateTermsConditionComponent', () => {
  let component: CreateTermsConditionComponent;
  let fixture: ComponentFixture<CreateTermsConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTermsConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTermsConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
