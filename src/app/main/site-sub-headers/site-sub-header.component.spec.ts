import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteSubHeaderComponent } from './site-sub-header.component';

describe('SiteSubHeaderComponent', () => {
  let component: SiteSubHeaderComponent;
  let fixture: ComponentFixture<SiteSubHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteSubHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteSubHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
