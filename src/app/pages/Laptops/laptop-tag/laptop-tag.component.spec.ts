import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaptopTagComponent } from './laptop-tag.component';

describe('LaptopTagComponent', () => {
  let component: LaptopTagComponent;
  let fixture: ComponentFixture<LaptopTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaptopTagComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LaptopTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
