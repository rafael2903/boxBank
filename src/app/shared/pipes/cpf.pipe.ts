import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpf',
  standalone: false
})
export class CpfPipe implements PipeTransform {

  transform(value?: string): string {
    if (!value)  return '';

    const valueTransform = value.replace(/\D/g, '')
    const mask = /^(\d{3})(\d{3})(\d{3})(\d{2})$/

    return valueTransform.replace(mask, '$1.$2.$3-$4');
  }
}
