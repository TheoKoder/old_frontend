import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagCreateDataTableComponent } from './tag-create-data-table.component';

describe('TagCreateDataTableComponent', () => {
  let component: TagCreateDataTableComponent;
  let fixture: ComponentFixture<TagCreateDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagCreateDataTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TagCreateDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
