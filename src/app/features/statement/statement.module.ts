import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { StatementComponent } from './statement.component';

@NgModule({
  declarations: [StatementComponent],
  imports: [CommonModule, MatTableModule, MatCardModule],
})
export class StatementModule {}
