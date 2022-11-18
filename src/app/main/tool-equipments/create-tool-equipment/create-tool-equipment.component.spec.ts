import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateToolEquipmentComponent } from './create-tool-equipment.component';

describe('CreateToolEquipmentComponent', () => {
  let component: CreateToolEquipmentComponent;
  let fixture: ComponentFixture<CreateToolEquipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateToolEquipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateToolEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
