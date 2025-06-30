import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceHardwareComponent } from './device-hardware.component';

describe('DeviceHardwareComponent', () => {
  let component: DeviceHardwareComponent;
  let fixture: ComponentFixture<DeviceHardwareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceHardwareComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeviceHardwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
