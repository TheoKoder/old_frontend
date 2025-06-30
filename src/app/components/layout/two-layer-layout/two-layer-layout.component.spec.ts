import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoLayerLayoutComponent } from './two-layer-layout.component';

describe('TwoLayerLayoutComponent', () => {
  let component: TwoLayerLayoutComponent;
  let fixture: ComponentFixture<TwoLayerLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwoLayerLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TwoLayerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
