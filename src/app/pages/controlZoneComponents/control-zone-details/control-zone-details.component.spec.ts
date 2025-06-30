import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlZoneDetailsComponent } from './control-zone-details.component';

describe('ControlZoneDetailsComponent', () => {
  let component: ControlZoneDetailsComponent;
  let fixture: ComponentFixture<ControlZoneDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlZoneDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ControlZoneDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
