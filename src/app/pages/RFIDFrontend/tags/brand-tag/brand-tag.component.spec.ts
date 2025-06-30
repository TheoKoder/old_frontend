import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandTagComponent } from './brand-tag.component';

describe('BrandTagComponent', () => {
  let component: BrandTagComponent;
  let fixture: ComponentFixture<BrandTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandTagComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrandTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
