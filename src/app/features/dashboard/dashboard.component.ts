import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  nome: string = 'João';
  agencia: string = '1234';
  conta: string = '56789-0';
  saldo: number = 12345.67;
  ocultarSaldo: boolean = false;

  constructor(
    private router: Router
  ){
    
  }
  toggleOcultarSaldo() {
    this.ocultarSaldo = !this.ocultarSaldo;
  }
}

