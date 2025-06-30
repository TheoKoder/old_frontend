import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesgDialogComponent } from './mesg-dialog.component';

describe('MesgDialogComponent', () => {
  let component: MesgDialogComponent;
  let fixture: ComponentFixture<MesgDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesgDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MesgDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
