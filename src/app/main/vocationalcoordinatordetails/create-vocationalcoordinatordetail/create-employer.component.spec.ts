import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVocationalcoordinatordetailComponent } from './create-vocationalcoordinatordetail.component';

describe('CreateVocationalcoordinatordetailComponent', () => {
  let component: CreateVocationalcoordinatordetailComponent;
  let fixture: ComponentFixture<CreateVocationalcoordinatordetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVocationalcoordinatordetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVocationalcoordinatordetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
