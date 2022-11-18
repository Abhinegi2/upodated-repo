import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VTTransferComponent } from './vt-transfer.component';

describe('VTTransferComponent', () => {
  let component: VTTransferComponent;
  let fixture: ComponentFixture<VTTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VTTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VTTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
