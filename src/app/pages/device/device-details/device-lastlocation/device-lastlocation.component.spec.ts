import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceLastlocationComponent } from './device-lastlocation.component';

describe('DeviceLastlocationComponent', () => {
  let component: DeviceLastlocationComponent;
  let fixture: ComponentFixture<DeviceLastlocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceLastlocationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeviceLastlocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
