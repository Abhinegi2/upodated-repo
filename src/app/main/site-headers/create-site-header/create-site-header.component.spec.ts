import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSiteHeaderComponent } from './create-site-header.component';

describe('CreateSiteHeaderComponent', () => {
  let component: CreateSiteHeaderComponent;
  let fixture: ComponentFixture<CreateSiteHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSiteHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSiteHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
