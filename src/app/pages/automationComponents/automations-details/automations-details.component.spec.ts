import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomationsDetailsComponent } from './automations-details.component';

describe('AutomationsDetailsComponent', () => {
  let component: AutomationsDetailsComponent;
  let fixture: ComponentFixture<AutomationsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutomationsDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutomationsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
