import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RFIDGateCurrentComponent } from './rfidgate-current.component';

describe('RFIDGateCurrentComponent', () => {
  let component: RFIDGateCurrentComponent;
  let fixture: ComponentFixture<RFIDGateCurrentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RFIDGateCurrentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RFIDGateCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
