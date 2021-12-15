import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpreadsheetV1Component } from './spreadsheet-v1/spreadsheet-v1.component';
import { SpreadsheetV2Component } from './spreadsheet-v2/spreadsheet-v2.component';

const routes: Routes = [  
  { path: '', component: SpreadsheetV2Component },
  { path: 'spreadV1', component: SpreadsheetV1Component },
  { path: 'spreadV2', component: SpreadsheetV2Component },    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
