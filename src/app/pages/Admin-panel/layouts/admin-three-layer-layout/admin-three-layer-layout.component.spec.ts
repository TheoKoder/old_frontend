import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminThreeLayerLayoutComponent } from './admin-three-layer-layout.component';

describe('AdminThreeLayerLayoutComponent', () => {
  let component: AdminThreeLayerLayoutComponent;
  let fixture: ComponentFixture<AdminThreeLayerLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminThreeLayerLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminThreeLayerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
