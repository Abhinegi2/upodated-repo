import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VTPSectorComponent } from './vtp-sector.component';

describe('VTPSectorComponent', () => {
  let component: VTPSectorComponent;
  let fixture: ComponentFixture<VTPSectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VTPSectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VTPSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
