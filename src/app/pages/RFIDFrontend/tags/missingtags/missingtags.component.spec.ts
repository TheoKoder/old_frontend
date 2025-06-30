import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingtagsComponent } from './missingtags.component';

describe('MissingtagsComponent', () => {
  let component: MissingtagsComponent;
  let fixture: ComponentFixture<MissingtagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissingtagsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MissingtagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
