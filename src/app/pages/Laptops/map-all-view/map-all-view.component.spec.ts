import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapAllViewComponent } from './map-all-view.component';

describe('MapAllViewComponent', () => {
  let component: MapAllViewComponent;
  let fixture: ComponentFixture<MapAllViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapAllViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MapAllViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
