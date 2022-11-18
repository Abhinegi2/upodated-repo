import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateMessageTemplateComponent } from './create-message-template.component';


describe('CreateMessageTemplateComponent', () => {
  let component: CreateMessageTemplateComponent;
  let fixture: ComponentFixture<CreateMessageTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateMessageTemplateComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMessageTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
