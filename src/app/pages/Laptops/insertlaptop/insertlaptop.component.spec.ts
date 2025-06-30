import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertlaptopComponent } from './insertlaptop.component';

describe('InsertlaptopComponent', () => {
  let component: InsertlaptopComponent;
  let fixture: ComponentFixture<InsertlaptopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertlaptopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsertlaptopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
