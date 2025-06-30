import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagDataTableComponent } from './tag-data-table.component';

describe('TagDataTableComponent', () => {
  let component: TagDataTableComponent;
  let fixture: ComponentFixture<TagDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagDataTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TagDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
