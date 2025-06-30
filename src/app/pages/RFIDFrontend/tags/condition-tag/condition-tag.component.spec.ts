import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionTagComponent } from './condition-tag.component';

describe('ConditionTagComponent', () => {
  let component: ConditionTagComponent;
  let fixture: ComponentFixture<ConditionTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConditionTagComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConditionTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
