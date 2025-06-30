import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaptopRegisterLinkComponent } from './laptop-register-link.component';

describe('LaptopRegisterLinkComponent', () => {
  let component: LaptopRegisterLinkComponent;
  let fixture: ComponentFixture<LaptopRegisterLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaptopRegisterLinkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LaptopRegisterLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
