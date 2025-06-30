import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTablesUpdateComponent } from './data-tables-update.component';

describe('DataTablesUpdateComponent', () => {
  let component: DataTablesUpdateComponent;
  let fixture: ComponentFixture<DataTablesUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataTablesUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataTablesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
