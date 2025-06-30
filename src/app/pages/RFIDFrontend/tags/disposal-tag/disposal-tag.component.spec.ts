import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisposalTagComponent } from './disposal-tag.component';

describe('DisposalTagComponent', () => {
  let component: DisposalTagComponent;
  let fixture: ComponentFixture<DisposalTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisposalTagComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisposalTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
