import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModuleModule } from '../app/material-module.module';
import { SpreadsheetV1Component } from './spreadsheet-v1/spreadsheet-v1.component';
import { SpreadsheetV2Component } from './spreadsheet-v2/spreadsheet-v2.component';

@NgModule({
  declarations: [
    AppComponent,
    SpreadsheetV1Component,
    SpreadsheetV2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModuleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
