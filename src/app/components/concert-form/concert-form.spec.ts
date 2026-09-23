import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcertForm } from './concert-form';

describe('ConcertForm', () => {
  let component: ConcertForm;
  let fixture: ComponentFixture<ConcertForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConcertForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ConcertForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
