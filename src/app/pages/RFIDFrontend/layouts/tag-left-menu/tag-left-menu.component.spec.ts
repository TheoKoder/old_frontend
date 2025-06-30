import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagLeftMenuComponent } from './tag-left-menu.component';

describe('TagLeftMenuComponent', () => {
  let component: TagLeftMenuComponent;
  let fixture: ComponentFixture<TagLeftMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagLeftMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TagLeftMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
