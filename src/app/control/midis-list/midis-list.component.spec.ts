import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MidisListComponent } from './midis-list.component';

describe('MidisListComponent', () => {
  let component: MidisListComponent;
  let fixture: ComponentFixture<MidisListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MidisListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MidisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
