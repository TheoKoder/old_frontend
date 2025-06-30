import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreybuttonpageComponent } from './preybuttonpage.component';

describe('PreybuttonpageComponent', () => {
  let component: PreybuttonpageComponent;
  let fixture: ComponentFixture<PreybuttonpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreybuttonpageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreybuttonpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
