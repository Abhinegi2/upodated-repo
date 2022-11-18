import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferVTVCVTPAcademicRolloverComponent } from './transfer-vtvcvtpacademic-rollover.component';

describe('TransferVTVCVTPAcademicRolloverComponent', () => {
  let component: TransferVTVCVTPAcademicRolloverComponent;
  let fixture: ComponentFixture<TransferVTVCVTPAcademicRolloverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferVTVCVTPAcademicRolloverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferVTVCVTPAcademicRolloverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
