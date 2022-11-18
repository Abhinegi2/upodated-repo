import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolEquipmentComponent } from './tool-equipment.component';

describe('ToolEquipmentComponent', () => {
  let component: ToolEquipmentComponent;
  let fixture: ComponentFixture<ToolEquipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolEquipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
