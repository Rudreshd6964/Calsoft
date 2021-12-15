import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpreadsheetV2Component } from './spreadsheet-v2.component';

describe('SpreadsheetV2Component', () => {
  let component: SpreadsheetV2Component;
  let fixture: ComponentFixture<SpreadsheetV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpreadsheetV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpreadsheetV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
