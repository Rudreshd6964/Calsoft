import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpreadsheetV1Component } from './spreadsheet-v1.component';

describe('SpreadsheetV1Component', () => {
  let component: SpreadsheetV1Component;
  let fixture: ComponentFixture<SpreadsheetV1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpreadsheetV1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpreadsheetV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
