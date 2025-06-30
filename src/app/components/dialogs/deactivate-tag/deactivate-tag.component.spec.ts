import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivateTagComponent } from './deactivate-tag.component';

describe('DeactivateTagComponent', () => {
  let component: DeactivateTagComponent;
  let fixture: ComponentFixture<DeactivateTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeactivateTagComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeactivateTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
