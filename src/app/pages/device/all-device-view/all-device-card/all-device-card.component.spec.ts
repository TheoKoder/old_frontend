import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDeviceCardComponent } from './all-device-card.component';

describe('AllDeviceCardComponent', () => {
  let component: AllDeviceCardComponent;
  let fixture: ComponentFixture<AllDeviceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllDeviceCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllDeviceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
