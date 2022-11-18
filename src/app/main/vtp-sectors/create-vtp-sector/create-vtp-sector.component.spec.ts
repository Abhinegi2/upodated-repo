import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVTPSectorComponent } from './create-vtp-sector.component';

describe('CreateVTPSectorComponent', () => {
  let component: CreateVTPSectorComponent;
  let fixture: ComponentFixture<CreateVTPSectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVTPSectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVTPSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
