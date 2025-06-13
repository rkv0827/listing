import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cardview } from './cardview';

describe('Cardview', () => {
  let component: Cardview;
  let fixture: ComponentFixture<Cardview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Cardview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cardview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
