import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericVTMappingComponent } from './genericvtmapping.component';

describe('GenericVTMappingComponent', () => {
  let component: GenericVTMappingComponent;
  let fixture: ComponentFixture<GenericVTMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericVTMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericVTMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
