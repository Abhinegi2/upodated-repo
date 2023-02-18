import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGenericVTMappingComponent } from './create-genericvtmapping.component';

describe('CreateGenericVTMappingComponent', () => {
  let component: CreateGenericVTMappingComponent;
  let fixture: ComponentFixture<CreateGenericVTMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateGenericVTMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGenericVTMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
