import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVocationaltrainerdetailComponent } from './create-vocationaltrainerdetail.component';

describe('CreateVocationaltrainerdetailComponent', () => {
  let component: CreateVocationaltrainerdetailComponent;
  let fixture: ComponentFixture<CreateVocationaltrainerdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVocationaltrainerdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVocationaltrainerdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
