import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EGovDatabaseComponent } from './egov-database.component';

describe('EGovDatabaseComponent', () => {
  let component: EGovDatabaseComponent;
  let fixture: ComponentFixture<EGovDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EGovDatabaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EGovDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
