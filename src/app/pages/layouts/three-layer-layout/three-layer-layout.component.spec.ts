import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeLayerLayoutComponent } from './three-layer-layout.component';

describe('ThreeLayerLayoutComponent', () => {
  let component: ThreeLayerLayoutComponent;
  let fixture: ComponentFixture<ThreeLayerLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreeLayerLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThreeLayerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
