import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderComponent } from './ReaderComponent';

describe('ReaderComponent', () => {
  let component: ReaderComponent;
  let fixture: ComponentFixture<ReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
