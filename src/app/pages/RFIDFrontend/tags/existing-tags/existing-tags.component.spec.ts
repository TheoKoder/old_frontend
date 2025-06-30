import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingTagsComponent } from './existing-tags.component';

describe('ExistingTagsComponent', () => {
  let component: ExistingTagsComponent;
  let fixture: ComponentFixture<ExistingTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExistingTagsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExistingTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
