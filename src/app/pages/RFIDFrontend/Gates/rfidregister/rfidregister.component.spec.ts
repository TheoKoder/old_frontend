import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RFIDRegisterComponent } from './rfidregister.component';

describe('RFIDRegisterComponent', () => {
  let component: RFIDRegisterComponent;
  let fixture: ComponentFixture<RFIDRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RFIDRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RFIDRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
