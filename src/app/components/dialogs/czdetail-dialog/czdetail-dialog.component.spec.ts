import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CZDetailDialogComponent } from './czdetail-dialog.component';

describe('CZDetailDialogComponent', () => {
  let component: CZDetailDialogComponent;
  let fixture: ComponentFixture<CZDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CZDetailDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CZDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
