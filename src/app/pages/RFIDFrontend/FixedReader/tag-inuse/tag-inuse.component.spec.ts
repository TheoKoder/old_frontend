import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagInuseComponent } from './tag-inuse.component';

describe('TagInuseComponent', () => {
  let component: TagInuseComponent;
  let fixture: ComponentFixture<TagInuseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagInuseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TagInuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
