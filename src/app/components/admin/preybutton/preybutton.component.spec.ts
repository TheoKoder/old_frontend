import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreybuttonComponent } from './preybutton.component';

describe('PreybuttonComponent', () => {
  let component: PreybuttonComponent;
  let fixture: ComponentFixture<PreybuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreybuttonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreybuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
