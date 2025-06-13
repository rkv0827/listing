import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewnormal } from './viewnormal';

describe('Viewnormal', () => {
  let component: Viewnormal;
  let fixture: ComponentFixture<Viewnormal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Viewnormal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Viewnormal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
