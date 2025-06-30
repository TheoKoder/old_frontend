import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaptoplistdataComponent } from './laptoplistdata.component';

describe('LaptoplistdataComponent', () => {
  let component: LaptoplistdataComponent;
  let fixture: ComponentFixture<LaptoplistdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaptoplistdataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LaptoplistdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
