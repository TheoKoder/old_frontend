import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaggingValidationComponent } from './tagging-validation.component';

describe('TaggingValidationComponent', () => {
  let component: TaggingValidationComponent;
  let fixture: ComponentFixture<TaggingValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaggingValidationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaggingValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
