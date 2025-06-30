import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagThreeLayerLayoutComponent } from './tag-three-layer-layout.component';

describe('TagThreeLayerLayoutComponent', () => {
  let component: TagThreeLayerLayoutComponent;
  let fixture: ComponentFixture<TagThreeLayerLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagThreeLayerLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TagThreeLayerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
