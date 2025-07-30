import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import necessary Angular Material modules
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { StatementComponent } from './statement.component';
import {MatSortModule} from '@angular/material/sort';
import { MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [StatementComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatProgressSpinnerModule, 
    MatIconModule,
    MatSortModule,
    MatPaginatorModule
  ],
})
export class StatementModule {}