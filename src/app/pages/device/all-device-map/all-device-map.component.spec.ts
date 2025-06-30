import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDeviceMapComponent } from './all-device-map.component';

describe('AllDeviceMapComponent', () => {
  let component: AllDeviceMapComponent;
  let fixture: ComponentFixture<AllDeviceMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllDeviceMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllDeviceMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
