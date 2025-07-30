import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpfPipe } from './pipes/cpf.pipe';
import { NgxMaskDirective } from 'ngx-mask';

@NgModule({
  declarations: [CpfPipe],
  imports: [CommonModule, NgxMaskDirective],
  exports: [CpfPipe, NgxMaskDirective],
})
export class SharedModule {}
