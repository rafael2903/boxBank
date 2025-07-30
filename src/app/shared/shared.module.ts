import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpfPipe } from './pipes/cpf.pipe';
import { HeaderComponent } from './components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [CpfPipe, HeaderComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [CpfPipe,HeaderComponent]
})
export class SharedModule { }
