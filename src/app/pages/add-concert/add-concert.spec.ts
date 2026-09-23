import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConcert } from './add-concert';

describe('AddConcert', () => {
  let component: AddConcert;
  let fixture: ComponentFixture<AddConcert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddConcert],
    }).compileComponents();

    fixture = TestBed.createComponent(AddConcert);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
