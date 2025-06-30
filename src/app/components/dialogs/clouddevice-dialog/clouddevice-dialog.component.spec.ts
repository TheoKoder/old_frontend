import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClouddeviceDialogComponent } from './clouddevice-dialog.component';

describe('ClouddeviceDialogComponent', () => {
  let component: ClouddeviceDialogComponent;
  let fixture: ComponentFixture<ClouddeviceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClouddeviceDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClouddeviceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
