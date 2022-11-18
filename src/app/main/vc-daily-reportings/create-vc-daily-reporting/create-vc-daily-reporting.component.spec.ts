import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVCDailyReportingComponent } from './create-vc-daily-reporting.component';

describe('CreateVCDailyReportingComponent', () => {
  let component: CreateVCDailyReportingComponent;
  let fixture: ComponentFixture<CreateVCDailyReportingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVCDailyReportingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVCDailyReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
