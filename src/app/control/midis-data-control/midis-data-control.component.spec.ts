import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MidisDataControlComponent } from './midis-data-control.component';

describe('MidisDataControlComponent', () => {
  let component: MidisDataControlComponent;
  let fixture: ComponentFixture<MidisDataControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MidisDataControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MidisDataControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
