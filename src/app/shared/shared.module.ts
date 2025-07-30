import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxMaskDirective } from 'ngx-mask';
import { CpfPipe } from './pipes/cpf.pipe';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [CpfPipe, HeaderComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule, NgxMaskDirective],
  exports: [CpfPipe, HeaderComponent, NgxMaskDirective],
})
export class SharedModule {}
