import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpfPipe } from './pipes/cpf.pipe';
import { NgxMaskDirective } from 'ngx-mask';

import { HeaderComponent } from './components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [CpfPipe, HeaderComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule, NgxMaskDirective],
  exports: [CpfPipe, HeaderComponent, NgxMaskDirective],
})
export class SharedModule {}
