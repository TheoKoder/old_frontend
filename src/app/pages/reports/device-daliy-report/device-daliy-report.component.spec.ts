import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceDaliyReportComponent } from './device-daliy-report.component';

describe('DeviceDaliyReportComponent', () => {
  let component: DeviceDaliyReportComponent;
  let fixture: ComponentFixture<DeviceDaliyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceDaliyReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeviceDaliyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
