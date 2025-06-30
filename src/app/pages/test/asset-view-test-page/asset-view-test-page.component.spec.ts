import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetViewTestPageComponent } from './asset-view-test-page.component';

describe('AssetViewTestPageComponent', () => {
  let component: AssetViewTestPageComponent;
  let fixture: ComponentFixture<AssetViewTestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetViewTestPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssetViewTestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
