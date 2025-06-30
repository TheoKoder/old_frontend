import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseReportsComponent } from './database-reports.component';

describe('DatabaseReportsComponent', () => {
  let component: DatabaseReportsComponent;
  let fixture: ComponentFixture<DatabaseReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatabaseReportsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatabaseReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
