import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagLastlocationComponent } from './tag-lastlocation.component';

describe('TagLastlocationComponent', () => {
  let component: TagLastlocationComponent;
  let fixture: ComponentFixture<TagLastlocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagLastlocationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TagLastlocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
