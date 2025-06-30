import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceDailyExceptionComponent } from './device-daily-exception.component';

describe('DeviceDailyExceptionComponent', () => {
  let component: DeviceDailyExceptionComponent;
  let fixture: ComponentFixture<DeviceDailyExceptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceDailyExceptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeviceDailyExceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
