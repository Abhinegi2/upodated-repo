import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSiteSubHeaderComponent } from './create-site-sub-header.component';

describe('CreateSiteSubHeaderComponent', () => {
  let component: CreateSiteSubHeaderComponent;
  let fixture: ComponentFixture<CreateSiteSubHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSiteSubHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSiteSubHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
