import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CdkTableModule } from '@angular/cdk/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

const MaterialComponents = [
  MatInputModule,
  MatTableModule, 
  FormsModule,
  ReactiveFormsModule,
  MatPaginatorModule,
  CdkTableModule,
  MatAutocompleteModule
]

@NgModule({
  imports: [
    MaterialComponents,
    CommonModule
  ],
  exports: [
    MaterialComponents
  ],
})

export class MaterialModuleModule { }












