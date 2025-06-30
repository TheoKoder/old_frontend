import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetViewDialogComponent } from './asset-view-dialog.component';

describe('AssetViewDialogComponent', () => {
  let component: AssetViewDialogComponent;
  let fixture: ComponentFixture<AssetViewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetViewDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssetViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
