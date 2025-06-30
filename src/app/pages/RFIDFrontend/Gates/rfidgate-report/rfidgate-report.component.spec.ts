import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RFIDGateReportComponent } from './rfidgate-report.component';

describe('RFIDGateReportComponent', () => {
  let component: RFIDGateReportComponent;
  let fixture: ComponentFixture<RFIDGateReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RFIDGateReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RFIDGateReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
