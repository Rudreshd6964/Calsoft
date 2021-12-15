import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CdkTableModule } from '@angular/cdk/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon'

const MaterialComponents = [
  MatInputModule,
  MatTableModule, 
  FormsModule,
  ReactiveFormsModule,
  MatPaginatorModule,
  CdkTableModule,
  MatAutocompleteModule,
  MatIconModule
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












