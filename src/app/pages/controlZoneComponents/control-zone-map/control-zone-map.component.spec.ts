import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlZoneMapComponent } from './control-zone-map.component';

describe('ControlZoneMapComponent', () => {
  let component: ControlZoneMapComponent;
  let fixture: ComponentFixture<ControlZoneMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlZoneMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ControlZoneMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
