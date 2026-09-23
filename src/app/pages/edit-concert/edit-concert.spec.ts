import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConcert } from './edit-concert';

describe('EditConcert', () => {
  let component: EditConcert;
  let fixture: ComponentFixture<EditConcert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditConcert],
    }).compileComponents();

    fixture = TestBed.createComponent(EditConcert);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
